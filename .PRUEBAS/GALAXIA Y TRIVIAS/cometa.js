const cometEl = document.getElementById('cometa');

const whispers = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

if (cometEl) {
    cometEl.style.cursor = "pointer";
    
    const atraparCometa = (e) => {
        e.preventDefault(); 
        
        // 🚀 MEJORA: Hacemos que se desvanezca suavemente al ser atrapado en vez de cortarlo de golpe
        cometEl.classList.add("cometa-oculto");
        cometEl.style.pointerEvents = "none"; 

        setTimeout(() => {
            cometEl.style.display = "none";
            cometEl.classList.remove("cometa-oculto"); // Lo reseteamos para el próximo vuelo
        }, 800); // 800ms es lo que dura la transición en CSS

        const mensajeElegido = whispers[Math.floor(Math.random() * whispers.length)];

        // Usamos window.misSusurros para mantener coherencia con galaxia.js
        if (!window.misSusurros.includes(mensajeElegido)) {
            window.misSusurros.push(mensajeElegido);
            localStorage.setItem('misSusurros', JSON.stringify(window.misSusurros));
        }

        Swal.fire({
            title: '✨ Mensaje Fugaz ✨',
            text: mensajeElegido,
            background: 'rgba(10, 10, 20, 0.95)',
            color: '#ffffff',
            confirmButtonText: 'Guardar en el corazón ❤️',
            confirmButtonColor: 'cadetblue',
            customClass: { popup: 'modal-espacial-borde' }
        });
    };

    cometEl.onclick = atraparCometa;
    cometEl.ontouchstart = atraparCometa;
}

function launchComet(){
    const galaxySection = document.querySelector(".galaxybody");
    if(!galaxySection || !cometEl) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const startX = Math.random() < 0.5 ? -50 : Math.random() * (width / 2); 
    const startY = startX === -50 ? Math.random() * (height / 2) : -50; 
    
    const endX = width + 150;
    const endY = height + 150;

    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    cometEl.style.display = "block";
    cometEl.style.pointerEvents = "auto";
    cometEl.style.left = `${startX}px`;
    cometEl.style.top = `${startY}px`;
    cometEl.style.willChange = 'transform, opacity';

    const animation = cometEl.animate(
      [
       { transform: `translate3d(0,0,0) rotate(${angle}deg)`, opacity: 0 },
       { opacity: 1, offset: 0.1 },
       { opacity: 1, offset: 0.9 },
       { transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}deg)`, opacity: 0 }
      ],
      { duration: Math.random() * 6000 + 14000, easing: "linear" }
    );

    animation.onfinish = () => { 
        cometEl.style.display = "none"; 
    };
}

launchComet();
setInterval(launchComet, 35000);

if (window.solEl) {
    window.solEl.style.cursor = "pointer";
    window.solEl.onclick = () => {
        const listaHtml = window.misSusurros.length > 0 
            ? window.misSusurros.map(m => `<li>${m}</li>`).join('') 
            : "<li>Aún no has atrapado ningún susurro con el cometa...</li>";

        Swal.fire({
            title: '❤️ Corazón del Universo ❤️',
            html: `
                <p>Aquí viven todos los recuerdos que hemos capturado:</p>
                <ul style="text-align: left; margin-top: 15px;">${listaHtml}</ul>
            `,
            background: 'rgba(10, 10, 20, 0.95)',
            color: '#ffffff',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: 'cadetblue'
        });
    };
}