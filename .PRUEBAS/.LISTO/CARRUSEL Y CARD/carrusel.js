const mensajesAmor = typeof window.mensajesAmor !== 'undefined' ? window.mensajesAmor : ["Te amo", "Recuerdo inolvidable", "Siempre juntos"];

let currentIndex = 0;
let touchStartX = 0;
let canRotate = true;
let isCarouselPaused = false; 
let isTabActive = true; 

const rotationCooldown = 800;      
const touchSensitivity = 80;  
const totalMemories = 50; 

const container = document.getElementById('contenedor');
const cardElements = []; 

function initGallery() {
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalMemories; i++) {
        const msjAleatorio = mensajesAmor[Math.floor(Math.random() * mensajesAmor.length)];
        
        const img = document.createElement('img');
        img.src = `https://picsum.photos/220/340?random=${i}`;
        img.className = 'foto-card oculta';
        img.alt = msjAleatorio; 
        img.loading = "lazy";   
        
        cardElements.push(img); 
        fragment.appendChild(img);
    }
    
    container.appendChild(fragment); 
}

function updateFanLayout() {
    cardElements.forEach(card => { 
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
        const element = cardElements[item.idx];
        if (element) { 
            element.className = `foto-card ${item.className}`; 
            element.style.zIndex = item.z; 
        }
    });
}

initGallery();
updateFanLayout();

document.addEventListener("visibilitychange", () => {
    isTabActive = !document.hidden;
    if (isTabActive) updateFanLayout();
});

container.addEventListener('wheel', (e) => {
    e.preventDefault(); 
    if (!canRotate) return;
    if (Math.abs(e.deltaY) > 10) { 
        canRotate = false;
        currentIndex = (currentIndex + (e.deltaY > 0 ? -1 : 1) + totalMemories) % totalMemories;
        updateFanLayout();
        setTimeout(() => { canRotate = true; }, rotationCooldown);
    }
}, { passive: false });

container.addEventListener('touchstart', (e) => { 
    touchStartX = e.touches[0].clientX; 
}, { passive: true });

container.addEventListener('touchmove', (e) => {
    if (!canRotate) return;
    const diffX = touchStartX - e.touches[0].clientX;
    if (Math.abs(diffX) > touchSensitivity) {
        canRotate = false; 
        currentIndex = (currentIndex + (diffX > 0 ? -1 : 1) + totalMemories) % totalMemories;
        updateFanLayout();
    }
}, { passive: true });

container.addEventListener('touchend', () => { 
    setTimeout(() => { canRotate = true; }, 300); 
});

// NUEVO: Evento de click para abrir la carta
container.addEventListener('click', (e) => {
    // Verificamos si hicimos clic en una de las fotos
    if (e.target.classList.contains('foto-card')) {
        const imagenSeleccionada = e.target.src;
        const textoSeleccionado = e.target.alt;
        
        // Llamamos a la función que vive en card.js
        if (typeof abrirCarta === 'function') {
            abrirCarta(imagenSeleccionada, textoSeleccionado);
        }
    }
});

setInterval(() => { 
    if(canRotate && !isCarouselPaused && isTabActive) { 
        currentIndex = (currentIndex + 1) % totalMemories; 
        updateFanLayout(); 
    } 
}, 4000);