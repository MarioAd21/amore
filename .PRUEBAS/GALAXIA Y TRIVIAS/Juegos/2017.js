window.iniciarJuego2017 = function(ref) {
    const palabrasData = [
        { palabra: "MAXIMILIANO", pista: "Un nombre que llena nuestra vida de alegría inmensa." },
        { palabra: "TEAMO", pista: "Lo que te digo cada día (y a veces te lo envío en un cometa)." },
        { palabra: "NOVIEMBRE", pista: "El mes exacto en el que todo nuestro universo comenzó a brillar." },
        { palabra: "ALMAGEMELA", pista: "Lo que fuiste, eres y siempre serás para mí." },
        { palabra: "CORAZON", pista: "El motor que impulsa este viaje de 10 años." },
        { palabra: "BELLA", pista: "La forma en la que te veo cada vez que me pierdo en tus ojos." },
        { palabra: "DIEZ", pista: "La cantidad de años de luz y amor que llevamos orbitando juntos." },
        { palabra: "BESOS", pista: "La mejor manera de decirte todo lo que siento sin usar palabras." },
        { palabra: "AMORE", pista: "El título de esta página y la palabra que define nuestra historia." },
        { palabra: "BARBARA", pista: "El nombre de la mujer más hermosa de toda esta galaxia." },
        { palabra: "HIJO", pista: "Nuestro pedacito de cielo y el mayor tesoro que tenemos." },
        { palabra: "CASA", pista: "Nuestro gran sueño, el refugio que algún día construiremos para vivir juntos." },
        { palabra: "MICRO", pista: "El lugar exacto donde los nervios se transformaron en nuestro primer 'sí'." },
        { palabra: "PLAYA", pista: "El destino inolvidable de nuestro primer viaje." },
        { palabra: "UNIVERSO", pista: "Lo que estoy dispuesto a recorrer solo para verte sonreír." },
        { palabra: "GALAXIA", pista: "El lugar mágico donde hemos guardado todos estos recuerdos." },
        { palabra: "SUSURROS", pista: "Los mensajes fugaces que viajan escondidos en las estrellas." },
        { palabra: "INFINITO", pista: "El tamaño exacto y la medida de lo que siento por ti." },
        { palabra: "MAGIA", pista: "Lo que sentí aquella primera vez al conocerte." },
        { palabra: "RECUERDOS", pista: "Lo que estamos coleccionando año tras año en estos planetas." },
        { palabra: "FUTURO", pista: "Todo lo que me emociona vivir, siempre y cuando sea a tu lado." }
    ];

    if (!document.getElementById("estilos-crucigrama-2017")) {
        const style = document.createElement("style");
        style.id = "estilos-crucigrama-2017";
        style.innerHTML = `
            #contenedor-2017 {
                display: none; position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 95%; max-width: 700px; height: 90vh;
                background: rgba(10, 10, 25, 0.98); border: 2px solid cadetblue;
                border-radius: 15px; z-index: 1000;
                backdrop-filter: blur(15px); color: white;
                display: flex; flex-direction: column; overflow: hidden;
                box-shadow: 0 0 30px rgba(95, 158, 160, 0.5);
                font-family: monospace;
            }
            .cabecera-crucigrama {
                padding: 15px; text-align: center;
                background: rgba(0, 0, 0, 0.5);
                border-bottom: 2px solid cadetblue;
            }
            
            /* Contenedor principal dividido en dos */
            .cuerpo-crucigrama {
                display: flex; flex-direction: column; flex-grow: 1; overflow: hidden;
            }

            /* 1. ZONA DEL TABLERO (ARRIBA) */
            .zona-tablero {
                flex: 1.2; overflow-y: auto; padding: 20px;
                display: flex; flex-direction: column; align-items: center; gap: 10px;
                background: radial-gradient(circle, rgba(95,158,160,0.1) 0%, rgba(0,0,0,0) 70%);
            }
            .zona-tablero::-webkit-scrollbar { width: 4px; }
            .zona-tablero::-webkit-scrollbar-thumb { background: cadetblue; }

            .fila-palabra {
                display: flex; align-items: center; gap: 8px;
            }
            .numero-casilla {
                font-size: 0.8rem; color: cadetblue; font-weight: bold; width: 20px; text-align: right;
            }
            .casillas-contenedor {
                display: flex; gap: 2px;
            }
            .casilla-input {
                width: 28px; height: 28px; text-align: center;
                font-size: 1rem; font-weight: bold; text-transform: uppercase;
                background: #fff; color: #000;
                border: 1px solid #333; border-radius: 2px;
                outline: none; transition: 0.2s;
            }
            .casilla-input:focus {
                background: #e0f7fa; border: 2px solid cadetblue; transform: scale(1.1);
            }
            .casilla-correcta {
                background: cadetblue !important; color: white !important; border-color: #fff !important; pointer-events: none;
            }
            .casilla-error {
                background: #ffcdd2 !important; color: #d32f2f !important;
            }

            /* 2. ZONA DE PISTAS (ABAJO) */
            .zona-pistas {
                flex: 0.8; background: rgba(0, 0, 0, 0.7);
                border-top: 2px solid cadetblue; padding: 15px;
                overflow-y: auto;
            }
            .zona-pistas::-webkit-scrollbar { width: 4px; }
            .zona-pistas::-webkit-scrollbar-thumb { background: cadetblue; }
            
            .lista-pistas {
                list-style: none; padding: 0; margin: 0;
            }
            .pista-item {
                font-size: 0.9rem; padding: 8px; border-bottom: 1px dashed rgba(95,158,160,0.3);
                cursor: pointer; transition: 0.2s;
            }
            .pista-item:hover { background: rgba(95,158,160,0.2); }
            .pista-resuelta { color: cadetblue; text-decoration: line-through; opacity: 0.5; }

            .pie-crucigrama {
                padding: 10px; display: flex; justify-content: center; gap: 15px; background: #000;
            }
        `;
        document.head.appendChild(style);
    }

    let contenedor = document.getElementById("contenedor-2017");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "contenedor-2017";
        
        let htmlTablero = "";
        let htmlPistas = "";

        palabrasData.forEach((item, index) => {
            // Generar tablero
            htmlTablero += `<div class="fila-palabra" id="fila-${index}">
                <div class="numero-casilla">${index + 1}</div>
                <div class="casillas-contenedor">`;
            for(let i = 0; i < item.palabra.length; i++){
                htmlTablero += `<input type="text" maxlength="1" class="casilla-input" data-letra="${item.palabra[i]}" data-fila="${index}">`;
            }
            htmlTablero += `</div></div>`;

            // Generar pistas
            htmlPistas += `<li class="pista-item" id="pista-${index}"><strong>${index + 1}.</strong> ${item.pista}</li>`;
        });

        contenedor.innerHTML = `
            <div class="cabecera-crucigrama">
                <h3 style="margin: 0; color: cadetblue; letter-spacing: 2px;">CRUCIGRAMA 2017</h3>
            </div>
            <div class="cuerpo-crucigrama">
                <div class="zona-tablero">${htmlTablero}</div>
                <div class="zona-pistas">
                    <h4 style="margin: 0 0 10px 0; color: white;">Pistas Horizontales:</h4>
                    <ul class="lista-pistas">${htmlPistas}</ul>
                </div>
            </div>
            <div class="pie-crucigrama">
                <button id="btn-verificar-2017" class="boton-opcion">Verificar</button>
                <button id="btn-cerrar-2017" class="boton-opcion" style="background: #f44336;">Salir</button>
            </div>
        `;
        document.body.appendChild(contenedor);
    }

    contenedor.style.display = "flex";
    const cometaVisual = document.getElementById('cometa');
    if (cometaVisual) cometaVisual.classList.add("cometa-oculto");

    // Lógica de saltos automáticos
    const inputs = contenedor.querySelectorAll('.casilla-input');
    inputs.forEach((input, idx) => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            this.classList.remove('casilla-error'); 
            
            if(this.value.length === 1 && idx < inputs.length - 1) {
                if(inputs[idx + 1].dataset.fila === this.dataset.fila) {
                    inputs[idx + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            if(e.key === "Backspace" && this.value === "" && idx > 0) {
                if(inputs[idx - 1].dataset.fila === this.dataset.fila) {
                    inputs[idx - 1].focus();
                    inputs[idx - 1].value = "";
                }
            }
        });
    });

    const cerrarJuego = () => {
        contenedor.style.display = "none";
        if (cometaVisual) cometaVisual.classList.remove("cometa-oculto");
        ref.isActive = true;
    };
    document.getElementById("btn-cerrar-2017").onclick = cerrarJuego;

    document.getElementById("btn-verificar-2017").onclick = () => {
        let completadas = 0;

        palabrasData.forEach((_, index) => {
            const fila = document.getElementById(`fila-${index}`);
            const letras = fila.querySelectorAll('.casilla-input');
            const pista = document.getElementById(`pista-${index}`);
            let filaCorrecta = true;

            letras.forEach(letra => {
                const valor = letra.value.toUpperCase();
                const correcto = letra.dataset.letra;

                if (valor !== correcto) {
                    filaCorrecta = false;
                    if (valor !== "") letra.classList.add("casilla-error");
                } else {
                    letra.classList.remove("casilla-error");
                    letra.classList.add("casilla-correcta");
                }
            });

            if (filaCorrecta) {
                pista.classList.add("pista-resuelta");
                completadas++;
            } else {
                pista.classList.remove("pista-resuelta");
            }
        });

        if (completadas === palabrasData.length) {
            ref.isCompleted = true;
            ref.el.classList.add("completado");
            
            if (typeof confetti === "function") {
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }

            const siguientePlaneta = window.planetRefs.find(p => p.index === ref.index + 1);
            if (siguientePlaneta && siguientePlaneta.isLocked) {
                siguientePlaneta.isLocked = false;
                siguientePlaneta.el.style.filter = "none";
            }

            Swal.fire({
                title: '¡Tablero Completado! 🧩',
                text: 'Las palabras encajan perfectamente.',
                icon: 'success',
                background: 'rgba(10, 10, 20, 0.95)',
                color: '#ffffff',
                confirmButtonColor: 'cadetblue',
                customClass: { popup: 'modal-espacial-borde' }
            }).then(() => cerrarJuego());
        } else {
            Swal.fire({
                title: 'Revisa el tablero',
                text: `Tienes ${completadas} de 21 palabras correctas.`,
                icon: 'info',
                background: 'rgba(10, 10, 20, 0.95)',
                color: '#ffffff',
                confirmButtonColor: 'cadetblue'
            });
        }
    };
};