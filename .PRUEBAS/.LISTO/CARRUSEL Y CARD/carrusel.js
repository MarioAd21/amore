const mensajesAmor = typeof window.mensajesAmor !== 'undefined' ? window.mensajesAmor : ["Te amo", "Recuerdo inolvidable", "Siempre juntos"];

let currentIndex = 0;
let touchStartX = 0;
let canRotate = true;
let isCarouselPaused = false; 
let isTabActive = true; 

let autoRotateTimer; 

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

function iniciarTemporizador() {
    autoRotateTimer = setInterval(() => { 
        if(canRotate && !isCarouselPaused && isTabActive) { 
            currentIndex = (currentIndex + 1) % totalMemories; 
            updateFanLayout(); 
        } 
    }, 4000); 
}

function resetearTemporizador() {
    clearInterval(autoRotateTimer);
    iniciarTemporizador();          
}

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
        resetearTemporizador(); 
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
        resetearTemporizador(); 
    }
}, { passive: true });

container.addEventListener('touchend', () => { 
    setTimeout(() => { canRotate = true; }, 300); 
});

// Evento de click para interactuar con las fotos y abrir la carta
container.addEventListener('click', (e) => {
    const carta = e.target;
    
    if (!carta.classList.contains('foto-card')) return;

    if (carta.classList.contains('pos-centro')) {
        const imagenSeleccionada = carta.src;
        const textoSeleccionado = carta.alt;
        
        if (typeof abrirCarta === 'function') {
            abrirCarta(imagenSeleccionada, textoSeleccionado);
        }
    } 
    else {
        if (!canRotate) return; 
        
        let pasos = 0;
        if (carta.classList.contains('pos-d1')) pasos = 1;
        else if (carta.classList.contains('pos-d2')) pasos = 2;
        else if (carta.classList.contains('pos-d3')) pasos = 3;
        else if (carta.classList.contains('pos-i1')) pasos = -1;
        else if (carta.classList.contains('pos-i2')) pasos = -2;
        else if (carta.classList.contains('pos-i3')) pasos = -3;

        if (pasos !== 0) {
            canRotate = false;
            resetearTemporizador(); 
            
            const direccion = pasos > 0 ? 1 : -1;
            let pasosFaltantes = Math.abs(pasos);
            
            // Función recursiva para girar la rueda paso a paso
            function girarPasoAPaso() {
                currentIndex = (currentIndex + direccion + totalMemories) % totalMemories;
                updateFanLayout();
                pasosFaltantes--;
                
                if (pasosFaltantes > 0) {
                    // Espera 150 milisegundos entre cada carta para simular el giro
                    setTimeout(girarPasoAPaso, 150);
                } else {
                    setTimeout(() => { canRotate = true; }, rotationCooldown);
                }
            }
            
            girarPasoAPaso();
        }
    }
});

iniciarTemporizador();