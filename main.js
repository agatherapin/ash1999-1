import { projects } from "./modules/projects.js";

// =============================================
// DOM REFERENCES
// =============================================
const scrollContainer = document.getElementById('scrollContainer');
const canvas = document.getElementById('canvas');
const filterContainer = document.getElementById('filterContainer');
const filterToggle = document.getElementById('filterToggle');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Fullscreen viewer
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImg = document.getElementById('fullscreenImg');
const fullscreenClose = document.getElementById('fullscreenClose');
const fullscreenCounter = document.getElementById('fullscreenCounter');
let fullscreenImages = [];  // Les URLs des images de la galerie courante
let fullscreenIndex = 0;    // L'index de l'image actuellement affichée

// =============================================
// STATE
// =============================================
let isDragging = false;
let hasMoved = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;
let velocityX = 0;
let velocityY = 0;
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let animationId = null;
let mouseX = 0;
let mouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let activeFilters = new Set(['all']);
let itemsCache = [];
let dragRafPending = false;
let parallaxX = 0;
let parallaxY = 0;

function updateCanvasTransform() {
    canvas.style.transform = `translate(${scrollLeft + parallaxX}px, ${scrollTop + parallaxY}px)`;
}

// Responsive: scale cards down on smaller screens
// On desktop the factor is 1 (no change). On phone it goes down to ~0.6
function getCardScale() {
    const w = window.innerWidth;
    if (w <= 480) return 0.75;   // téléphone — cartes bien visibles
    if (w <= 768) return 0.85;   // tablette
    return 1;
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function getCanvasScale() {
    const w = window.innerWidth;
    if (w <= 480) return 1.8;    // mobile : beaucoup d'espace pour éviter les chevauchements
    if (w <= 768) return 1.8;    // tablette
    return 1;
}

const canvasScale = getCanvasScale();
const TILE_WIDTH = (window.innerWidth + 300) * canvasScale;
const TILE_HEIGHT = (window.innerHeight + 300) * canvasScale;

// =============================================
// PERF MONITOR — retirer en production
// =============================================
const perf = {
    drag:     { count: 0, total: 0, max: 0 },
    parallax: { count: 0, total: 0, max: 0 },
    momentum: { count: 0, total: 0, max: 0 },
    fps:      { count: 0, last: performance.now() },
    slowFrames: 0,
};

const _fmt = o => o.count
    ? `${String(o.count).padStart(4)} appels | avg ${(o.total / o.count).toFixed(3)}ms | max ${o.max.toFixed(3)}ms`
    : '     —';

function _perfReport() {
    const now = performance.now();
    const elapsed = (now - perf.fps.last) / 1000;
    if (elapsed < 2) return;

    const fps = Math.round(perf.fps.count / elapsed);
    const fpsColor = fps >= 55 ? '#4ade80' : fps >= 30 ? '#facc15' : '#f87171';

    console.group(`%c[PERF] FPS: ${fps}  |  slow frames: ${perf.slowFrames}`, `color:${fpsColor};font-weight:bold`);
    console.log(`drag (RAF write) : ${_fmt(perf.drag)}`);
    console.log(`parallax RAF     : ${_fmt(perf.parallax)}`);
    console.log(`momentum RAF     : ${_fmt(perf.momentum)}`);

    // Diagnostic automatique
    if (fps < 55) {
        const jsMax = Math.max(perf.drag.max, perf.parallax.max, perf.momentum.max);
        if (jsMax < 2) {
            console.warn('%c⚠ JS rapide (<2ms) mais FPS bas → goulot CSS/rendu (paint, composite, GIFs, backdrop-filter)', 'color:#fb923c');
        } else {
            const top = [
                { name: 'drag',     v: perf.drag.max },
                { name: 'parallax', v: perf.parallax.max },
                { name: 'momentum', v: perf.momentum.max },
            ].sort((a, b) => b.v - a.v)[0];
            console.warn(`%c⚠ Goulot JS probable → "${top.name}" (max ${top.v.toFixed(3)}ms)`, 'color:#f87171;font-weight:bold');
        }
    }
    console.groupEnd();

    perf.drag.count     = perf.drag.total     = perf.drag.max     = 0;
    perf.parallax.count = perf.parallax.total = perf.parallax.max = 0;
    perf.momentum.count = perf.momentum.total = perf.momentum.max = 0;
    perf.slowFrames = 0;
    perf.fps.count = 0;
    perf.fps.last = now;
}

let _prevFrameTime = performance.now();
(function _fpsLoop() {
    const now = performance.now();
    const frameDt = now - _prevFrameTime;
    _prevFrameTime = now;

    perf.fps.count++;

    if (frameDt > 20) {
        perf.slowFrames++;
        console.warn(
            `%c[SLOW FRAME +${frameDt.toFixed(1)}ms] drag:${isDragging} | momentum:${animationId !== null} | parallax:${parallaxRafId !== null}`,
            'color:#fb923c;font-weight:bold'
        );
    }

    _perfReport();
    requestAnimationFrame(_fpsLoop);
})();

// =============================================
// FILTERS
// =============================================
filterToggle.addEventListener('click', () => {
    filterContainer.classList.toggle('open');
    filterToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-wrapper')) {
        filterContainer.classList.remove('open');
        filterToggle.classList.remove('active');
    }
});

function createFilterButtons() {
    const allTags = new Set();
    projects.forEach(project => {
        project.tags.forEach(tag => allTags.add(tag));
    });

    const sortedTags = Array.from(allTags).sort();

    sortedTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = tag;
        btn.dataset.filter = tag;
        btn.addEventListener('click', () => toggleFilter(tag));
        filterContainer.appendChild(btn);
    });
}

function toggleFilter(filter) {
    if (filter === 'all') {
        activeFilters.clear();
        activeFilters.add('all');
    } else {
        activeFilters.delete('all');
        if (activeFilters.has(filter)) {
            activeFilters.delete(filter);
        } else {
            activeFilters.add(filter);
        }
        if (activeFilters.size === 0) {
            activeFilters.add('all');
        }
    }

    updateFilterButtons();
    filterItems();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        btn.classList.toggle('active', activeFilters.has(filter));
    });
}

function filterItems() {
    itemsCache.forEach((item, index) => {
        const project = projects[index % projects.length];
        const shouldShow = activeFilters.has('all') ||
                          project.tags.some(tag => activeFilters.has(tag));
        item.classList.toggle('hidden', !shouldShow);
    });
}

// =============================================
// CANVAS ITEMS
// =============================================
function createItems() {
    const scale = getCardScale();

    for (let tileY = -1; tileY <= 1; tileY++) {
        for (let tileX = -1; tileX <= 1; tileX++) {
            projects.forEach((project) => {
                const item = document.createElement('div');
                item.className = 'item';

                const scaledWidth = project.width * scale;
                const itemHeight = scaledWidth / project.aspectRatio;
                item.style.width = scaledWidth + 'px';
                item.style.height = itemHeight + 'px';

                const baseTop = (project.top / 100) * TILE_HEIGHT;
                const baseLeft = (project.left / 100) * TILE_WIDTH;
                const finalTop = baseTop + (tileY * TILE_HEIGHT);
                const finalLeft = baseLeft + (tileX * TILE_WIDTH);

                item.style.top = finalTop + 'px';
                item.style.left = finalLeft + 'px';
                item.style.transform = 'translate(-50%, -50%)';

                item.innerHTML = `
                    <div class="item-card" style="aspect-ratio: ${project.aspectRatio};">
                        <div class="card-face card-front">
                            <div class="item-image">
                                <div class="img-placeholder" data-src="${project.image}"></div>
                                <div class="overlay">
                                    <h3>${project.title}</h3>
                                    <div class="date">${project.subtitle}</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-face card-back">
                            <div class="card-back-content">
                                <h3 class="back-title">${project.title}</h3>
                                <p class="back-description">${project.description}</p>
                            </div>
                            <button class="view-more-btn">See full project</button>
                        </div>
                    </div>
                `;

                item.addEventListener('click', (e) => {
                    if (!hasMoved) {
                        if (e.target.classList.contains('view-more-btn')) {
                            e.stopPropagation();
                            openModal(project);
                        } else {
                            item.classList.toggle('flipped');
                        }
                    }
                });

                canvas.appendChild(item);
                itemsCache.push(item);
            });
        }
    }
}

// =============================================
// DRAG & SCROLL
// =============================================
scrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasMoved = false;
    scrollContainer.classList.add('dragging');
    startX = e.pageX - scrollLeft;
    startY = e.pageY - scrollTop;
    lastX = e.pageX;
    lastY = e.pageY;
    lastTime = Date.now();
    velocityX = 0;
    velocityY = 0;

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

function _applyDragTransform() {
    const _t0 = performance.now();
    updateCanvasTransform();
    dragRafPending = false;
    const _elapsed = performance.now() - _t0;
    perf.drag.count++;
    perf.drag.total += _elapsed;
    if (_elapsed > perf.drag.max) perf.drag.max = _elapsed;
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const now = Date.now();
    const dt = now - lastTime;

    const x = e.pageX - startX;
    const y = e.pageY - startY;

    const moveDistance = Math.abs(e.pageX - lastX) + Math.abs(e.pageY - lastY);
    if (moveDistance > 5) hasMoved = true;

    if (dt > 0) {
        velocityX = (e.pageX - lastX) / dt * 16;
        velocityY = (e.pageY - lastY) / dt * 16;
    }

    scrollLeft = x;
    scrollTop = y;
    wrapPosition(); // JS pur — pas de DOM, synchrone OK

    lastX = e.pageX;
    lastY = e.pageY;
    lastTime = now;

    if (!dragRafPending) {
        dragRafPending = true;
        requestAnimationFrame(_applyDragTransform);
    }
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    scrollContainer.classList.remove('dragging');
    applyMomentum();
});

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();

    scrollLeft -= e.deltaX;
    scrollTop -= e.deltaY;

    velocityX = -e.deltaX * 0.5;
    velocityY = -e.deltaY * 0.5;

    wrapPosition();
    updateCanvasTransform();

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    applyMomentum();
}, { passive: false });

// =============================================
// TOUCH EVENTS (mobile/tablet)
// =============================================
// These mirror the mouse events above but read from
// e.touches[0] instead of e.pageX/e.pageY.
// Why a separate set? Touch events give you a TouchList
// (multi-finger support), so the API is different.

scrollContainer.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isDragging = true;
    hasMoved = false;
    scrollContainer.classList.add('dragging');
    startX = touch.pageX - scrollLeft;
    startY = touch.pageY - scrollTop;
    lastX = touch.pageX;
    lastY = touch.pageY;
    lastTime = Date.now();
    velocityX = 0;
    velocityY = 0;

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}, { passive: true });

scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    // preventDefault empêche le scroll natif du navigateur
    // (sinon la page bouge ET le canvas bouge = chaos)
    e.preventDefault();

    const touch = e.touches[0];
    const now = Date.now();
    const dt = now - lastTime;

    const x = touch.pageX - startX;
    const y = touch.pageY - startY;

    const moveDistance = Math.abs(touch.pageX - lastX) + Math.abs(touch.pageY - lastY);
    if (moveDistance > 5) {
        hasMoved = true;
    }

    if (dt > 0) {
        velocityX = (touch.pageX - lastX) / dt * 16;
        velocityY = (touch.pageY - lastY) / dt * 16;
    }

    scrollLeft = x;
    scrollTop = y;
    wrapPosition(); // JS pur — pas de DOM, synchrone OK

    lastX = touch.pageX;
    lastY = touch.pageY;
    lastTime = now;

    if (!dragRafPending) {
        dragRafPending = true;
        requestAnimationFrame(_applyDragTransform);
    }
}, { passive: false }); // passive: false est obligatoire pour que preventDefault() fonctionne

scrollContainer.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    scrollContainer.classList.remove('dragging');
    applyMomentum();
}, { passive: true });

function wrapPosition() {
    if (scrollLeft > TILE_WIDTH / 2) {
        scrollLeft -= TILE_WIDTH;
        startX -= TILE_WIDTH;
    } else if (scrollLeft < -TILE_WIDTH / 2) {
        scrollLeft += TILE_WIDTH;
        startX += TILE_WIDTH;
    }

    if (scrollTop > TILE_HEIGHT / 2) {
        scrollTop -= TILE_HEIGHT;
        startY -= TILE_HEIGHT;
    } else if (scrollTop < -TILE_HEIGHT / 2) {
        scrollTop += TILE_HEIGHT;
        startY += TILE_HEIGHT;
    }
}

function applyMomentum() {
    const friction = 0.95;
    const threshold = 0.5;

    function animate() {
        if (Math.abs(velocityX) > threshold || Math.abs(velocityY) > threshold) {
            const _t0 = performance.now();
            velocityX *= friction;
            velocityY *= friction;

            scrollLeft += velocityX;
            scrollTop += velocityY;

            wrapPosition();
            updateCanvasTransform();

            const _elapsed = performance.now() - _t0;
            perf.momentum.count++;
            perf.momentum.total += _elapsed;
            if (_elapsed > perf.momentum.max) perf.momentum.max = _elapsed;
            animationId = requestAnimationFrame(animate);
        } else {
            animationId = null;
        }
    }

    animate();
}

// =============================================
// PARALLAX (desktop only — no mouse on touch devices)
// =============================================
let parallaxRafId = null;
const PARALLAX_STRENGTH = 20; // décalage max en px sur le canvas entier

function animateParallax() {
    if (isDragging) {
        parallaxRafId = null;
        return;
    }

    const _t0 = performance.now();

    currentMouseX += (mouseX - currentMouseX) * 0.08;
    currentMouseY += (mouseY - currentMouseY) * 0.08;

    parallaxX = currentMouseX * PARALLAX_STRENGTH;
    parallaxY = currentMouseY * PARALLAX_STRENGTH;
    updateCanvasTransform(); // 1 seul write DOM

    const _elapsed = performance.now() - _t0;
    perf.parallax.count++;
    perf.parallax.total += _elapsed;
    if (_elapsed > perf.parallax.max) perf.parallax.max = _elapsed;

    const settled = Math.abs(mouseX - currentMouseX) < 0.001 && Math.abs(mouseY - currentMouseY) < 0.001;
    if (!settled) {
        parallaxRafId = requestAnimationFrame(animateParallax);
    } else {
        parallaxRafId = null;
    }
}

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        if (!isDragging && !parallaxRafId) {
            parallaxRafId = requestAnimationFrame(animateParallax);
        }
    });
}

// =============================================
// MODAL
// =============================================
function openModal(project) {
   const galleryHTML = project.gallery ? project.gallery.map(item => {
  if (item.startsWith('vimeo:')) {
    const videoId = item.replace('vimeo:', '');
    return `<div class="modal-gallery-item modal-video">
        <iframe src="https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1"
            style="width: 100%; height: 100%; border-radius: 12px;"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
    </div>`;
    } else if (item.startsWith('video:')) {
        const videoSrc = item.replace('video:', '');
        return `<div class="modal-gallery-item modal-video">
            <video controls autoplay loop muted>
                <source src="${videoSrc}" type="video/mp4">
            </video>
        </div>`;
    } else {
        return `<div class="modal-gallery-item"><img src="${item}" alt="${project.title}" loading="lazy"></div>`;
    }
}).join('') : '';

    const tagsHTML = project.tags.map(tag =>
        `<span class="modal-tag">${tag}</span>`
    ).join('');

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
            <div class="modal-tags">${tagsHTML}</div>
        </div>
        ${galleryHTML ? `<div class="modal-gallery">${galleryHTML}</div>` : ''}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Rendre les images de la galerie cliquables pour le fullscreen
    // On filtre les items qui sont des images (pas des vidéos/iframes)
    const imageOnlyUrls = project.gallery
        ? project.gallery.filter(item => !item.startsWith('vimeo:') && !item.startsWith('video:'))
        : [];

    if (imageOnlyUrls.length > 0) {
        const galleryItems = modalBody.querySelectorAll('.modal-gallery-item:not(.modal-video)');
        galleryItems.forEach((item, i) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                openFullscreen(imageOnlyUrls, i);
            });
        });
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
    // Navigation clavier dans le viewer plein écran
    if (fullscreenViewer.classList.contains('active')) {
        if (e.key === 'Escape') closeFullscreen();
        if (e.key === 'ArrowRight') navigateFullscreen(1);
        if (e.key === 'ArrowLeft') navigateFullscreen(-1);
    }
});

// =============================================
// FULLSCREEN IMAGE VIEWER
// =============================================
// On stocke les images (seulement les images, pas les vidéos)
// quand on ouvre la modale, puis on ouvre le viewer au tap.

function openFullscreen(images, index) {
    fullscreenImages = images;
    fullscreenIndex = index;
    updateFullscreenImage();
    fullscreenViewer.classList.add('active');
}

function closeFullscreen() {
    fullscreenViewer.classList.remove('active');
}

function navigateFullscreen(direction) {
    fullscreenIndex += direction;
    // Boucle : si on dépasse la fin, retour au début (et inversement)
    if (fullscreenIndex >= fullscreenImages.length) fullscreenIndex = 0;
    if (fullscreenIndex < 0) fullscreenIndex = fullscreenImages.length - 1;
    updateFullscreenImage();
}

function updateFullscreenImage() {
    fullscreenImg.src = fullscreenImages[fullscreenIndex];
    fullscreenCounter.textContent = `${fullscreenIndex + 1} / ${fullscreenImages.length}`;
}

fullscreenClose.addEventListener('click', closeFullscreen);

// Fermer en tapant sur le fond (pas sur l'image)
fullscreenViewer.addEventListener('click', (e) => {
    if (e.target === fullscreenViewer) closeFullscreen();
});

// Swipe gauche/droite pour naviguer dans le viewer
let fsStartX = 0;
fullscreenViewer.addEventListener('touchstart', (e) => {
    fsStartX = e.touches[0].clientX;
}, { passive: true });

fullscreenViewer.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - fsStartX;
    // Un swipe de plus de 50px déclenche la navigation
    if (Math.abs(diff) > 50) {
        navigateFullscreen(diff > 0 ? -1 : 1);
    }
}, { passive: true });

// =============================================
// ASYNC IMAGE LOADING WITH PLACEHOLDERS
// =============================================
// Each unique cover image is decoded exactly once (off-main-thread via img.decode()).
// All 9 tile copies that share the same URL are swapped simultaneously when ready.
// → The main thread is never blocked by image decode during scroll/drag.

function swapPlaceholders(src) {
    itemsCache.forEach(item => {
        const placeholder = item.querySelector(`.img-placeholder[data-src="${src}"]`);
        if (!placeholder) return;
        const img = new Image();
        img.src = src;
        img.decoding = 'async';
        img.classList.add('img-fade-in');
        placeholder.replaceWith(img);
    });
}

function loadImagesAsync() {
    const urls = new Set(projects.map(p => p.image));
    let loaded = 0;
    const total = urls.size;

    urls.forEach(src => {
        if (src.endsWith('.gif')) {
            // GIFs: decode() is meaningless for animated images — use onload instead
            const img = new Image();
            img.onload = () => {
                loaded++;
                console.log(`[ASYNC IMG] ✓ ${loaded}/${total} gif — ${src.split('/').pop()}`);
                swapPlaceholders(src);
            };
            img.onerror = () => swapPlaceholders(src);
            img.src = src;
        } else {
            const img = new Image();
            img.src = src;
            img.decode()
                .then(() => {
                    loaded++;
                    console.log(`[ASYNC IMG] ✓ ${loaded}/${total} — ${src.split('/').pop()}`);
                    swapPlaceholders(src);
                })
                .catch(() => {
                    // Show the image anyway (browser error state) — never leave a blank placeholder
                    swapPlaceholders(src);
                });
        }
    });
}

// =============================================
// PRELOAD
// =============================================

// PerformanceObserver : log chaque image réellement fetchée (réseau vs cache)
if (window.PerformanceObserver) {
    const _imgObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
            if (!entry.name.match(/\.(webp|gif|jpg|jpeg|png|svg)(\?|$)/i)) return;
            const filename  = entry.name.split('/').pop();
            const fromCache = entry.transferSize === 0;
            const size      = fromCache ? 'cache' : `${(entry.encodedBodySize / 1024).toFixed(1)} KB`;
            console.log(
                `%c[IMG] ${fromCache ? '📦' : '🌐'} ${filename.padEnd(45)} ${size.padStart(10)}  ${entry.duration.toFixed(0)}ms`,
                fromCache ? 'color:#6b7280' : 'color:#60a5fa'
            );
        });
    });
    _imgObserver.observe({ type: 'resource', buffered: true });
}

function preloadImages() {
    // Only preload gallery images — covers are handled by loadImagesAsync() (placeholder system)
    const urls = new Set();
    projects.forEach(p => {
        if (p.gallery) {
            p.gallery.forEach(src => {
                if (!src.startsWith('vimeo:') && !src.startsWith('video:') && !src.endsWith('.gif')) urls.add(src);
            });
        }
    });

    console.log(`[PRELOAD] ${urls.size} gallery images à pré-décoder`);
    let decoded = 0;
    let failed  = 0;
    const total = urls.size;

    urls.forEach(src => {
        const img = new Image();
        // img.decode() : charge ET décode les pixels hors main thread
        // → quand l'image apparaît à l'écran, zéro travail de décodage à faire
        img.src = src;
        img.decode()
            .then(() => {
                decoded++;
                const pct = Math.round(decoded / total * 100);
                console.log(`[PRELOAD] ✓ ${decoded}/${total} (${pct}%) — ${src.split('/').pop()}`);
            })
            .catch(() => {
                failed++;
                console.warn(`[PRELOAD] ✗ Échec décode : ${src}`);
            });
    });
}

// =============================================
// INIT
// =============================================
createFilterButtons();
console.time('[PERF] createItems');
createItems();
console.timeEnd('[PERF] createItems');
loadImagesAsync();   // covers: decode once per URL off-main-thread, swap all 9 tiles when ready
preloadImages();     // gallery images: pre-decode so modal opens instantly

// Update instruction text for touch devices
if (isTouchDevice) {
    const instructions = document.querySelector('.instructions');
    if (instructions) {
        instructions.textContent = 'SWIPE TO MOVE · TAP TO FLIP';
    }
}
