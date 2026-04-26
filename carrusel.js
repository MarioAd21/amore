/* carrusel.js */
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
let touchStartX = 0;
let puedeGirar = true;
let carruselPausado = false; 
const cooldown = 400;     
const sensibilidad = 80;  

function inicializarCarrusel() {
    const contenedor = document.getElementById('contenedor');
    if (!contenedor) return;

    misRecuerdos.forEach((r, i) => {
        const img = document.createElement('img');
        img.src = r.url;
        img.className = 'foto-card oculta';
        img.id = 'img-' + i;
        img.onclick = () => { 
            if(img.classList.contains('pos-centro')) abrirFoto(r.url, r.msj); 
        };
        contenedor.appendChild(img);
    });

    actualizarAbanico();

    // Eventos de Scroll y Táctil
    contenedor.addEventListener('wheel', (e) => {
        e.preventDefault(); 
        if (!puedeGirar) return;
        if (Math.abs(e.deltaY) > 5) { 
            puedeGirar = false;
            indiceActual = (indiceActual + (e.deltaY > 0 ? 1 : -1) + total) % total;
            actualizarAbanico();
            setTimeout(() => { puedeGirar = true; }, cooldown);
        }
    }, { passive: false });

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

    // Giro automático
    setInterval(() => { 
        if(puedeGirar && !carruselPausado) { 
            indiceActual = (indiceActual + 1) % total; 
            actualizarAbanico(); 
        } 
    }, 5000);
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

function abrirFoto(url, msj) {
    carruselPausado = true; 
    document.getElementById('img-modal').src = url;
    document.getElementById('texto-mensaje').innerText = msj;
    document.getElementById('modal-foto').classList.remove('modal-oculto');
}

function cerrarFoto() {
    carruselPausado = false; 
    document.getElementById('modal-foto').classList.add('modal-oculto');
}