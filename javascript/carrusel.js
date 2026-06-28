
const memoryGallery = [
    { url: 'img/ejemp.jpeg', msj: 'El día que nos conocimos... ❤️' },
    { url: 'img/ejemp.jpeg', msj: 'Nuestra primera salida juntos.' },
    { url: 'img/ejemp.jpeg', msj: 'Te veías hermosa esa tarde.' },
    { url: 'img/ejemp.jpeg', msj: 'Construyendo sueños juntos.' },
    { url: 'img/ejemp.jpeg', msj: '10 años de pura magia.' },
    { url: 'img/ejemp.jpeg', msj: 'Te amo cada día más.' }
];

let currentIndex = 0;
const totalMemories = memoryGallery.length;
let touchStartX = 0;
let canRotate = true;
let isCarouselPaused = false; 
const rotationCooldown = 400;      
const touchSensitivity = 80;  

function initCarousel() {
    const container = document.getElementById('contenedor');
    if (!container) return;
    memoryGallery.forEach((memory, i) => {
        const img = document.createElement('img');
        img.src = memory.url;
        img.className = 'foto-card oculta';
        img.id = 'img-' + i;
        img.onclick = () => { 
            if(img.classList.contains('pos-centro')) openPhotoModal(memory.url, memory.msj); 
        };
        container.appendChild(img);
    });

    updateFanLayout();


    container.addEventListener('wheel', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        e.preventDefault(); 
        if (!canRotate) return;

        if (Math.abs(e.deltaY) > 5) { 
            canRotate = false;
            currentIndex = (currentIndex + (e.deltaY > 0 ? 1 : -1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    }, { passive: false });

    container.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
    
    container.addEventListener('touchmove', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        if (!canRotate) return;
        const diffX = touchStartX - e.touches[0].clientX;
        
        if (Math.abs(diffX) > touchSensitivity) {
            canRotate = false;
            currentIndex = (currentIndex + (diffX > 0 ? 1 : -1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    });

    setInterval(() => { 
        const triviaModal = document.getElementById('contenedor-trivia');
        const isTriviaOpen = triviaModal && triviaModal.style.display === 'block';

        if(canRotate && !isCarouselPaused && !isTriviaOpen) { 
            currentIndex = (currentIndex + 1) % totalMemories; 
            updateFanLayout(); 
        } 
    }, 5000);
}

function updateFanLayout() {
    const cards = document.querySelectorAll('.foto-card');
    cards.forEach(card => { 
        card.className = 'foto-card oculta'; 
        card.style.zIndex = "0"; 
    });
    
    const getIndexAtOffset = (offset) => (currentIndex + offset + totalMemories) % totalMemories;
    
    const layoutMap = [
        { idx: getIndexAtOffset(0), className: 'pos-centro', z: 50 },
        { idx: getIndexAtOffset(1), className: 'pos-d1', z: 40 },
        { idx: getIndexAtOffset(2), className: 'pos-d2', z: 30 },
        { idx: getIndexAtOffset(3), className: 'pos-d3', z: 20 },
        { idx: getIndexAtOffset(-1), className: 'pos-i1', z: 40 },
        { idx: getIndexAtOffset(-2), className: 'pos-i2', z: 30 },
        { idx: getIndexAtOffset(-3), className: 'pos-i3', z: 20 }
    ];
    
    layoutMap.forEach(item => {
        const element = document.getElementById('img-' + item.idx);
        if (element) { 
            element.className = 'foto-card ' + item.className; 
            element.style.zIndex = item.z; 
        }
    });
}

function openPhotoModal(url, message) {
    isCarouselPaused = true; 
    document.getElementById('img-modal').src = url;
    document.getElementById('texto-mensaje').innerText = message;
    document.getElementById('modal-foto').classList.remove('modal-oculto');
}

function closePhotoModal() {
    isCarouselPaused = false; 
    const modal = document.getElementById('modal-foto');
    if (modal) {
        modal.classList.add('modal-oculto');
    }
}

// Start carousel on load
document.addEventListener('DOMContentLoaded', initCarousel);

// ============================================================
// SISTEMA DE POLVO ESTELAR PARA EL MODAL (NUEVO)
// ============================================================

const numberOfStars = 50; // Cantidad de partículas
const starContainer = document.getElementById('polvo-estelar');

function createStardust() {
    if (!starContainer) return;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        
        // Estilos básicos de la partícula
        star.style.position = 'absolute';
        star.style.backgroundColor = 'rgba(240, 230, 210, 0.8)'; // Color crema suave
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';

        // Tamaño aleatorio (entre 1px y 3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Posición inicial aleatoria
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';

        // Resplandor individual aleatorio
        const glow = Math.random() * 5 + 2;
        star.style.boxShadow = `0 0 ${glow}px rgba(240, 230, 210, 0.6)`;

        // Animación de parpadeo y movimiento flotante (usando GSAP si está cargado, si no, es estático)
        if (typeof gsap !== 'undefined') {
            gsap.to(star, {
                duration: Math.random() * 3 + 2, // Duración aleatoria
                opacity: Math.random() * 0.5 + 0.2, // Parpadeo
                y: '-=' + (Math.random() * 20 + 10), // Flotar hacia arriba
                x: '+=' + (Math.random() * 10 - 5), // Ligeramente a los lados
                repeat: -1, // Infinito
                yoyo: true, // Ida y vuelta
                ease: 'sine.inOut',
                delay: Math.random() * 2 // Retraso de inicio aleatorio
            });
        }

        starContainer.appendChild(star);
    }
}

// Ejecutar la creación de partículas cuando cargue el DOM
document.addEventListener('DOMContentLoaded', createStardust);