// =============================================
// DATA - Projects
// =============================================
const projects = [
    {
        title: 'Internship with PMF music label',
        subtitle: 'Jan to March 2025',
        description: 'Created logo and mockups for ThaHomey brand: Rare.',
        // Note: fullDescription is defined here but not currently used
        fullDescription: 'Ce projet explore la typographie moderne à travers un glossaire complet. Chaque terme est illustré avec des exemples visuels et des explications détaillées pour faciliter la compréhension.',
        tags: ['Branding'],
        image: 'img/rare stage/back-scan-couture.jpg',
        gallery: ['img/rare stage/Print rapport-6.jpg', 'img/rare stage/Print rapport-5.jpg', 'img/rare stage/Print rapport-11.jpg', 'img/rare stage/Print rapport-13.jpg', 'img/rare stage/Print rapport-9.jpg', 'img/rare stage/tee noir rare stretch.jpg'],
        width: 240,
        aspectRatio: 0.7,
        top: 45,
        left: 60
    },
    {
        title: 'Suburban',
        subtitle: 'Jan 2024',
        description: 'Trifold brochure to promote a fictional festival around rap music. Suburban is the name of a fictitious organization about urban culture, streetwear & rap music.',
        tags: ['Branding', 'Print', 'Typography'],
        image: 'img/2.gif',
        gallery: ['img/exterieur-mockup-suburban.jpg.jpg', 'img/interieur-mockup-suburban.jpg', 'img/Logo Suburban.png'],
        width: 240,
        aspectRatio: 0.8,
        top: 8,
        left: 50
    },
    {
        title: 'Happy Birthday lettering',
        subtitle: 'Jan 2024',
        description: 'Inspired by Copperlate alphabet',
        tags: ['Typography'],
        image: 'img/HBD texture.jpg',
        gallery: ['img/HBD texture.jpg', 'img/HBD Original.jpg'],
        width: 280,
        aspectRatio: 1,
        top: 80,
        left: 55
    },
    {
        title: 'Wandanlage',
        subtitle: 'June 2024',
        description: 'As a great fan of Dieter Rams work, I decided to dedicate this webdesign project to the wall unit he designed for Braun in the 60s.',
        tags: ['Web Design'],
        image: 'img/wandanlage/wandanlage 1.png',
        gallery: ['vimeo:1166411109', 'img/wandanlage/3.png', 'img/wandanlage/4.png', 'img/wandanlage/5.png'],
        width: 340,
        aspectRatio: 1.7,
        top: 65,
        left: 74
    },
    {
        title: 'Skyjo',
        subtitle: 'April 2025',
        description: 'The aim of this workshop was to create a brand new, fun and attractive design for this extraordinary game!',
        tags: ['Packaging', 'Branding', 'Print'],
        image: 'img/skyjo/skyjo 2.jpg',
        gallery: ['img/skyjo/cartes.jpg', 'img/skyjo/exterieur.jpg', 'img/skyjo/full.jpg', 'img/skyjo/boite.jpg'],
        width: 240,
        aspectRatio: 0.8,
        top: 55,
        left: 92
    },
    {
        title: 'Interférences exhibition',
        subtitle: 'November 2024',
        description: 'The Interférences exhibition revolves around mapping and motion design, and showcases the work of third-year motion design students at E-artsup.',
        tags: ['Branding', 'Print', 'Motion Design'],
        image: 'img/gif interférences.gif',
        gallery: ['img/interférences 1.jpg', 'img/flyer face interférences.jpg', 'img/flyer verso interférences.jpg'],
        width: 240,
        aspectRatio: 0.7,
        top: 17,
        left: 20
    },
    {
        title: 'Typographic Lexicon',
        subtitle: 'October 2023',
        description: 'This lexicon is designed to help students learn about typography. It covers the essentials of typographic vocabulary and technical terms, and traces the history of typefaces.',
        tags: ['Typography', 'Print'],
        image: 'img/lexique typo/sub-2 (1).jpg',
        gallery: [
            'img/lexique typo/sub-2 (1).jpg', 'img/lexique typo/lexique-typo.jpg',
            'img/lexique typo/lexique-typo-1.jpg', 'img/lexique typo/lexique-typo-2.jpg',
            'img/lexique typo/lexique-typo-3.jpg', 'img/lexique typo/lexique-typo-4.jpg',
            'img/lexique typo/lexique-typo-5.jpg', 'img/lexique typo/lexique-typo-6.jpg',
            'img/lexique typo/lexique-typo-7.jpg', 'img/lexique typo/lexique-typo-8.jpg',
            'img/lexique typo/lexique-typo-9.jpg', 'img/lexique typo/lexique-typo-10.jpg',
            'img/lexique typo/lexique-typo-12.jpg', 'img/lexique typo/lexique-typo-15.jpg'
        ],
        width: 340,
        aspectRatio: 1.3,
        top: 70,
        left: 33
    },
    {
        title: 'Pick your poison, Art cover',
        subtitle: 'December 2025',
        description: 'Fictional cover made with playdough for the amazing song pick your poison, by Killowen.',
        tags: ['Music', 'Mix media', 'Typography'],
        image: 'img/pick your poison 1.jpg',
        gallery: ['img/pick your poison 1.jpg', 'img/head 1.png', 'img/head 2.png'],
        width: 330,
        aspectRatio: 1.0,
        top: 87,
        left: 1
    },
    {
        title: 'Poster Bushi - Batman',
        subtitle: '2024',
        description: 'Using Carta Nueva font from Sharp Type',
        tags: ['Music'],
        image: 'img/Bushi Batman.jpg',
        gallery: ['img/mockup CD.jpg', 'img/Bushi Batman.jpg'],
        width: 240,
        aspectRatio: 0.707,
        top: 32,
        left: 5
    },
    {
        title: 'Drawing gallery',
        subtitle: '2024',
        description: 'Collection de travaux et dessins variés.',
        tags: ['Illustration'],
        image: 'img/dessins/astronaute.jpg',
        gallery: [
            'img/dessins/00000001 3.jpg', 'img/dessins/001-2.jpg',
            'img/dessins/00000001.jpg', 'img/dessins/007-2.jpg',
            'img/dessins/Déc. 23 Profil encre de chine.jpg', 'img/dessins/portrait samouraï 2.jpg',
            'img/dessins/IMG_8577 2.jpg'
        ],
        width: 240,
        aspectRatio: 0.707,
        top: 32,
        left: 36
    },
    {
        title: 'Homemade books',
        subtitle: 'November 2025',
        description: 'I crafted this paper myself from scratch and painted the cover with acrylic paint. Everything is made by hand.',
        tags: ['Mix media', 'Illustration'],
        image: 'img/Early dinner front.png',
        gallery: ['img/Early dinner front.png', 'img/Early dinner back.png'],
        width: 290,
        aspectRatio: 1.3,
        top: 20,
        left: 85
    },
    {
        title: 'Motion for Muji',
        subtitle: 'December 2025',
        description: 'Short video to promote the Wall Mounted CD Player from Muji.',
        tags: ['Motion Design'],
        image: 'img/motion thumbnail.gif',
        gallery: ['video:img/RAPIN_AGATHE_MOTION.mp4'],
        width: 290,
        aspectRatio: 1.5,
        top: 90,
        left: 80
    }
];

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

// Responsive: scale cards down on smaller screens
// On desktop the factor is 1 (no change). On phone it goes down to ~0.6
function getCardScale() {
    const w = window.innerWidth;
    if (w <= 480) return 0.55;
    if (w <= 768) return 0.55;
    return 1;
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const TILE_WIDTH = window.innerWidth + 300;
const TILE_HEIGHT = window.innerHeight + 300;

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
    const items = document.querySelectorAll('.item');

    items.forEach((item, index) => {
        const projectIndex = index % projects.length;
        const project = projects[projectIndex];

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
            projects.forEach((project, index) => {
                const item = document.createElement('div');
                item.className = 'item';

                const scaledWidth = project.width * scale;
                const itemHeight = scaledWidth / project.aspectRatio;
                item.style.width = scaledWidth + 'px';
                item.style.height = itemHeight + 'px';
                item.dataset.parallaxStrength = (index % 3 + 1) * 0.100;

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
                                <img src="${project.image}" alt="${project.title}">
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

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const now = Date.now();
    const dt = now - lastTime;

    const x = e.pageX - startX;
    const y = e.pageY - startY;

    const moveDistance = Math.abs(e.pageX - lastX) + Math.abs(e.pageY - lastY);
    if (moveDistance > 5) {
        hasMoved = true;
    }

    if (dt > 0) {
        velocityX = (e.pageX - lastX) / dt * 16;
        velocityY = (e.pageY - lastY) / dt * 16;
    }

    scrollLeft = x;
    scrollTop = y;

    wrapPosition();
    canvas.style.transform = `translate(${scrollLeft}px, ${scrollTop}px)`;

    lastX = e.pageX;
    lastY = e.pageY;
    lastTime = now;
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
    canvas.style.transform = `translate(${scrollLeft}px, ${scrollTop}px)`;

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

    wrapPosition();
    canvas.style.transform = `translate(${scrollLeft}px, ${scrollTop}px)`;

    lastX = touch.pageX;
    lastY = touch.pageY;
    lastTime = now;
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
            velocityX *= friction;
            velocityY *= friction;

            scrollLeft += velocityX;
            scrollTop += velocityY;

            wrapPosition();
            canvas.style.transform = `translate(${scrollLeft}px, ${scrollTop}px)`;

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
if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
}

function animateParallax() {
    // On touch devices, skip the parallax calculation entirely
    if (!isTouchDevice) {
        currentMouseX += (mouseX - currentMouseX) * 0.1;
        currentMouseY += (mouseY - currentMouseY) * 0.1;

        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            const strength = parseFloat(item.dataset.parallaxStrength);
            const moveX = currentMouseX * strength * 100;
            const moveY = currentMouseY * strength * 100;

            item.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }

    requestAnimationFrame(animateParallax);
}

// =============================================
// MODAL
// =============================================
function openModal(project) {
   const galleryHTML = project.gallery ? project.gallery.map(item => {
    if (item.startsWith('vimeo:')) {
        const videoId = item.replace('vimeo:', '');
        return `<div class="modal-gallery-item modal-video">
            <iframe src="https://player.vimeo.com/video/${videoId}"
                style="width: 100%; height: 100%;"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
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
        return `<div class="modal-gallery-item"><img src="${item}" alt="${project.title}"></div>`;
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
// INIT
// =============================================
createFilterButtons();
createItems();
animateParallax();

// Update instruction text for touch devices
if (isTouchDevice) {
    const instructions = document.querySelector('.instructions');
    if (instructions) {
        instructions.textContent = 'SWIPE TO MOVE · TAP TO FLIP';
    }
}
