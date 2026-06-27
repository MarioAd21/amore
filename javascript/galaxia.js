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

    const galaxySection=document.querySelector(".galaxybody");

    if(!galaxySection || !cometEl) return;

    const rect=galaxySection.getBoundingClientRect();

    const width=rect.width;
    const height=rect.height;

    const startX=Math.random()*width;
    const endX=Math.random()*width;

    cometEl.style.display="block";
    cometEl.style.left=`${startX}px`;
    cometEl.style.top="-50px";

    const animation=cometEl.animate(
      [
       {
        transform:"translate(0,0) rotate(45deg)",
        opacity:0
       },
       {
        opacity:1,
        offset:0.2
       },
       {
        transform:
        `translate(${endX-startX}px,
                   ${height+50}px)
         rotate(45deg)`,
        opacity:0
       }
      ],
      {
        duration:8000,
        easing:"linear"
      }
    );

    animation.onfinish=()=>{
       cometEl.style.display="none";
    };

}



if(cometEl){

    cometEl.onclick=()=>{

        cometEl.style.display="none";

        const randomWhisper=
          whispers[
            Math.floor(
             Math.random()*whispers.length
            )
          ];

        document.getElementById(
          "texto-cometa"
        ).innerText=randomWhisper;

        document.getElementById(
          "modal-cometa"
        ).style.display="block";

    };

}



function closeCometModal(){
    document.getElementById(
      "modal-cometa"
    ).style.display="none";
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