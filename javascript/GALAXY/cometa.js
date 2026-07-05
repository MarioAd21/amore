const cometEl = document.getElementById('cometa');

// Frases románticas para cuando se haga clic en el cometa
const whispers = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

// Evento para atrapar el cometa
cometEl.addEventListener('click', () => {
    const modalCometa = document.getElementById('modal-cometa');
    const textoCometa = document.getElementById('texto-cometa');
    
    const fraseAleatoria = whispers[Math.floor(Math.random() * whispers.length)];
    textoCometa.innerText = fraseAleatoria;
    
    modalCometa.style.display = 'block';
    
    cometEl.style.display = 'none';
});

// Función para cerrar el modal del cometa (la llamamos desde el HTML)
window.closeCometModal = function() {
    document.getElementById('modal-cometa').style.display = 'none';
};

//Funcion para lanzar el coemtas
function launchComet(){
    const galaxySection = document.querySelector(".galaxybody");
    if(!galaxySection || !cometEl) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calcular punto de inicio
    const startX = Math.random() < 0.5 ? -50 : Math.random() * (width / 2); 
    const startY = startX === -50 ? Math.random() * (height / 2) : -50; 
    
    // Calcular punto final (fuera de la pantalla)
    const endX = width + 150;
    const endY = height + 150;

    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    cometEl.style.display = "block";
    cometEl.style.left = `${startX}px`;
    cometEl.style.top = `${startY}px`;

    // Animación principal del cometa
    const animation = cometEl.animate(
      [
       { transform: `translate3d(0,0,0) rotate(${angle}deg)`, opacity: 0, filter: 'drop-shadow(0 0 5px #fff)' },
       { opacity: 1, offset: 0.1, filter: 'drop-shadow(0 0 15px #e0f7fa)' },
       { opacity: 1, offset: 0.9, filter: 'drop-shadow(0 0 15px #e0f7fa)' },
       { transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}deg)`, opacity: 0 }
      ],
      { duration: Math.random() * 6000 + 14000, easing: "linear" }
    );

    // Generador de partículas que dejan la estela
    const relojPartculas = setInterval(() => {
        if (cometEl.style.display === "none") {
            clearInterval(relojPartculas);
            return;
        }

        const rectComet = cometEl.getBoundingClientRect();
        
        // Asumimos que universeContainer está declarado en galaxia.js
        if(typeof universeContainer !== 'undefined') {
            const rectUniverse = universeContainer.getBoundingClientRect();
            const x = rectComet.left - rectUniverse.left + (rectComet.width / 2);
            const y = rectComet.top - rectUniverse.top + (rectComet.height / 2);
            spawnCometParticle(x, y);
        }
    }, 90);

    // Limpieza al terminar la animación
    animation.onfinish = () => { 
        cometEl.style.display = "none"; 
        clearInterval(relojPartculas);
    };
}

// Particulas del cometa
function spawnCometParticle(x, y) {
    const particula = document.createElement("div");
    particula.className = "cometa-particula";
    
    // Ajustes cruciales para que la estela no interfiera con otros elementos
    particula.style.position = 'absolute';
    particula.style.pointerEvents = 'none';
    
    const dispersiónX = (Math.random() - 0.5) * 12;
    const dispersiónY = (Math.random() - 0.5) * 12;
    
    particula.style.left = `${x + dispersiónX}px`;
    particula.style.top = `${y + dispersiónY}px`;
    
    const tamano = Math.random() * 4 + 1; 
    particula.style.width = `${tamano}px`;
    particula.style.height = `${tamano}px`;
    
    const colores = ["#ffffff", "#e0f7fa", "#87ceeb", "#5f9ea0"];
    particula.style.background = colores[Math.floor(Math.random() * colores.length)];
    particula.style.borderRadius = "50%";
    particula.style.boxShadow = `0 0 ${tamano}px ${particula.style.background}`;
    particula.style.transition = "all 0.8s ease-out"; 

    // Adjuntar la partícula al universo
    universeContainer.appendChild(particula);
    
    requestAnimationFrame(() => {
        particula.style.opacity = "0";
        particula.style.transform = "scale(0.2)";
    });

    // Eliminar partícula del DOM
    setTimeout(() => { particula.remove(); }, 800);
}

// Iniciar el ciclo del cometa
launchComet();
setInterval(launchComet, 45000);