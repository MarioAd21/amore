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

function openPhotoModal(url, message) {
    isCarouselPaused = true; 
    document.body.classList.add('modal-abierto');
    document.getElementById('img-modal').src = url;
    document.getElementById('texto-mensaje').innerText = message;
    document.getElementById('modal-foto').classList.remove('modal-oculto');
}

function closePhotoModal() {
    isCarouselPaused = false; 
    document.body.classList.remove('modal-abierto');
    const modal = document.getElementById('modal-foto');
    if (modal) {
        modal.classList.add('modal-oculto');
    }
}

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