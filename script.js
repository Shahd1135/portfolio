const portfolioData = [
    {
        id: 1,
        title: 'MetaHuman Tourism Assistant',
        description: 'AI-powered interactive avatar that assists tourists by generating itineraries, giving directions, detecting gestures, and showing weather information.',
        image: 'images/metahuman.png',
        tech: ['AI', 'Unity', 'Computer Vision']
    },
    {
        id: 2,
        title: 'AI Phishing Detection System',
        description: 'Machine learning system that detects phishing emails and classifies suspicious content for cybersecurity protection.',
        image: 'images/phishing.png',
        tech: ['Python', 'ML', 'NLP']
    },
    {
        id: 3,
        title: 'VR Breast Cancer Awareness Game',
        description: 'Virtual reality educational experience designed to raise awareness about breast cancer through immersive storytelling.',
        image: 'images/vr-cancer.jpg',
        tech: ['Unity', 'VR', 'C#']
    },
    {
        id: 4,
        title: 'Pet Adoption Platform',
        description: 'Full-stack web application for browsing, listing, and adopting pets with user authentication and database integration.',
        image: 'images/pet.png',
        tech: ['HTML', 'CSS', 'JavaScript', 'SQL']
    },
    {
        id: 5,
        title: 'Police Patrol Monitoring App',
        description: 'UI/UX designed system for monitoring police patrol routes and activities using Figma prototyping.',
        image: './images/police.png',
        tech: ['Figma', 'UX Design']
    },
    {
        id: 6,
        title: '3D Unity Shooting Game',
        description: 'Mission-based 3D shooting game built in Unity with interactive gameplay mechanics and level progression.',
        image: './images/shooting.png',
        tech: ['Unity', 'C#', 'Game Design']
    }
];

const skillsData = [
    { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
    { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
    { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
    { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
    { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
    { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
    { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
    { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
    { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
    { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
    { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
    { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' }
];

// =========================
// NAVIGATION
// =========================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');

    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// =========================
// PARTICLES
// =========================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    if (!particlesContainer) return;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// =========================
// GAME POPUP (NEW)
// =========================
const gameModal = document.getElementById('gameModal');
const gameClose = document.getElementById('gameClose');

function openGameModal() {
    if (gameModal) gameModal.classList.add('active');
}

if (gameClose) {
    gameClose.addEventListener('click', () => {
        gameModal.classList.remove('active');
    });
}

if (gameModal) {
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            gameModal.classList.remove('active');
        }
    });
}

// =========================
// CAROUSEL
// =========================
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    const isGame = data.id === 6;

    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>

            <div class="card-image">
                <img src="${data.image}" alt="${data.title}">
            </div>

            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>

            <div class="card-tech">${techBadges}</div>

${
    isGame
        ? `<button class="card-cta" onclick="openGameModal()">Explore</button>`
        : `<button class="card-cta" onclick="return false;">Explore</button>`
}
        </div>
    `;

    return item;
}

function initCarousel() {
    if (!carousel || !indicatorsContainer) return;

    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        const total = items.length;

        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const abs = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        item.style.transition = 'all 0.8s ease';

        if (abs === 0) {
            item.style.transform = 'translate(-50%, -50%) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (abs === 1) {
            item.style.transform = `translate(-50%, -50%) translateX(${sign * 400}px) scale(0.85)`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (abs === 2) {
            item.style.transform = `translate(-50%, -50%) translateX(${sign * 600}px) scale(0.7)`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else {
            item.style.opacity = '0';
        }
    });

    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// =========================
// SKILLS
// =========================
function initSkillsGrid() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    skillsData.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-card';

        div.innerHTML = `
            <div>${skill.icon}</div>
            <h3>${skill.name}</h3>
            <p>${skill.level}%</p>
        `;

        grid.appendChild(div);
    });
}

// =========================
// CERTIFICATE MODAL
// =========================
function openCert(src) {
    document.getElementById('certModalImg').src = src;
    document.getElementById('certModal').classList.add('active');
}

function closeCert() {
    document.getElementById('certModal').classList.remove('active');
}

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    initParticles();
});

// =========================
// BUTTONS
// =========================
document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

setInterval(nextSlide, 5000);