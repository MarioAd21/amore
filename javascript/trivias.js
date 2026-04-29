const anniversaryData = {
 "2016":[
  {
   question:"¿Fecha exacta de nuestro inicio?",
   options:["15 Nov","21 Nov","30 Nov"],
   correct:1,
   message:"¡El inicio de todo! ❤️"
  }
 ],
 "2017":[
  {
   question:"¿Primer viaje juntos?",
   options:["Playa","Montaña","Campo"],
   correct:0,
   message:"Inolvidable... 🌊"
  }
 ]
};


/* GLOBAL */
window.cerrarTrivia = function(){

 document.getElementById(
   "contenedor-trivia"
 ).style.display="none";

 resetUniverse();

 if(window.currentPlanet){
   window.currentPlanet.isActive=true;
 }

};


function cerrarTriviaExito(){

 document.getElementById(
  "contenedor-trivia"
 ).style.display="none";

 resetUniverse();

}


function showTrivia(ref){

 window.currentPlanet=ref;

 const contenedor=
 document.getElementById(
  "contenedor-trivia"
 );

 const preguntas=
 anniversaryData[ref.year] || [];

 let preguntaActual=0;
 let aciertos=0;


 if(!preguntas.length){
   alert("Aún no hay preguntas para "+ref.year);
   ref.isActive=true;
   resetUniverse();
   return;
 }

 contenedor.style.display="block";


 function renderizarPregunta(){

   if(preguntaActual<preguntas.length){

      const data=
      preguntas[preguntaActual];

      document.getElementById(
       "trivia-titulo"
      ).innerText=
      `Año ${ref.year}
      (${preguntaActual+1}/${preguntas.length})`;

      document.getElementById(
       "trivia-pregunta"
      ).innerText=data.question;

      const opcionesDiv=
      document.getElementById(
       "trivia-opciones"
      );

      opcionesDiv.innerHTML="";


      data.options.forEach(
       (opcion,index)=>{

        const btn=
        document.createElement(
         "button"
        );

        btn.className=
        "boton-opcion";

        btn.innerText=
        opcion;

        btn.onclick=()=>{
         validarRespuesta(index);
        };

        opcionesDiv.appendChild(btn);

       }
      );

   } else {
      finalizarTrivia();
   }

 }



 function validarRespuesta(indice){

   if(
     indice===
     preguntas[preguntaActual].correct
   ){
      aciertos++;
   }

   preguntaActual++;
   renderizarPregunta();

 }



 function finalizarTrivia(){

   const opcionesDiv=
   document.getElementById(
    "trivia-opciones"
   );


   if(
    aciertos >=
    Math.ceil(
      preguntas.length*0.7
    )
   ){

      ref.isCompleted=true;
      ref.isActive=true;

      document.getElementById(
       "trivia-pregunta"
      ).innerText=
      `¡Logrado!
      ${aciertos}/${preguntas.length}`;

      opcionesDiv.innerHTML=`
      <button
      class="boton-opcion"
      onclick="cerrarTriviaExito()">
      Desbloquear Año
      </button>
      `;

      celebrate();
      createExplosiveHeart("#ff4d4d");


   } else {

      document.getElementById(
       "trivia-pregunta"
      ).innerText=
      `Casi...
      ${aciertos}/${preguntas.length}`;

      opcionesDiv.innerHTML=`
      <button
      class="boton-opcion"
      onclick="showTrivia(window.currentPlanet)">
      Reintentar
      </button>
      `;
   }

 }

 renderizarPregunta();

}