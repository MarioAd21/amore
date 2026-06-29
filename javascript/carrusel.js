// --- 1. MENSAJES ALEATORIOS ---
const mensajesAmor = [
    "El día que nos conocimos... ❤️",
    "Nuestra primera salida juntos.",
    "Te veías hermosa esa tarde.",
    "Construyendo sueños juntos.",
    "10 años de pura magia.",
    "Te amo cada día más.",
    "Mi lugar favorito es a tu lado.",
    "Por mil aventuras más.",
    "Eres mi casualidad más hermosa.",
    "Mi compañera de vida y de viajes.",
    "Aún conservo cada una de tus cartas."
];

// --- 2. GENERAMOS LAS 50 CARTAS AUTOMÁTICAMENTE ---
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
            // CAMBIO AQUÍ: Invertimos el signo para que siga el movimiento natural
            currentIndex = (currentIndex + (e.deltaY > 0 ? 1 : -1) + totalMemories) % totalMemories;
            updateFanLayout();
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    }, { passive: false });

// --- 1. NUEVO: Detectar dónde empieza a tocar el dedo ---
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    // --- 2. Control Táctil (Corregido) ---
    container.addEventListener('touchmove', (e) => {
        const triviaModal = document.getElementById('contenedor-trivia');
        if (triviaModal && triviaModal.style.display === 'block') return;

        if (!canRotate) return;
        
        // Ahora sí puede calcular la diferencia correctamente
        const diffX = touchStartX - e.touches[0].clientX;
        
        if (Math.abs(diffX) > touchSensitivity) {
            canRotate = false;
            // Deslizar izquierda suma 1, deslizar derecha resta 1
            currentIndex = (currentIndex + (diffX > 0 ? 1 : -1) + totalMemories) % totalMemories;
            updateFanLayout();
            
            // Actualizamos la posición inicial para que el arrastre sea fluido si el usuario no levanta el dedo
            touchStartX = e.touches[0].clientX; 
            
            setTimeout(() => { canRotate = true; }, rotationCooldown);
        }
    }, { passive: false }); // Recomendado para prevenir comportamientos raros de scroll al arrastrar

    // --- 3. Giro Automático (Corregido a la derecha) ---
    setInterval(() => { 
        const triviaModal = document.getElementById('contenedor-trivia');
        const isTriviaOpen = triviaModal && triviaModal.style.display === 'block';

        if(canRotate && !isCarouselPaused && !isTriviaOpen) { 
            // CAMBIO AQUÍ: Restamos 1 para que visualmente gire hacia la derecha
            currentIndex = (currentIndex - 1 + totalMemories) % totalMemories; 
            updateFanLayout(); 
        } 
    }, 4000);

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

document.addEventListener('DOMContentLoaded', initCarousel);

// --- POLVO ESTELAR ---
const numberOfStars = 50; 
const starContainer = document.getElementById('polvo-estelar');

function createStardust() {
    if (!starContainer) return;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        
        star.style.position = 'absolute';
        star.style.backgroundColor = 'rgba(240, 230, 210, 0.8)'; 
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';

        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        
        const glow = Math.random() * 5 + 2;
        star.style.boxShadow = `0 0 ${glow}px rgba(240, 230, 210, 0.6)`;

        if (typeof gsap !== 'undefined') {
            gsap.to(star, {
                duration: Math.random() * 3 + 2, 
                opacity: Math.random() * 0.5 + 0.2, 
                y: '-=' + (Math.random() * 20 + 10), 
                x: '+=' + (Math.random() * 10 - 5), 
                repeat: -1, 
                yoyo: true, 
                ease: 'sine.inOut',
                delay: Math.random() * 2 
            });
        }
        starContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', createStardust);