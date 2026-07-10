const numberOfStars = 70; // Subimos a 70 estrellas para rellenar bien el fondo espacial

function createStardust() {
    const starContainer = document.getElementById('polvo-estelar');
    if (!starContainer) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('estrella');
        
        // Tamaños un poco más óptimos (entre 1.5px y 4px) para simular profundidad
        const size = Math.random() * 2.5 + 1.5;
        const glow = Math.random() * 4 + 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Cambiado a % para una distribución perfecta en el fondo del modal
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.boxShadow = `0 0 ${glow}px rgba(255, 240, 220, 0.7)`;
        
        // Variables dinámicas para la animación lenta y mágica
        star.style.setProperty('--duracion', `${Math.random() * 4 + 3}s`); // Movimientos de 3 a 7 segundos
        star.style.setProperty('--retraso', `${Math.random() * 3}s`);
        star.style.setProperty('--mov-y', `-${Math.random() * 25 + 10}px`); // Flotan suavemente hacia arriba
        star.style.setProperty('--mov-x', `${Math.random() * 16 - 8}px`);  // Ligero vaivén lateral
        
        // BAJAR EL COLOR / OPACIDAD: Aquí controlamos que no sean tan brillantes ni opacos
        // Rango de opacidad máxima muy bajo (entre 15% y 50% de visibilidad)
        star.style.setProperty('--opacidad-max', `${Math.random() * 0.35 + 0.15}`);

        fragment.appendChild(star);
    }
    
    starContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', createStardust);