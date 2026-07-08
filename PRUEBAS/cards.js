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

// --- CONTROL DE LA CARTA 3D Y POLVO ESTELAR ---
let starsCreated = false;

function abrirCarta3D(urlImagen) {
    isCarouselPaused = true;
    
    const modal = document.getElementById('modal-carta-3d');
    const imgFrente = document.getElementById('img-carta-frente');
    const contenedorCarta = document.getElementById('carta-animada');
    
    // --- NUEVO: Insertar mensaje aleatorio ---
    const divMensaje = document.getElementById('mensaje-carta');
    const msjElegido = mensajesAmor[Math.floor(Math.random() * mensajesAmor.length)];
    divMensaje.innerText = msjElegido;
    
    imgFrente.src = urlImagen;
    modal.style.display = 'flex';
    
    // ... resto de tu código de animación ...
    contenedorCarta.style.animation = 'none';
    contenedorCarta.offsetHeight; 
    contenedorCarta.style.animation = null; 
    
    const tarjeta = document.getElementById('tarjeta');
    tarjeta.classList.remove('giro-continuo');
    
    setTimeout(() => {
        if(modal.style.display === 'flex') {
            tarjeta.classList.add('giro-continuo');
        }
    }, 3000); 
    
    if (!starsCreated) {
        createStardust();
        starsCreated = true;
    }
}

function cerrarCarta3D() {
    const modal = document.getElementById('modal-carta-3d');
    const tarjeta = document.getElementById('tarjeta');
    
    modal.style.display = 'none';
    tarjeta.classList.remove('giro-continuo');
    
    isCarouselPaused = false;
}

function createStardust() {
    const numberOfStars = 150; 
    const starContainer = document.getElementById('polvo-estelar');
    if (!starContainer) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        
        star.style.position = 'absolute';
        star.style.backgroundColor = 'rgba(255, 250, 240, 0.9)'; 
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';

        const size = Math.random() * 3 + 1; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = (Math.random() * screenHeight) + 'px';
        star.style.left = (Math.random() * screenWidth) + 'px';
        
        const glow = Math.random() * 8 + 3;
        star.style.boxShadow = `0 0 ${glow}px rgba(255, 250, 240, 0.8)`;

        if (typeof gsap !== 'undefined') {
            gsap.to(star, {
                duration: Math.random() * 3 + 2, 
                opacity: Math.random() * 0.7 + 0.3, 
                y: '-=' + (Math.random() * 20 + 10), 
                x: '+=' + (Math.random() * 15 - 7.5), 
                repeat: -1, 
                yoyo: true, 
                ease: 'sine.inOut',
                delay: Math.random() * 2 
            });
        }
        starContainer.appendChild(star);
    }
}