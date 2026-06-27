const whispers = [
    "Eres mi estrella favorita en toda la galaxia.",
    "Cada órbita me recuerda lo mucho que te amo.",
    "Gracias por estos 10 años de luz.",
    "Si el universo es infinito, mi amor por ti lo es más.",
    "Atrapaste mi corazón como atrapaste este cometa."
];

const yearsList = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

const planetRefs = [];
const universeContainer = document.getElementById('universo');
const cometEl = document.getElementById('cometa');


yearsList.forEach((year,index)=>{

    const radiusX = 150 + (index * 38);
    const radiusY = 75 + (index * 18);

    const orbit = document.createElement("div");
    orbit.className="orbita-elipse";
    orbit.style.width=`${radiusX*2}px`;
    orbit.style.height=`${radiusY*2}px`;
    orbit.style.left="50%";
    orbit.style.top="50%";
    orbit.style.transform="translate(-50%,-50%)";

    universeContainer.appendChild(orbit);


    const planetEl=document.createElement("div");
    planetEl.className="planeta";

    planetEl.style.setProperty(
        "--p-color",
        `hsl(${index*32},90%,60%)`
    );

    planetEl.innerHTML=`<span>${year}</span>`;

    planetEl.style.position="absolute";
    planetEl.style.left="50%";
    planetEl.style.top="50%";
    planetEl.style.marginLeft="-11px";
    planetEl.style.marginTop="-11px";

    universeContainer.appendChild(planetEl);


    const ref={
        el:planetEl,
        year:year,
        rx:radiusX,
        ry:radiusY,
        angle:Math.random()*6,
        velocity:0.003-(index*0.00008),
        isActive:true,
        isCompleted:false,
        posX:0,
        posY:0
    };

    planetRefs.push(ref);


    planetEl.onclick=()=>{

        if(!ref.isCompleted){
            travelToPlanet(ref);
        }else{
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

        p.el.style.transform=
          `translate3d(${p.posX}px,${p.posY}px,0)`;

    });

    requestAnimationFrame(animationLoop);
}

animationLoop();



function travelToPlanet(ref){

    ref.isActive=false;

    const targetSection=document.getElementById("GALAXIA");

    if(targetSection){
        targetSection.scrollIntoView({
            behavior:"smooth"
        });
    }

    universeContainer.style.transformOrigin=
      `calc(50% + ${ref.posX}px)
       calc(50% + ${ref.posY}px)`;

    universeContainer.style.transform="scale(6)";
    universeContainer.style.opacity="0.4";

    setTimeout(()=>{

        if(typeof showTrivia==="function"){
            showTrivia(ref);
        }

    },1000);
}



function resetUniverse(){

    universeContainer.style.transform="scale(1)";
    universeContainer.style.opacity="1";

}



function showLockedMessage(year){

    const yearMessages={
        "2016":"Donde todo comenzó... nuestra primera micro. 🚌",
        "2017":"El año de nuestro primer viaje inolvidable. 🌊",
        "2018":"Cuando aprendimos que juntos todo es mejor. ✨"
    };

    alert(
      yearMessages[year] ||
      "Este recuerdo ya vive en nuestro corazón. ❤️"
    );
}



function launchComet(){
    const galaxySection = document.querySelector(".galaxybody");
    if(!galaxySection || !cometEl) return;

    const rect = galaxySection.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const startX = Math.random() * (width / 2); 
    const startY = -50; 
    
    const distance = height + 400; 
    
    cometEl.style.display = "block";
    cometEl.style.left = `${startX}px`;
    cometEl.style.top = `${startY}px`;

    // 22 SEGUNDOS: Movimiento súper lento, pacífico y fácil de cliquear
    const duracionViaje = 22000; 

    const animation = cometEl.animate(
      [
       { transform: "translate3d(0,0,0) rotate(45deg)", opacity: 0 },
       { opacity: 1, offset: 0.05 },
       { opacity: 1, offset: 0.95 },
       { transform: `translate3d(${distance}px, ${distance}px, 0) rotate(45deg)`, opacity: 0 }
      ],
      { 
        duration: duracionViaje, 
        easing: "linear" 
      }
    );

    // SISTEMA DE PARTICULAS: Rastrea el cometa y suelta polvo estelar
    const relojPartculas = setInterval(() => {
        if (cometEl.style.display === "none") {
            clearInterval(relojPartculas);
            return;
        }

        // Medimos las coordenadas exactas de la animación en este milisegundo
        const rectComet = cometEl.getBoundingClientRect();
        const rectUniverse = universeContainer.getBoundingClientRect();

        // Calculamos el centro de la cabeza del cometa relativo al universo
        const x = rectComet.left - rectUniverse.left + (rectComet.width / 2);
        const y = rectComet.top - rectUniverse.top + (rectComet.height / 2);

        // Soltamos una partícula en esa posición exacta
        spawnCometParticle(x, y);
    }, 60); // Frecuencia perfecta para que queden conectadas pero individuales

    animation.onfinish = () => { 
        cometEl.style.display = "none"; 
        clearInterval(relojPartculas);
    };
}

// NUEVA FUNCIÓN: Inyecta y configura cada partícula de forma orgánica
function spawnCometParticle(x, y) {
    const particula = document.createElement("div");
    particula.className = "cometa-particula";
    particula.style.left = `${x}px`;
    particula.style.top = `${y}px`;

    // Tamaños alternados para que parezca una estela cósmica natural
    const tamano = Math.random() * 3 + 1; // Entre 1px y 4px
    particula.style.width = `${tamano}px`;
    particula.style.height = `${tamano}px`;

    // Mezcla de colores (Brillo blanco puro y destellos turquesas de tu paleta)
    const colores = ["#ffffff", "#ffffff", "#e0f7fa", "#5f9ea0"];
    const colorElegido = colores[Math.floor(Math.random() * colores.length)];
    particula.style.background = colorElegido;
    particula.style.boxShadow = `0 0 6px ${colorElegido}`;

    universeContainer.appendChild(particula);

    // Limpieza de memoria: se remueve del HTML en cuanto termina su animación CSS
    setTimeout(() => {
        particula.remove();
    }, 1200);
}


launchComet();
setInterval(launchComet,35000);

function generarCieloEstrellado() {
    // Buscamos el contenedor principal de la sección de la galaxia
    const galaxia = document.querySelector('.galaxybody');
    if (!galaxia) return;

    // Puedes subir este número a 200 o 250 si quieres que se vea aún más lleno
    const numeroEstrellas = 180; 

    for (let i = 0; i < numeroEstrellas; i++) {
        const estrella = document.createElement('div');
        
        // Tamaños variados para simular profundidad (estrellas cerca y lejos)
        const tamano = Math.random() * 1.8 + 0.8; // Tamaños entre 0.8px y 2.6px
        
        estrella.style.position = 'absolute';
        estrella.style.width = `${tamano}px`;
        estrella.style.height = `${tamano}px`;
        estrella.style.background = '#ffffff';
        estrella.style.borderRadius = '50%';
        
        // Posicionamiento aleatorio usando porcentajes
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.top = `${Math.random() * 100}%`;
        
        // Opacidad inicial aleatoria para romper la uniformidad
        estrella.style.opacity = Math.random() * 0.7 + 0.3;
        estrella.style.pointerEvents = 'none';
        estrella.style.zIndex = '0';
        
        // Aplicamos la animación que ya tienes en tu CSS (.estrellas)
        // Les damos una duración aleatoria a cada una para que parpadeen a ritmos distintos
        const duracionAnimacion = tamano > 1.8 ? (Math.random() * 4 + 12) : (Math.random() * 8 + 18);
        estrella.style.animation = `parpadeo-estelar ${duracionAnimacion}s infinite alternate ease-in-out`;
        
        // Desfase de tiempo para que no empiecen a parpadear todas al mismo tiempo
        estrella.style.animationDelay = `${Math.random() * -5}s`;

        galaxia.appendChild(estrella);
    }
}

// ¡No olvides llamarla para que se ejecute al cargar la página!
generarCieloEstrellado();