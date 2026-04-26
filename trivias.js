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