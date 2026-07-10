const tarjeta = document.getElementById('tarjeta');
const modalCarta = document.getElementById('CARTA_MODAL');
const seccionCarrusel = document.getElementById('CARRUSEL');

let rotacionY = 0; 
let rotacionX = 0; 
let interactuando = false;
let inicioMouseX = 0;
let inicioMouseY = 0;
let ultimoX = 0; 
let velocidadAutomatica = 0.5; 
let velocidadImpulso = 0; 
let animacionActiva = false; // Control para no duplicar el requestAnimationFrame

// --- FUNCIONES PARA CONECTAR CON EL CARRUSEL ---

function abrirCarta(imgSrc, texto) {
    // 1. Pausamos el carrusel (variable global de carrusel.js)
    isCarouselPaused = true;

    // 2. Ocultamos el carrusel y mostramos la carta
    
    modalCarta.style.display = 'flex';

    // 3. Inyectamos la imagen y el texto a la carta
    document.getElementById('img-frente').src = imgSrc;
    document.getElementById('frase-trasera').innerText = texto;

    // 4. Reiniciamos los valores de inercia
    rotacionY = 0;
    rotacionX = 0;
    velocidadImpulso = 0;
    tarjeta.style.transform = `rotateX(0deg) rotateY(0deg)`;

    // 5. Truco para reiniciar la animación CSS de entrada (El giro rápido de 4 segs)
    const cardIntro = document.querySelector('.card-intro');
    const fraseTrasera = document.getElementById('frase-trasera');
    
    cardIntro.style.animation = 'none';
    fraseTrasera.style.animation = 'none';
    
    // Forzamos un 'reflow' para que el navegador reinicie el estado
    void cardIntro.offsetWidth; 
    
    // Volvemos a aplicar las animaciones
    cardIntro.style.animation = 'intro-fast 4s cubic-bezier(0.25, 1, 0.5, 1) forwards';
    fraseTrasera.style.animation = 'fade-in-texto 1s ease-in forwards 4s';

    // 6. Arrancamos el motor de inercia
    if (!animacionActiva) {
        animacionActiva = true;
        animar();
    }
}

function cerrarCarta() {
    // Volvemos a mostrar el carrusel y ocultamos la carta
    modalCarta.style.display = 'none';
    
    
    // Despausamos el carrusel
    isCarouselPaused = false;
    animacionActiva = false; // Detiene el requestAnimationFrame
}

// --- FÍSICA DE LA CARTA ---

function iniciarInteraccion(x, y) {
    interactuando = true;
    inicioMouseX = x;
    inicioMouseY = y;
    ultimoX = x;
    velocidadImpulso = 0; 
}

function moverInteraccion(x, y) {
    if (!interactuando) return;
    
    const diferenciaX = x - inicioMouseX;
    const diferenciaY = y - inicioMouseY;
    
    rotacionY += diferenciaX * 0.4; 
    rotacionX -= diferenciaY * 0.4; 
    rotacionX = Math.max(-45, Math.min(45, rotacionX));

    velocidadImpulso = (x - ultimoX) * 0.5;
    
    ultimoX = x;
    inicioMouseX = x;
    inicioMouseY = y;
}

function terminarInteraccion() {
    interactuando = false;
}

// Eventos de interacción en la carta (Touch y Mouse)
modalCarta.addEventListener('mousedown', (e) => {
    // Si hacemos clic en el botón de cerrar, no rotamos la carta
    if(e.target.id === 'btn-cerrar') return; 
    iniciarInteraccion(e.clientX, e.clientY);
});
modalCarta.addEventListener('mousemove', (e) => moverInteraccion(e.clientX, e.clientY));
modalCarta.addEventListener('mouseup', terminarInteraccion);

modalCarta.addEventListener('touchstart', (e) => iniciarInteraccion(e.touches[0].clientX, e.touches[0].clientY));
modalCarta.addEventListener('touchmove', (e) => moverInteraccion(e.touches[0].clientX, e.touches[0].clientY));
modalCarta.addEventListener('touchend', terminarInteraccion);

function animar() {
    if(!animacionActiva) return; // Si cerramos la carta, el motor se apaga

    if (!interactuando) {
        velocidadImpulso *= 0.95;
        rotacionY += velocidadAutomatica + velocidadImpulso;
        rotacionX = rotacionX * 0.95; 
    }
    
    tarjeta.style.transform = `rotateX(${rotacionX}deg) rotateY(${rotacionY}deg)`;
    requestAnimationFrame(animar);
}