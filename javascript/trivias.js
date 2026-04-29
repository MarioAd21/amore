const anniversaryData = {
    "2016": [{ question: "¿Fecha exacta de nuestro inicio?", options: ["15 Nov", "21 Nov", "30 Nov"], correct: 1, message: "¡El inicio de todo! ❤️" }],
    "2017": [{ question: "¿Primer viaje juntos?", options: ["Playa", "Montaña", "Campo"], correct: 0, message: "Inolvidable... 🌊" }]
};

function showTrivia(ref){
    const preguntas = anniversaryData[ref.year];

    if(!preguntas){
        alert("Aún no hay preguntas para " + ref.year);
        resetUniverse();
        ref.isActive = true;
        return;
    }

    const p = preguntas[0];

    let respuesta = prompt(
        p.question + "\n\n" +
        p.options.map((op,i)=>`${i+1}. ${op}`).join("\n")
    );

    if (respuesta === null){
        resetUniverse();
        ref.isActive = true;
        return;
    }

    const opcion = parseInt(respuesta)-1;

    if(opcion === p.correct){

        alert(p.message);

        ref.isCompleted = true;
        ref.isActive = true;

        celebrate();

        createExplosiveHeart("#ff4d4d", () => {
            alert("Planeta desbloqueado ❤️");
        });

        resetUniverse();

    } else {

        alert("Respuesta incorrecta, intenta otra vez");

        ref.isActive = true;
        resetUniverse();
    }
}

function createExplosiveHeart(color, callback) {
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
            const t = (i/particleCount) * 2 * Math.PI;
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

function celebrate() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin:{x:0},
            colors:['#ff4d4d','#ff0000']
        });

        confetti({
            particleCount: 3,
            angle:120,
            spread:55,
            origin:{x:1},
            colors:['#ff4d4d','#ff0000']
        });

        if(Date.now() < end){
            requestAnimationFrame(frame);
        }

    })();
}


function createExplosiveHeart(color, callback) {
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
            const t = (i/particleCount) * 2 * Math.PI;
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

function celebrate() {
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
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
