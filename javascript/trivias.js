const anniversaryData = {
 "2016":[
  {
   question:"¿Fecha de cuando te pedi pololeo?",
   options:["15 Nov","11 Nov","21 Nov","30 Nov"],
   correct:2,
   message:"¡El inicio de todo! ❤️"
  },
  {
   question:"¿Quién fue nuestra 'cupido' o la persona que nos presentó?",
   options:["Karen", "Carla", "María", "Sofía"],
   correct:0,
   message:"¡Gracias a ella pude conocerte! ✨"
  },
  {
   question:"¿Qué CANTANTE nos unía en el 2016 - 2017?",
   options:["Zarcort", "Kronno zomber", "Yandel", "Porta"],
   correct:0,
   message:"https://www.youtube.com/watch?v=XXfntpmrQ08&list=RDXXfntpmrQ08&start_radio=1 🎵"
  },
  {
   question:"¿Cuánto tiempo pasó desde que nos conocimos hasta que te pedí pololeo?",
   options:["1 semana", "2 semanas", "3 semanas", "4 semanas"],
   correct:3,
   message:"¡Al mirarte supe que tu eras la mujer que queria pasar el resto de mi vida! ⏳"
  },
  {
   question:"¿Donde te pedí pololeo?",
   options:["En un auto", "De camino a casa", "En una micro", "En el parque"],
   correct:2,
   message:"¡Nuestra micro testigo, de los nervios que tenia ese dia! 🚌"
  },
  {
   question:"¿Qué actividad extracurricular compartíamos los sábados?",
   options:["Fútbol", "Ping Pong", "Teatro", "Taller de arte"],
   correct:1,
   message:"¡Duelos inolvidables! 🏓"
  },
  {
   question:"¿Dónde fue nuestro primer beso?",
   options:["En el liceo", "En una micro", "En la calle", "En el cine"],
   correct:1,
   message:"¡Fue mágico! 💋"
  },
  {
   question:"¿En qué mes del 2016 nos conocimos?",
   options:["Septiembre", "Octubre", "Noviembre", "Diciembre"],
   correct:2,
   message:"🎵 Noviembre sin ti es pedirle a luna, que brille la noche de mi corazon 🎵"
  },
  {
   question:"¿Cómo me sentía yo al momento de pedirte pololeo en la micro?",
   options:["Muy seguro", "Estaba nervioso", "Muy tranquilo", "Estaba desesperado"],
   correct:1,
   message:"¡Los nervios valieron la pena! 😊"
  },
  {
   question:"Simpre te decia que eras mi...",
   options:["Amor", "Mi vida", "Mi alma Gemela", "Mi mundo"],
   correct:3,
   message:"Simpre seras mi alma Gemela aunque ya no lo diga ❤️"
  },
 ],
 "2017":[
  {
   question:"¿Primer viaje juntos?",
   options:["Playa","Montaña","Campo"],
   correct:0,
   message:"Inolvidable... 🌊"
  }
 ]
 // Aquí puedes seguir agregando los demás años siguiendo la misma estructura
};


/* GLOBAL: Cerrar desde la X */
window.cerrarTrivia = function(){
 document.getElementById("contenedor-trivia").style.display="none";
 
 resetUniverse();

 if(window.currentPlanet){
   window.currentPlanet.isActive = true; // Devuelve el movimiento si cierra a medias
 }
};

/* CORRECCIÓN: Cerrar con éxito y transformar el planeta */
function cerrarTriviaExito(){
 document.getElementById("contenedor-trivia").style.display="none";
 
 resetUniverse();

 if(window.currentPlanet){
   // 1. Reactivamos el planeta para el render
   window.currentPlanet.isActive = true;
   
   // 2. Le añadimos la clase CSS para que tu galaxia.css lo pinte como un corazón ❤️
   if(window.currentPlanet.el){
     window.currentPlanet.el.classList.add("completado");
   }
 }
}


function showTrivia(ref){
 window.currentPlanet = ref;
 const contenedor = document.getElementById("contenedor-trivia");
 const preguntas = anniversaryData[ref.year] || [];

 // Usamos el objeto ref para persistir el estado si ya existía
 if (ref.preguntaActual === undefined) {
     ref.preguntaActual = 0;
     ref.aciertos = 0;
 }

 if(!preguntas.length){
   alert("Aún no hay preguntas para " + ref.year);
   ref.isActive = true;
   resetUniverse();
   return;
 }

 contenedor.style.display = "block";

 function renderizarPregunta(){
   if(ref.preguntaActual < preguntas.length){
      const data = preguntas[ref.preguntaActual]; // Usamos ref.preguntaActual

      document.getElementById("trivia-titulo").innerText = 
      `Año ${ref.year} (${ref.preguntaActual + 1}/${preguntas.length})`;

      document.getElementById("trivia-pregunta").innerText = data.question;

      const opcionesDiv = document.getElementById("trivia-opciones");
      opcionesDiv.innerHTML = "";

      data.options.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.className = "boton-opcion";
        btn.innerText = opcion;
        btn.onclick = () => { validarRespuesta(index); };
        opcionesDiv.appendChild(btn);
      });

   } else {
      finalizarTrivia();
   }
 }

 function validarRespuesta(indice){
   if(indice === preguntas[ref.preguntaActual].correct){
      ref.aciertos++; // Usamos ref.aciertos
   }
   ref.preguntaActual++; // Usamos ref.preguntaActual
   renderizarPregunta();
 }

 function finalizarTrivia(){
   const opcionesDiv = document.getElementById("trivia-opciones");

   if(ref.aciertos >= Math.ceil(preguntas.length * 0.7)){
      ref.isCompleted = true;
      document.getElementById("trivia-pregunta").innerText = `¡Logrado! 🎉\n${ref.aciertos}/${preguntas.length}`;
      opcionesDiv.innerHTML = `<button class="boton-opcion" onclick="cerrarTriviaExito()">Desbloquear Año ❤️</button>`;
      celebrate();
      createExplosiveHeart("#ff4d4d");
   } else {
      document.getElementById("trivia-pregunta").innerText = `Casi... 😢\n${ref.aciertos}/${preguntas.length}\n¡Intentémoslo otra vez!`;
      opcionesDiv.innerHTML = `<button class="boton-opcion" onclick="reiniciarTrivia(window.currentPlanet)">Reintentar</button>`;
   }
 }

 renderizarPregunta();
}

// Función extra para limpiar el estado si el usuario quiere empezar de cero
function reiniciarTrivia(ref) {
    ref.preguntaActual = 0;
    ref.aciertos = 0;
    showTrivia(ref);
}

/* --- EFECTOS VISUALES (Evita que el código muera si no existían) --- */
function celebrate() {
  // Usando la librería Canvas Confetti que ya importaste en tu index.html
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function createExplosiveHeart(color) {
  // Por ahora dejamos el contenedor listo. 
  // Aquí puedes meter la animación de GSAP para crear partículas flotantes si quieres.
  console.log("Efecto de corazón explosivo color: " + color);
}