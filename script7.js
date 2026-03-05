// Script de la Página 7 - Texto 327 Palabras
console.log("Página 7 (Historia) cargada correctamente");

document.addEventListener('DOMContentLoaded', function() {
    const textoElement = document.getElementById('textoCapitulo');
    const texto = textoElement.innerText;
    
    // Contar palabras
    const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0);
    const totalPalabras = palabras.length;
    
    // Contar párrafos
    const parrafos = textoElement.querySelectorAll('p').length;
    
    // Calcular tiempo de lectura (aprox 200 palabras por minuto)
    const tiempoLectura = Math.ceil(totalPalabras / 200);
    
    // Actualizar estadísticas
    document.getElementById('totalPalabras').textContent = totalPalabras;
    document.getElementById('totalParrafos').textContent = parrafos;
    document.getElementById('tiempoLectura').textContent = tiempoLectura;
    
    // Verificar requisito de 327 palabras mínimo
    if (totalPalabras >= 327) {
        console.log(✅ Requisito cumplido: ${totalPalabras} palabras (mínimo 327));
    } else {
        console.warn(⚠️ Faltan palabras: ${totalPalabras}/327);
    }
    
    // Análisis adicional
    const palabrasUnicas = new Set(palabras.map(p => p.toLowerCase().replace(/[.,;:]/g, '')));
    console.log("Estadísticas del texto:");
    console.log("- Total palabras:", totalPalabras);
    console.log("- Palabras únicas:", palabrasUnicas.size);
    console.log("- Párrafos:", parrafos);
    console.log("- Tiempo lectura:", tiempoLectura, "minutos");
    
    // Efecto de aparición gradual
    const parrafosElements = textoElement.querySelectorAll('p');
    parrafosElements.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        setTimeout(() => {
            p.style.transition = 'all 0.6s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, index * 200);
    });
});