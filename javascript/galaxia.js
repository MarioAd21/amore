/* --- INICIALIZACIÓN --- */
let misSusurros = JSON.parse(localStorage.getItem('misSusurros')) || [];
const solEl = document.getElementById('corazon-central');
const universeContainer = document.getElementById('universo');
const cometEl = document.getElementById('cometa');
const whispers = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

window.planetRefs = [];
const yearsList = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

if (cometEl) {
    cometEl.style.cursor = "pointer";
    
    const atraparCometa = (e) => {
        e.preventDefault(); 
        cometEl.style.display = "none";
        cometEl.style.pointerEvents = "none"; 

        const mensajeElegido = whispers[Math.floor(Math.random() * whispers.length)];

        if (!misSusurros.includes(mensajeElegido)) {
            misSusurros.push(mensajeElegido);
            localStorage.setItem('misSusurros', JSON.stringify(misSusurros));
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

/* --- GENERACIÓN DE PLANETAS --- */
yearsList.forEach((year, index) => {
    const radiusX = 150 + (index * 38);
    const radiusY = 75 + (index * 18);

    const orbit = document.createElement("div");
    orbit.className = "orbita-elipse";
    orbit.style.width = `${radiusX * 2}px`;
    orbit.style.height = `${radiusY * 2}px`;
    orbit.style.left = "50%";
    orbit.style.top = "50%";
    orbit.style.transform = "translate(-50%,-50%)";
    universeContainer.appendChild(orbit);

    const planetEl = document.createElement("div");
    planetEl.className = "planeta";
    planetEl.style.setProperty("--p-color", `hsl(${index * 32}, 90%, 60%)`);
    planetEl.innerHTML = `<span>${year}</span>`;
    planetEl.style.position = "absolute";
    planetEl.style.left = "50%";
    planetEl.style.top = "50%";
    planetEl.style.marginLeft = "-11px";
    planetEl.style.marginTop = "-11px";
    universeContainer.appendChild(planetEl);

    const ref = {
        el: planetEl,
        year: year,
        index: index,
        rx: radiusX,
        ry: radiusY,
        angle: Math.random() * 6,
        velocity: 0.003 - (index * 0.00008),
        isActive: true,
        isCompleted: false,
        isLocked: index !== 0,
        posX: 0,
        posY: 0
    };

    window.planetRefs.push(ref);
    if (ref.isLocked) { planetEl.style.filter = "grayscale(100%) opacity(0.4)"; }

    planetEl.onclick = () => {
        if (ref.isLocked) {
            Swal.fire({
                title: 'Planeta Bloqueado 🔒',
                text: 'Debes completar las trivias de los años anteriores para viajar a este recuerdo.',
                icon: 'warning',
                background: 'rgba(10, 10, 20, 0.95)',
                color: '#ffffff',
                confirmButtonColor: 'cadetblue',
                customClass: { popup: 'modal-espacial-borde' }
            });
            return; 
        }

        if (!ref.isCompleted) {
            travelToPlanet(ref);
        } else {
            showLockedMessage(ref.year);
        }
    };
}); 

function animationLoop(){
    planetRefs.forEach(p=>{
        if(!p.isActive) return;
        p.angle += p.velocity;
        p.posX = Math.cos(p.angle)*p.rx;
        p.posY = Math.sin(p.angle)*p.ry;
        p.el.style.transform= `translate3d(${p.posX}px,${p.posY}px,0)`;
    });
    requestAnimationFrame(animationLoop);
}

animationLoop();

function travelToPlanet(ref) {
    ref.isActive = false;
    cometEl.style.display = "none";
    universeContainer.style.transformOrigin = `calc(50% + ${ref.posX}px) calc(50% + ${ref.posY}px)`;
    universeContainer.style.transform = "scale(6)";
    universeContainer.style.opacity = "0.4";
    setTimeout(() => { if (typeof showTrivia === "function") showTrivia(ref); }, 1000);
}

function resetUniverse() {
    universeContainer.style.transform = "scale(1)";
    universeContainer.style.opacity = "1";
}

function showLockedMessage(year){
    const yearMessages={
        "2016":"Donde todo comenzó... nuestra primera micro. 🚌",
        "2017":"El año de nuestro primer viaje inolvidable. 🌊",
        "2018":"Cuando aprendimos que juntos todo es mejor. ✨"
    };

    const yearGifs={
        "2016": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdtcm9wYnk1Y2Z3Y29wZXBlbXg1M3N5bXN0Yms1cXA0d3F0Ym02byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/vERfN7D9c7rSo/giphy.gif",
        "2017": "https://media.giphy.com/media/3oriO0OEd9hmgFsi5O/giphy.gif",
        "2018": "https://media.giphy.com/media/l41JWm5vUeWSkvFp6/giphy.gif"
    };

    const mensaje = yearMessages[year] || "Este recuerdo ya vive en nuestro corazón. ❤️";
    const gifElegido = yearGifs[year] || "https://media.giphy.com/media/l0EwZ92cG9x9JKPLu/giphy.gif"; 

    Swal.fire({
        title: `Año ${year}`,
        text: mensaje,
        imageUrl: gifElegido,
        imageWidth: 200, 
        imageHeight: 200, 
        imageAlt: `Recuerdo del año ${year}`,
        iconColor: '#5f9ea0',
        background: 'rgba(10, 10, 20, 0.95)',
        color: '#ffffff',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'cadetblue',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        customClass: { popup: 'modal-espacial-borde' }
    });
}

function launchComet(){
    const trivia = document.getElementById("contenedor-trivia");
    if (trivia && trivia.style.display === "block") return; 
    if (document.querySelector('.swal2-container')) return;
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

    const animation = cometEl.animate(
      [
       { transform: `translate3d(0,0,0) rotate(${angle}deg)`, opacity: 0, filter: 'drop-shadow(0 0 5px #fff)' },
       { opacity: 1, offset: 0.1, filter: 'drop-shadow(0 0 15px #e0f7fa)' },
       { opacity: 1, offset: 0.9, filter: 'drop-shadow(0 0 15px #e0f7fa)' },
       { transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}deg)`, opacity: 0 }
      ],
      { duration: Math.random() * 6000 + 14000, easing: "linear" }
    );

    const relojPartculas = setInterval(() => {
        if (cometEl.style.display === "none") {
            clearInterval(relojPartculas);
            return;
        }

        const rectComet = cometEl.getBoundingClientRect();
        const rectUniverse = universeContainer.getBoundingClientRect();

        const x = rectComet.left - rectUniverse.left + (rectComet.width / 2);
        const y = rectComet.top - rectUniverse.top + (rectComet.height / 2);

        spawnCometParticle(x, y);
    }, 90);

    animation.onfinish = () => { 
        cometEl.style.display = "none"; 
        clearInterval(relojPartculas);
    };
}

function spawnCometParticle(x, y) {
    const particula = document.createElement("div");
    particula.className = "cometa-particula";
    
    // 👇 AGREGA ESTA LÍNEA 👇
    particula.style.position = "absolute"; 
    
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

    universeContainer.appendChild(particula);
    
    requestAnimationFrame(() => {
        particula.style.opacity = "0";
        particula.style.transform = "scale(0.2)";
    });

    setTimeout(() => { particula.remove(); }, 800);
}

launchComet();
setInterval(launchComet,35000);

function generarCieloEstrellado() {
    const galaxia = document.querySelector('.galaxybody');
    if (!galaxia) return;
    const esMovil = window.innerWidth <= 768;
    const numeroEstrellas = esMovil ? 60 : 180;
    for (let i = 0; i < numeroEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.style.position = 'absolute';
        estrella.style.width = `${Math.random() * 1.8 + 0.8}px`;
        estrella.style.height = estrella.style.width;
        estrella.style.background = '#ffffff';
        estrella.style.borderRadius = '50%';
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.top = `${Math.random() * 100}%`;
        estrella.style.opacity = Math.random() * 0.7 + 0.3;
        estrella.style.pointerEvents = 'none';
        estrella.style.zIndex = '0';
        estrella.style.animation = `parpadeo-estelar ${Math.random() * 3 + 2}s infinite alternate ease-in-out`;
        galaxia.appendChild(estrella);
    }
}
generarCieloEstrellado();

if (solEl) {
    solEl.style.cursor = "pointer";
    solEl.onclick = () => {
        const listaHtml = misSusurros.length > 0 
            ? misSusurros.map(m => `<li>${m}</li>`).join('') 
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