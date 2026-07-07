// --- 1. DECLARACIÓN DE MENSAJES (Faltaba en tu código) ---
const mensajesAmor = [
    "Cada momento a tu lado es mi favorito.",
    "Gracias por ser mi lugar seguro.",
    "Tu sonrisa ilumina perfectamente mi mundo.",
    "Cien vidas más elegiría pasarlas contigo.",
    "Eres el amor de mi vida."
];

// --- 2. GENERACIÓN DE LA GALERÍA ---
const memoryGallery = [];
for (let i = 1; i <= 50; i++) {
    const msjAleatorio = mensajesAmor[Math.floor(Math.random() * mensajesAmor.length)];
    memoryGallery.push({ 
        url: 'https://picsum.photos/220/340?random=' + i, // Cambiado temporalmente a imágenes dinámicas reales para pruebas
        msj: msjAleatorio 
    });
}

// --- 3. VARIABLES DE CONTROL ---
let currentIndex = 0;
const totalMemories = memoryGallery.length; 
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
        img.onclick = (e) => { 
            e.stopPropagation(); // Evita conflictos con clics del contenedor
            if(img.classList.contains('pos-centro')) {
                openPhotoModal(memory.url, memory.msj); 
            }
        };
        container.appendChild(img);
    });

    updateFanLayout();

    // --- CONTROL MOUSE OPTIMIZADO ---
    container.addEventListener('wheel', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        e.preventDefault(); 
        
        // Si está en enfriamiento, ignoramos por completo CUALQUIER movimiento de rueda sobrante
        if (!canRotate) return;

        if (Math.abs(e.deltaY) > 10) { // Subimos un poco el umbral mínimo
            canRotate = false;
            
            // Registra un único movimiento en la dirección correspondiente
            currentIndex = (currentIndex + (e.deltaY > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
            
            // Bloqueamos la entrada de más giros por 500ms para limpiar la ráfaga del scroll
            setTimeout(() => { canRotate = true; }, 500);
        }
    }, { passive: false });

    // --- CONTROL TÁCTIL OPTIMIZADO ---
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    container.addEventListener('touchmove', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        // Si ya giró en este "arrastre", bloqueamos hasta que levante el dedo
        if (!canRotate) return;
        
        const diffX = touchStartX - e.touches[0].clientX;
        
        if (Math.abs(diffX) > touchSensitivity) {
            canRotate = false; // Se bloquea inmediatamente
            
            currentIndex = (currentIndex + (diffX > 0 ? -1 : 1) + totalMemories) % totalMemories;
            updateFanLayout();
            
            // NOTA: No usamos setTimeout aquí. 
            // Para móviles, es mejor obligar al usuario a levantar el dedo para el siguiente giro.
        }
    });

    // Restablecer el control táctil cuando el usuario levanta el dedo
    container.addEventListener('touchend', () => {
        canRotate = true; 
    });

    // Giro Automático
    setInterval(() => { 
        const triviaModal = document.getElementById('contenedor-trivia');
        const isTriviaOpen = triviaModal && triviaModal.style.display === 'block';

        if(canRotate && !isCarouselPaused && !isTriviaOpen) { 
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

// --- 5. FUNCIONES DEL MODAL (Faltaban en tu JS) ---
function openPhotoModal(url, mensaje) {
    const modal = document.getElementById('modal-foto');
    const modalImg = document.getElementById('modal-img');
    const modalTxt = document.getElementById('modal-texto');
    
    modalImg.src = url;
    modalTxt.innerText = mensaje;
    modal.classList.remove('modal-oculto');
    isCarouselPaused = true; // Pausa el autoplay mientras ve la foto
}

function closePhotoModal() {
    const modal = document.getElementById('modal-foto');
    modal.classList.add('modal-oculto');
    isCarouselPaused = false; // Reanuda el autoplay
}

document.addEventListener('DOMContentLoaded', initCarousel);
