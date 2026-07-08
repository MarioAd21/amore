// --- 1. VARIABLES DE CONTROL GLOBALES ---
// (Ya no declaramos mensajesAmor aquí porque viene de cards.js)
let currentIndex = 0;
let touchStartX = 0;
let canRotate = true;
let isCarouselPaused = false; 
const rotationCooldown = 800;      
const touchSensitivity = 80;  
let isTabActive = true; 

// --- 2. GENERACIÓN DE LA GALERÍA ---
const memoryGallery = [];
// Usamos mensajesAmor que ya fue cargado por cards.js
for (let i = 1; i <= 50; i++) {
    const msjAleatorio = mensajesAmor[Math.floor(Math.random() * mensajesAmor.length)];
    memoryGallery.push({ 
        url: 'https://picsum.photos/220/340?random=' + i, 
        msj: msjAleatorio 
    });
}
const totalMemories = memoryGallery.length; 

// --- 3. DETECCIÓN DE CAMBIO DE PESTAÑA ---
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        isTabActive = false; 
    } else {
        isTabActive = true;  
        updateFanLayout();   
    }
});

// --- 4. FUNCIÓN PRINCIPAL DE ROTACIÓN ---
function initCarousel() {
    const container = document.getElementById('contenedor');
    if (!container) return;
    
    memoryGallery.forEach((memory, i) => {
        const img = document.createElement('img');
        img.src = memory.url;
        img.className = 'foto-card oculta';
        img.id = 'img-' + i;
        img.onclick = (e) => { 
            e.stopPropagation(); 
            if(img.classList.contains('pos-centro')) {
                // openPhotoModal ahora es llamado desde cards.js
                openPhotoModal(memory.url, memory.msj); 
            }
        };
        container.appendChild(img);
    });

    updateFanLayout();

    // Controles de Ratón
    container.addEventListener('wheel', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        e.preventDefault(); 
        if (!canRotate) return;

        if (Math.abs(e.deltaY) > 10) { 
            canRotate = false;
            currentIndex = (currentIndex + (e.deltaY > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    }, { passive: false });

    // Controles Táctiles
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    container.addEventListener('touchmove', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        if (!canRotate) return;
        const diffX = touchStartX - e.touches[0].clientX;
        
        if (Math.abs(diffX) > touchSensitivity) {
            canRotate = false; 
            currentIndex = (currentIndex + (diffX > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
        }
    });

    container.addEventListener('touchend', () => {
        setTimeout(() => { canRotate = true; }, 300);
    });

    // Giro Automático
    setInterval(() => { 
        const triviaModal = document.getElementById('contenedor-trivia');
        const isTriviaOpen = triviaModal && triviaModal.style.display === 'block';

        if(canRotate && !isCarouselPaused && !isTriviaOpen && isTabActive) { 
            currentIndex = (currentIndex + 1) % totalMemories; 
            updateFanLayout(); 
        } 
    }, 4000); 
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

document.addEventListener('DOMContentLoaded', initCarousel);