const memoryGallery = [];
for (let i = 1; i <= 50; i++) {
    const msjAleatorio = mensajesAmor[Math.floor(Math.random() * mensajesAmor.length)];
    memoryGallery.push({ 
        url: 'img/ejemp.jpeg', // Imagen de prueba para que no se rompa
        msj: msjAleatorio 
    });
}

// --- 3. VARIABLES DE CONTROL ---
let currentIndex = 0;
const totalMemories = memoryGallery.length; // Ahora sí detectará 50
let touchStartX = 0;
let canRotate = true;
let isCarouselPaused = false; 
const rotationCooldown = 400;      
const touchSensitivity = 80;  

// --- 4. FUNCIÓN PRINCIPAL ---
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

    // Control Mouse
    container.addEventListener('wheel', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        e.preventDefault(); 
        if (!canRotate) return;

        if (Math.abs(e.deltaY) > 5) { 
            canRotate = false;
            // Dirección invertida
            currentIndex = (currentIndex + (e.deltaY > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    }, { passive: false });

    // Control Táctil
    container.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
    
    container.addEventListener('touchmove', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        if (!canRotate) return;
        const diffX = touchStartX - e.touches[0].clientX;
        
        if (Math.abs(diffX) > touchSensitivity) {
            canRotate = false;
            // Dirección invertida
            currentIndex = (currentIndex + (diffX > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    });

    // Giro Automático
    setInterval(() => { 
        const triviaModal = document.getElementById('contenedor-trivia');
        const isTriviaOpen = triviaModal && triviaModal.style.display === 'block';

        if(canRotate && !isCarouselPaused && !isTriviaOpen) { 
            // Avanza hacia la derecha
            currentIndex = (currentIndex + 1) % totalMemories; 
            updateFanLayout(); 
        } 
    }, 4000); // Lo subí a 4 segundos para que no maree tanto
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
