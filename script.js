/* script.js */
const misRecuerdos = [
    { url: 'foto1.jpg', msj: 'El día que nos conocimos... ❤️' },
    { url: 'foto2.jpg', msj: 'Nuestra primera salida juntos.' },
    { url: 'foto3.jpg', msj: 'Te veías hermosa esa tarde.' },
    { url: 'foto4.jpg', msj: 'Construyendo sueños juntos.' },
    { url: 'foto5.jpg', msj: '10 años de pura magia.' },
    { url: 'foto6.jpg', msj: 'Te amo cada día más.' }
];

let indiceActual = 0;
const total = misRecuerdos.length;
const contenedor = document.getElementById('contenedor');
let touchStartX = 0;
let puedeGirar = true;
const cooldown = 400;     
const sensibilidad = 80;  

// TITULO DINÁMICO
setInterval(() => {
    document.title = (new Date().getSeconds() % 2 === 0) ? "❤️ 21-11-2016" : "🖤 21-11-2016";
}, 1000);

// CONTADOR
const fechaInicio = new Date(2016, 10, 21, 0, 0, 0); 
function actualizarContador() {
    const ahora = new Date();
    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let dias = ahora.getDate() - fechaInicio.getDate();
    if (dias < 0) { meses--; dias += new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate(); }
    if (meses < 0) { años--; meses += 12; }
    const h = ahora.getHours().toString().padStart(2, '0');
    const m = ahora.getMinutes().toString().padStart(2, '0');
    const s = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('reloj').innerHTML = `
        <div class="bloque-fecha">${años} años, ${meses} meses, ${dias} días</div>
        <div class="bloque-tiempo">${h}h : ${m}m : ${s}s</div>`;
}

function inicializar() {
    misRecuerdos.forEach((r, i) => {
        const img = document.createElement('img');
        img.src = r.url;
        img.className = 'foto-card oculta';
        img.id = 'img-' + i;
        img.onclick = () => { if(img.classList.contains('pos-centro')) abrirFoto(r.url, r.msj); };
        contenedor.appendChild(img);
    });
    actualizarAbanico();

    // SCROLL DEL MOUSE
    contenedor.addEventListener('wheel', (e) => {
    // Evita que la página suba o baje mientras el mouse está sobre el carrusel
    e.preventDefault(); 
    
    if (!puedeGirar) return;

    // Sensibilidad: solo girar si el movimiento es claro
    if (Math.abs(e.deltaY) > 5) { 
        puedeGirar = false;
        
        // Invertimos la lógica para que se sienta más natural con el scroll
        indiceActual = (indiceActual + (e.deltaY > 0 ? 1 : -1) + total) % total;
        actualizarAbanico();

        setTimeout(() => {
            puedeGirar = true;
        }, cooldown);
    }
    }, { passive: false });

    // TÁCTIL
    contenedor.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
    contenedor.addEventListener('touchmove', (e) => {
        if (!puedeGirar) return;
        const diff = touchStartX - e.touches[0].clientX;
        if (Math.abs(diff) > sensibilidad) {
            puedeGirar = false;
            indiceActual = (indiceActual + (diff > 0 ? 1 : -1) + total) % total;
            actualizarAbanico();
            setTimeout(() => { puedeGirar = true; }, cooldown);
        }
    });

    setInterval(() => { if(puedeGirar) { indiceActual = (indiceActual + 1) % total; actualizarAbanico(); } }, 5000);
}

function actualizarAbanico() {
    const cards = document.querySelectorAll('.foto-card');
    cards.forEach(f => { f.className = 'foto-card oculta'; f.style.zIndex = "0"; });
    const getIdx = (off) => (indiceActual + off + total) % total;
    const mapa = [
        { idx: getIdx(0), clase: 'pos-centro', z: 50 },
        { idx: getIdx(1), clase: 'pos-d1', z: 40 },
        { idx: getIdx(2), clase: 'pos-d2', z: 30 },
        { idx: getIdx(3), clase: 'pos-d3', z: 20 },
        { idx: getIdx(-1), clase: 'pos-i1', z: 40 },
        { idx: getIdx(-2), clase: 'pos-i2', z: 30 },
        { idx: getIdx(-3), clase: 'pos-i3', z: 20 }
    ];
    mapa.forEach(item => {
        const el = document.getElementById('img-' + item.idx);
        if (el) { el.className = 'foto-card ' + item.clase; el.style.zIndex = item.z; }
    });
}

let carruselPausado = false;

function abrirFoto(url, msj) {
    carruselPausado = true; // Pausamos el giro automático
    document.getElementById('img-modal').src = url;
    // ... resto del código
}

function cerrarFoto() {
    carruselPausado = false; // Reanudamos
    document.getElementById('modal-foto').classList.add('modal-oculto');
}

// Y en tu intervalo de giro automático:
setInterval(() => { 
    if(puedeGirar && !carruselPausado) { // Añadimos la condición
        indiceActual = (indiceActual + 1) % total; 
        actualizarAbanico(); 
    } 
}, 5000);
}

function cerrarFoto() { document.getElementById('modal-foto').classList.add('modal-oculto'); }

function toggleReproductor() {
    const r = document.getElementById('reproductor-mini');
    const b = document.getElementById('boton-musica');
    if (r.classList.contains('oculto')) { r.classList.remove('oculto'); b.classList.add('boton-oculto'); }
    else { r.classList.add('oculto'); b.classList.remove('boton-oculto'); }
}

window.onload = () => { actualizarContador(); inicializar(); setInterval(actualizarContador, 1000); };
