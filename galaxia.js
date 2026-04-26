const datosAniversario = {
    "2016": [{ pregunta: "¿Fecha exacta de nuestro inicio?", opciones: ["15 Nov", "21 Nov", "30 Nov"], correcta: 1, mensaje: "¡El inicio de todo! ❤️" }],
    "2017": [{ pregunta: "¿Primer viaje juntos?", opciones: ["Playa", "Montaña", "Campo"], correcta: 0, mensaje: "Inolvidable... 🌊" }]
};

const susurros = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

const añosList = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const planetasRefs = [];
const universo = document.getElementById('universo');

// --- CORRECCIÓN: Seleccionamos el contenedor padre para las explosiones ---
const galaxyContainer = document.querySelector('.estrellas')?.parentElement || document.body;

// Inicialización
añosList.forEach((año, i) => {
    const rx = 150 + (i * 38);
    const ry = 75 + (i * 18);
    
    const orbita = document.createElement('div');
    orbita.className = 'orbita-elipse';
    orbita.style.width = `${rx * 2}px`;
    orbita.style.height = `${ry * 2}px`;
    // Forzamos el centrado de la órbita en el CSS o aquí:
    orbita.style.left = "50%";
    orbita.style.top = "50%";
    orbita.style.transform = "translate(-50%, -50%)";
    universo.appendChild(orbita);

    const p = document.createElement('div');
    p.className = 'planeta';
    p.style.setProperty('--p-color', `hsl(${i * 32}, 90%, 60%)`);
    p.innerHTML = `<span>${año}</span>`;
    universo.appendChild(p);

    const ref = { el: p, año: año, rx: rx, ry: ry, ang: Math.random() * 6, vel: 0.005 - (i * 0.0003), activo: true, completado: false, x: 0, y: 0 };
    planetasRefs.push(ref);
    
    p.onclick = () => {
        if (!ref.completado) {
            viajarAlPlaneta(ref);
        } else {
            mostrarMensajeBloqueado(ref.año);
        }
    };
});

function loop() {
    planetasRefs.forEach(p => {
        if (!p.activo) return; // Pausar si estamos en trivia
        p.ang += p.vel;
        p.x = Math.cos(p.ang) * p.rx;
        p.y = Math.sin(p.ang) * p.ry;
        // Posicionamiento absoluto respecto al centro de #universo
        p.el.style.left = `calc(50% + ${p.x}px - 11px)`;
        p.el.style.top = `calc(50% + ${p.y}px - 11px)`;
    });
    requestAnimationFrame(loop);
}
loop();

function viajarAlPlaneta(ref) {
    ref.activo = false; 
    universo.style.transformOrigin = `calc(50% + ${ref.x}px) calc(50% + ${ref.y}px)`;
    universo.style.transform = "scale(5)";
    universo.style.opacity = "0";

    setTimeout(() => {
        universo.style.display = 'none';
        mostrarTrivia(ref);
    }, 1000);
}

function mostrarTrivia(ref) {
    const contenedor = document.getElementById('contenedor-trivia');
    const preguntasAño = bancoDePreguntas[ref.año] || [];
    
    let preguntaActual = 0;
    let aciertos = 0;

    contenedor.style.display = 'block';
    universo.style.display = 'none';

    function renderizarPregunta() {
        if (preguntaActual < preguntasAño.length) {
            const data = preguntasAño[preguntaActual];
            document.getElementById('trivia-titulo').innerText = `Año ${ref.año} (${preguntaActual + 1}/10)`;
            document.getElementById('trivia-pregunta').innerText = data.p;
            
            const opcionesDiv = document.getElementById('trivia-opciones');
            opcionesDiv.innerHTML = ''; // Limpiar botones anteriores

            data.o.forEach((opcion, index) => {
                const btn = document.createElement('button');
                btn.className = 'boton-opcion';
                btn.innerText = opcion;
                btn.onclick = () => validarRespuesta(index);
                opcionesDiv.appendChild(btn);
            });
        } else {
            finalizarTrivia();
        }
    }

    function validarRespuesta(indice) {
        if (indice === preguntasAño[preguntaActual].c) {
            aciertos++;
            // Efecto visual rápido de acierto
        }
        preguntaActual++;
        renderizarPregunta();
    }

    function finalizarTrivia() {
        if (aciertos >= 7) { // Gana si tiene 7 de 10
            document.getElementById('trivia-pregunta').innerText = `¡Logrado! ${aciertos}/10 correctas.`;
            document.getElementById('trivia-opciones').innerHTML = `
                <button class="boton-opcion" onclick="cerrarTriviaExito(${ref.año})">Desbloquear Año</button>
            `;
            crearCorazonExplosivo('cadetblue'); // ¡Aquí lanzamos los fuegos!
        } else {
            document.getElementById('trivia-pregunta').innerText = `Casi... solo ${aciertos}/10. ¡Inténtalo de nuevo!`;
            document.getElementById('trivia-opciones').innerHTML = `
                <button class="boton-opcion" onclick="reintentarTrivia()">Reintentar</button>
            `;
        }
    }

    renderizarPregunta();
}

function crearCorazonExplosivo(color, callback) {
    const num = 70;
    const parts = [];
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;

    for(let i=0; i<num; i++){
        const p = document.createElement('div');
        p.className = 'pixel';
        p.style.setProperty('--p-color', color);
        // Posición relativa al viewport para que sea visible sobre el modal
        p.style.position = "fixed"; 
        p.style.left = "50%"; 
        p.style.top = "50%";
        document.body.appendChild(p);
        parts.push(p);
    }

    // Animación de dispersión
    setTimeout(() => {
        parts.forEach(p => {
            p.style.transition = "all 1s ease-out";
            p.style.transform = `translate(${(Math.random()-0.5)*500}px, ${(Math.random()-0.5)*500}px)`;
        });
    }, 50);

    // Formación de corazón
    setTimeout(() => {
        parts.forEach((p, i) => {
            p.style.transition = "all 1.5s cubic-bezier(0.17, 0.88, 0.32, 1.27)";
            const t = (i/num) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            p.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
        });
    }, 1100);

    setTimeout(() => {
        parts.forEach(p => p.style.opacity = "0");
        setTimeout(() => { 
            parts.forEach(p => p.remove()); 
            if(callback) callback(); 
        }, 1000);
    }, 4000);
}

function mostrarMensajeBloqueado(año) {
            // Aquí puedes personalizar un mensaje por cada año
            const mensajesAño = {
                "2016": "Donde todo comenzó... nuestra primera micro. 🚌",
                "2017": "El año de nuestro primer viaje inolvidable. 🌊",
                "2018": "Cuando aprendimos que juntos todo es mejor. ✨"
            };
            
            const texto = mensajesAño[año] || "Este recuerdo ya vive en nuestro corazón. ❤️";
            alert(texto); // O puedes usar un modal más bonito si prefieres
        }

        // --- LÓGICA DEL COMETA ---
        const cometaEl = document.getElementById('cometa');
        function lanzarCometa() {
            if (cometaEl.style.display === 'block') return;
            
            const startX = Math.random() > 0.5 ? -50 : window.innerWidth + 50;
            const startY = Math.random() * window.innerHeight;
            const endX = startX < 0 ? window.innerWidth + 50 : -50;
            const endY = Math.random() * window.innerHeight;

            cometaEl.style.display = 'block';
            cometaEl.style.left = `${startX}px`;
            cometaEl.style.top = `${startY}px`;

            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            cometaEl.style.transform = `rotate(${angle}deg)`;

            const anim = cometaEl.animate([
            { left: `${startX}px`, top: `${startY}px` },
            { left: `${endX}px`, top: `${endY}px` }
            ], { 
                duration: 10000, 
                easing: 'linear' 
            });
                anim.onfinish = () => cometaEl.style.display = 'none';
            }

        cometaEl.onclick = () => {
            cometaEl.style.display = 'none';
            document.getElementById('texto-cometa').innerText = susurros[Math.floor(Math.random() * susurros.length)];
            document.getElementById('modal-cometa').style.display = 'block';
        };

        function cerrarCometa() { document.getElementById('modal-cometa').style.display = 'none'; }

        function celebrar() {
    const duracion = 3 * 1000;
    const fin = Date.now() + duracion;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d4d', '#ff0000'] // Colores de tus corazones
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d4d', '#ff0000']
      });

      if (Date.now() < fin) {
        requestAnimationFrame(frame);
      }
    }());
}



        // Lanzar cometa cada 30-50 segundos
        setInterval(lanzarCometa, 35000);