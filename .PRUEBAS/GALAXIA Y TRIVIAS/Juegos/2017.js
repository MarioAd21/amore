window.iniciarJuego2017 = function(ref) {
    // 1. El Mapa del Crucigrama (Usa puntos '.' para los espacios vacíos y letras para las palabras)
    const mapa = [
        "............F.......",
        "............U.......",
        "...PLAYA....T.......",
        ".......L....U.......",
        ".......M....R.......",
        "...CASAA....O.......",
        ".......G............",
        ".......E............",
        ".......M............",
        "...MAXIMILIANO......",
        ".......L...N........",
        ".......A...F........",
        "...........I........",
        "....BARBARA.........",
        "...........I........",
        ".....TEAMO.T........",
        "...........O........",
        ".......CORAZON......"
    ];

    // 2. Las Pistas correspondientes a las palabras del mapa
    const pistas = [
        "Nuestro primer destino de viaje. (5)",
        "El refugio que algún día construiremos. (4)",
        "Un nombre que llena nuestra vida de alegría. (11)",
        "La mujer más hermosa de toda esta galaxia. (7)",
        "Lo que te digo cada día. (5)",
        "El motor que impulsa este viaje. (7)",
        "Todo lo que me emociona vivir a tu lado. (6)",
        "Lo que fuiste, eres y siempre serás para mí. (10)",
        "El tamaño exacto de lo que siento por ti. (8)"
    ];

    if (!document.getElementById("estilos-crucigrama-clasico")) {
        const style = document.createElement("style");
        style.id = "estilos-crucigrama-clasico";
        style.innerHTML = `
            #contenedor-2017 {
                display: none; position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 95%; max-width: 800px; max-height: 90vh;
                background: rgba(8, 8, 20, 0.98); border: 2px solid cadetblue;
                padding: 20px; border-radius: 20px; z-index: 1000;
                backdrop-filter: blur(15px); color: white;
                display: flex; flex-direction: column; align-items: center;
            }
            .zona-juego {
                display: flex; flex-direction: column; gap: 20px;
                width: 100%; overflow-y: auto; align-items: center;
                padding: 10px;
            }
            .zona-juego::-webkit-scrollbar { width: 8px; }
            .zona-juego::-webkit-scrollbar-thumb { background: cadetblue; border-radius: 10px; }
            
            /* Contenedor del mapa que permite scroll horizontal si es muy grande */
            .mapa-scroll {
                max-width: 100%; overflow-x: auto; padding: 10px;
            }
            
            .cuadricula {
                display: grid;
                background: transparent;
                gap: 0; /* Sin espacio para que los bordes se toquen como en el clásico */
            }
            
            .celda-wrapper {
                position: relative;
                width: 35px; height: 35px;
            }
            
            .numero-pista {
                position: absolute; top: 2px; left: 2px;
                font-size: 0.55rem; color: #333; font-weight: bold;
                z-index: 2; pointer-events: none;
            }
            
            .celda-input {
                width: 100%; height: 100%;
                text-align: center; font-size: 1.2rem; font-weight: bold; text-transform: uppercase;
                background: #ffffff; color: #000000; /* Diseño blanco como pediste */
                border: 2px solid #5bc0be; /* Borde celeste */
                outline: none; margin: 0; padding: 0;
                transition: 0.2s; position: relative; z-index: 1;
            }
            
            .celda-input:focus { background: #e0f7fa; z-index: 3; border-color: #008b8b; }
            .celda-vacia { width: 35px; height: 35px; background: transparent; }
            .celda-correcta { background: #c8e6c9 !important; color: #2e7d32; pointer-events: none; }
            .celda-error { background: #ffcdd2 !important; color: #c62828; }
            
            .caja-pistas {
                background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px;
                border-left: 3px solid cadetblue; width: 100%; max-width: 500px;
            }
            .caja-pistas p { margin: 5px 0; font-size: 0.9rem; color: #e0f7fa; }
            .botones-container { display: flex; gap: 10px; margin-top: 15px; }
        `;
        document.head.appendChild(style);
    }

    let contenedor = document.getElementById("contenedor-2017");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "contenedor-2017";
        
        let htmlBase = `
            <h2 style="color: cadetblue; margin: 0 0 10px 0; text-align:center;">Memoria 2017</h2>
            <div class="zona-juego">
                <div class="mapa-scroll">
                    <div class="cuadricula" id="grilla-crucigrama"></div>
                </div>
                <div class="caja-pistas" id="lista-pistas">
                    <h3 style="margin-top:0; color:cadetblue; font-size:1.1rem;">Pistas Mágicas:</h3>
                </div>
            </div>
            <div class="botones-container">
                <button id="btn-verificar-2017" class="boton-opcion">Verificar</button>
                <button id="btn-cerrar-2017" class="boton-opcion" style="background: #f44336;">Volver</button>
            </div>
        `;
        contenedor.innerHTML = htmlBase;
        document.body.appendChild(contenedor);
    }

    const grilla = document.getElementById("grilla-crucigrama");
    const listaPistas = document.getElementById("lista-pistas");
    grilla.innerHTML = "";
    
    // Solo renderizar pistas si no existen
    if (listaPistas.children.length === 1) {
        pistas.forEach((p, i) => {
            listaPistas.innerHTML += `<p><strong>${i + 1}.</strong> ${p}</p>`;
        });
    }

    const filas = mapa.length;
    const columnas = mapa[0].length;
    grilla.style.gridTemplateColumns = `repeat(${columnas}, 35px)`;
    grilla.style.gridTemplateRows = `repeat(${filas}, 35px)`;

    let contadorPalabras = 1;

    // Procesador automático del mapa
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas; c++) {
            const letra = mapa[r][c];
            if (letra !== '.' && letra !== ' ') {
                const wrapper = document.createElement("div");
                wrapper.className = "celda-wrapper";

                // Lógica para detectar inicios de palabras y ponerles el número
                let esInicioHorizontal = (c === 0 || mapa[r][c-1] === '.' || mapa[r][c-1] === ' ') && (c+1 < columnas && mapa[r][c+1] !== '.' && mapa[r][c+1] !== ' ');
                let esInicioVertical = (r === 0 || mapa[r-1][c] === '.' || mapa[r-1][c] === ' ') && (r+1 < filas && mapa[r+1][c] !== '.' && mapa[r+1][c] !== ' ');

                if (esInicioHorizontal || esInicioVertical) {
                    const numSpan = document.createElement("span");
                    numSpan.className = "numero-pista";
                    numSpan.innerText = contadorPalabras;
                    wrapper.appendChild(numSpan);
                    contadorPalabras++;
                }

                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.className = "celda-input";
                input.dataset.correcta = letra;
                
                // Salto automático al escribir
                input.addEventListener('input', function() {
                    this.value = this.value.toUpperCase();
                    this.classList.remove("celda-error");
                });

                wrapper.appendChild(input);
                grilla.appendChild(wrapper);
            } else {
                const vacia = document.createElement("div");
                vacia.className = "celda-vacia";
                grilla.appendChild(vacia);
            }
        }
    }

    contenedor.style.display = "flex";
    const cometaVisual = document.getElementById('cometa');
    if (cometaVisual) cometaVisual.classList.add("cometa-oculto");

    const cerrarJuego = () => {
        contenedor.style.display = "none";
        if (cometaVisual) cometaVisual.classList.remove("cometa-oculto");
        document.getElementById("universo").style.transform = "scale(1)";
        document.getElementById("universo").style.opacity = "1";
        ref.isActive = true;
    };

    document.getElementById("btn-cerrar-2017").onclick = cerrarJuego;

    document.getElementById("btn-verificar-2017").onclick = () => {
        let todasCorrectas = true;
        const inputs = document.querySelectorAll('.celda-input');

        inputs.forEach(input => {
            const ingresada = input.value.toUpperCase();
            const correcta = input.dataset.correcta;

            if (ingresada !== correcta) {
                todasCorrectas = false;
                if (ingresada !== "") input.classList.add("celda-error");
            } else {
                input.classList.add("celda-correcta");
                input.classList.remove("celda-error");
            }
        });

        if (todasCorrectas) {
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
                title: '¡Memoria Desbloqueada!',
                text: 'Has resuelto este recuerdo a la perfección.',
                icon: 'success',
                background: 'rgba(10, 10, 20, 0.95)',
                color: '#ffffff',
                confirmButtonColor: 'cadetblue',
                customClass: { popup: 'modal-espacial-borde' }
            }).then(() => cerrarJuego());
        }
    };
};