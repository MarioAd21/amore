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
   // Usamos comillas invertidas (backticks) para poder meter el reproductor
   message: `
    <div style="margin-bottom: 10px;">¡Esa es! Nuestra música 🎵</div>
    <iframe width="100%" height="180" 
            src="https://www.youtube.com/embed/XXfntpmrQ08" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            style="border-radius: 8px;">
    </iframe>
   `
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
 document.body.classList.remove('modal-abierto');
 resetUniverse();

 if(window.currentPlanet){
   window.currentPlanet.isActive = true; // Devuelve el movimiento si cierra a medias
 }
};

/* CORRECCIÓN: Cerrar con éxito y transformar el planeta */
/* CORRECCIÓN: Cerrar con éxito y transformar el planeta */
function cerrarTriviaExito(){
    document.getElementById("contenedor-trivia").style.display="none";
    document.body.classList.remove('modal-abierto');
    resetUniverse();

    if(window.currentPlanet){
        window.currentPlanet.isActive = true; 
        
        if(window.currentPlanet.el){
            window.currentPlanet.el.classList.add("completado");
        }

        // *** NUEVO: LÓGICA DE DESBLOQUEO DEL SIGUIENTE AÑO ***
        const indiceActual = window.currentPlanet.index;
        const siguientePlaneta = window.planetRefs.find(p => p.index === indiceActual + 1);

        if (siguientePlaneta && siguientePlaneta.isLocked) {
            siguientePlaneta.isLocked = false;
            // Quitamos el filtro gris para que se vea a color
            siguientePlaneta.el.style.filter = "none";
            
            // Opcional: Un pequeño aviso avisando que se desbloqueó
            setTimeout(() => {
                Swal.fire({
                    title: '¡Nuevo Año Desbloqueado! 🚀',
                    text: `Ya puedes viajar al año ${siguientePlaneta.year}`,
                    icon: 'success',
                    background: 'rgba(10, 10, 20, 0.95)',
                    color: '#ffffff',
                    confirmButtonColor: 'cadetblue',
                    timer: 3500,
                    showConfirmButton: false,
                    customClass: { popup: 'modal-espacial-borde' }
                });
            }, 800); // Se lanza un poquito después de cerrar la trivia
        }
    }
}

function showTrivia(ref){
  document.body.classList.add('modal-abierto');
  window.currentPlanet = ref;
  const contenedor = document.getElementById("contenedor-trivia");
  const preguntas = anniversaryData[ref.year] || [];

  // Persistencia de estado
  if (ref.preguntaActual === undefined) {
      ref.preguntaActual = 0;
      ref.aciertos = 0;
  }

  if(!preguntas.length){
    alert("Aún no hay preguntas para " + ref.year);
    return;
  }

  contenedor.style.display = "block";

  function renderizarPregunta(){
    if(ref.preguntaActual < preguntas.length){
        const data = preguntas[ref.preguntaActual];
        
        document.getElementById("trivia-titulo").innerText = 
        `Año ${ref.year} (${ref.preguntaActual + 1}/${preguntas.length})`;
        document.getElementById("trivia-pregunta").innerText = data.question;

        const opcionesDiv = document.getElementById("trivia-opciones");
        opcionesDiv.innerHTML = "";

        data.options.forEach((opcion, index) => {
          const btn = document.createElement("button");
          btn.className = "boton-opcion";
          btn.innerText = opcion;
          // Al hacer clic, enviamos el índice
          btn.onclick = () => { validarRespuesta(index); };
          opcionesDiv.appendChild(btn);
        });
    } else {
        finalizarTrivia();
    }
  }

  function validarRespuesta(indice){
   const data = preguntas[ref.preguntaActual];
   const opcionesDiv = document.getElementById("trivia-opciones");
   const preguntaEl = document.getElementById("trivia-pregunta");
   
   // 1. Limpiamos las opciones del recuadro
   opcionesDiv.innerHTML = "";

   // 2. Evaluamos si es correcta
   if(indice === data.correct){
      ref.aciertos++;
      
      // PANTALLA CORRECTA: Todo en un solo cuadro (eliminamos el Swal.fire)
      document.getElementById("trivia-titulo").innerText = "¡Excelente! ❤️";
      
      // Insertamos el mensaje especial directamente en el cuadro de la trivia
      preguntaEl.innerHTML = `
        <div style="text-align: center; padding: 10px;">
          <span style="color: #4CAF50; font-size: 1.5rem; font-weight: bold; display: block; margin-bottom: 15px;">
            ¡Respuesta correcta!
          </span>
          <div style="font-size: 1.1rem; line-height: 1.4; margin-bottom: 15px;">
            ${data.message}
          </div>
        </div>
      `;

      // Creamos y agregamos el botón de Siguiente
      const btnSiguiente = document.createElement("button");
      btnSiguiente.className = "boton-opcion";
      btnSiguiente.style.marginTop = "10px";
      btnSiguiente.innerText = "Siguiente pregunta ➡️";
      btnSiguiente.onclick = () => {
         ref.preguntaActual++; // Avanza al siguiente índice
         renderizarPregunta();
      };
      opcionesDiv.appendChild(btnSiguiente);

   } else {
      // PANTALLA INCORRECTA: Se mantiene exactamente igual
      document.getElementById("trivia-titulo").innerText = "¡Oh no! 😢";
      preguntaEl.innerHTML = `
        <div style="text-align: center; padding: 10px;">
          <span style="color: #f44336; font-size: 1.5rem; font-weight: bold; display: block; margin-bottom: 15px;">
            ¡Te equivocaste!
          </span>
          <p style="font-size: 1.1rem;">¡No te preocupes, puedes volver a intentarlo ahora mismo!</p>
        </div>
      `;

      const btnReintentar = document.createElement("button");
      btnReintentar.className = "boton-opcion";
      btnReintentar.style.marginTop = "20px";
      btnReintentar.innerText = "🔄 Intentar de nuevo";
      btnReintentar.onclick = () => {
         // NO aumentamos ref.preguntaActual para volver a pintar la misma pregunta
         renderizarPregunta();
      };
      opcionesDiv.appendChild(btnReintentar);
   }
}

 function finalizarTrivia(){
   const opcionesDiv = document.getElementById("trivia-opciones");
   const porcentaje = (ref.aciertos / preguntas.length) * 100;
   document.body.style.overflow = "auto";

   if(porcentaje >= 70){
      ref.isCompleted = true;
      document.getElementById("trivia-pregunta").innerText = `¡Logrado! 🎉\nTu puntaje: ${ref.aciertos}/${preguntas.length}`;
      opcionesDiv.innerHTML = `<button class="boton-opcion" onclick="cerrarTriviaExito()">Desbloquear Año ❤️</button>`;
      celebrate();
   } else {
      document.getElementById("trivia-pregunta").innerText = `Casi... 😢\nLograste ${ref.aciertos}/${preguntas.length}.\n¡Inténtalo otra vez!`;
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