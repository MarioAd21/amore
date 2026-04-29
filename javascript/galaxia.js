const anniversaryData = {
    "2016": [{ question: "¿Fecha exacta de nuestro inicio?", options: ["15 Nov", "21 Nov", "30 Nov"], correct: 1, message: "¡El inicio de todo! ❤️" }],
    "2017": [{ question: "¿Primer viaje juntos?", options: ["Playa", "Montaña", "Campo"], correct: 0, message: "Inolvidable... 🌊" }]
};

const whispers = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

const yearsList = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const planetRefs = [];
const universeContainer = document.getElementById('universo');

const galaxyBody = document.querySelector('.estrellas')?.parentElement || document.body;

yearsList.forEach((year, index) => {
    const radiusX = 150 + (index * 38);
    const radiusY = 75 + (index * 18);
    
    const orbit = document.createElement('div');
    orbit.className = 'orbita-elipse';
    orbit.style.width = `${radiusX * 2}px`;
    orbit.style.height = `${radiusY * 2}px`;
    
    // Centering the orbit
    orbit.style.left = "50%";
    orbit.style.top = "50%";
    orbit.style.transform = "translate(-50%, -50%)";
    universeContainer.appendChild(orbit);

    const planetEl = document.createElement('div');
    planetEl.className = 'planeta';
    planetEl.style.setProperty('--p-color', `hsl(${index * 32}, 90%, 60%)`);
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
        rx: radiusX, 
        ry: radiusY, 
        angle: Math.random() * 6, 
        velocity: 0.002  - (index * 0.0001), 
        isActive: true, 
        isCompleted: false, 
        posX: 0, 
        posY: 0 
    };
    planetRefs.push(ref);
    
    planetEl.onclick = () => {
        if (!ref.isCompleted) {
            travelToPlanet(ref);
        } else {
            showLockedMessage(ref.year);
        }
    };
});

function animationLoop() {
    planetRefs.forEach(p => {
        if (!p.isActive) return; 
        p.angle += p.velocity;
        p.posX = Math.cos(p.angle) * p.rx;
        p.posY = Math.sin(p.angle) * p.ry;
        
        // Absolute positioning relative to the center of #universo
        const x = p.posX - 11; 
        const y = p.posY - 11;

        p.el.style.transform = `translate3d(${p.posX}px, ${p.posY}px, 0)`;    });
    requestAnimationFrame(animationLoop);
}
animationLoop();

function travelToPlanet(ref) {
    ref.isActive = false; 
    const targetSection = document.getElementById('GALAXIA');
    if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
    
    universeContainer.style.transformOrigin = `calc(50% + ${ref.posX}px) calc(50% + ${ref.posY}px)`;
    universeContainer.style.transform = "scale(6)"; 
    universeContainer.style.opacity = "0.4";

    setTimeout(() => {
       if (typeof showTrivia === "function") showTrivia(ref);
    }, 1000);
}

function createExplodingHeart(color, callback) {
    const particleCount = 70;
    const particles = [];

    for(let i=0; i < particleCount; i++){
        const p = document.createElement('div');
        p.className = 'pixel';
        p.style.setProperty('--p-color', color);
        p.style.position = "fixed"; 
        p.style.left = "50%"; 
        p.style.top = "50%";
        document.body.appendChild(p);
        particles.push(p);
    }

    setTimeout(() => {
        particles.forEach(p => {
            p.style.transition = "all 1s ease-out";
            p.style.transform = `translate(${(Math.random()-0.5)*500}px, ${(Math.random()-0.5)*500}px)`;
        });
    }, 50);

    setTimeout(() => {
        particles.forEach((p, i) => {
            p.style.transition = "all 1.5s cubic-bezier(0.17, 0.88, 0.32, 1.27)";
            const t = (i / particleCount) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            p.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
        });
    }, 1100);

    setTimeout(() => {
        particles.forEach(p => p.style.opacity = "0");
        setTimeout(() => { 
            particles.forEach(p => p.remove()); 
            if(callback) callback(); 
        }, 1000);
    }, 4000);
}

function showLockedMessage(year) {
    const yearMessages = {
        "2016": "Donde todo comenzó... nuestra primera micro. 🚌",
        "2017": "El año de nuestro primer viaje inolvidable. 🌊",
        "2018": "Cuando aprendimos que juntos todo es mejor. ✨"
    };
    
    const text = yearMessages[year] || "Este recuerdo ya vive en nuestro corazón. ❤️";
    alert(text);
}

const cometEl = document.getElementById('cometa');

function launchComet() {
    const galaxySection = document.querySelector('.galaxybody');
    if (!galaxySection || !cometEl) return;

    const rect = galaxySection.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const startX = Math.random() * width;
    const startY = -50; 
    const endX = Math.random() * width;
    const endY = height + 50; 

    cometEl.style.display = 'block';
    cometEl.style.left = `${startX}px`;
    cometEl.style.top = `${startY}px`;

    const animation = cometEl.animate([
        { transform: `translate(0, 0) rotate(45deg)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(45deg)`, opacity: 0 }
    ], { 
        duration: 4000, 
        easing: 'linear' 
    });

    animation.onfinish = () => cometEl.style.display = 'none';
}

if (cometEl) {
    cometEl.onclick = () => {
        cometEl.style.display = 'none';
        const randomWhisper = whispers[Math.floor(Math.random() * whispers.length)];
        document.getElementById('texto-cometa').innerText = randomWhisper;
        document.getElementById('modal-cometa').style.display = 'block';
    };
}

function closeCometModal() { 
    document.getElementById('modal-cometa').style.display = 'none'; 
}

function celebrateSuccess() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d4d', '#ff0000']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d4d', '#ff0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
}

// Launch comet every 35 seconds
setInterval(launchComet, 35000);