function lanzarFuegosCorazon() {
    for (let i = 0; i < 35; i++) {
        const corazon = document.createElement('div');
        corazon.innerHTML = '❤️';
        corazon.className = 'fuego-artificial';
        document.body.appendChild(corazon);

        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 100 + Math.random() * 200;

        corazon.style.left = x + 'px';
        corazon.style.top = y + 'px';
        corazon.style.position = 'fixed';
        corazon.style.setProperty('--tx', `${Math.cos(angulo) * distancia}px`);
        corazon.style.setProperty('--ty', `${Math.sin(angulo) * distancia}px`);
        corazon.style.animation = 'explotar 1.5s forwards';

        setTimeout(() => corazon.remove(), 1500);
    }
}