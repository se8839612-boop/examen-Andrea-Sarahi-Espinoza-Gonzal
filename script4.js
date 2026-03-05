// Script de la Página 4 - Multimedia
console.log("Página 4 (Multimedia) cargada correctamente");

// Input Color
const colorInput = document.getElementById('colorInput');
const colorPreview = document.getElementById('colorPreview');
const colorValue = document.getElementById('colorValue');

colorInput.addEventListener('input', function(e) {
    const color = e.target.value;
    colorPreview.style.backgroundColor = color;
    colorValue.textContent = color.toUpperCase();
    console.log("Color seleccionado:", color);
});

// Input Imagen
document.getElementById('imagenInput').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    if (!archivo.type.startsWith('image/')) {
        alert("Por favor selecciona un archivo de imagen");
        return;
    }
    
    const url = URL.createObjectURL(archivo);
    const preview = document.getElementById('imagenPreview');
    
    preview.innerHTML = `<img src="${url}" alt="Vista previa">`;
    
    console.log("Imagen cargada:");
    console.log("Nombre:", archivo.name);
    console.log("Tipo:", archivo.type);
    console.log("Dimensiones: Cargando...");
    
    // Obtener dimensiones
    const img = new Image();
    img.onload = function() {
        console.log("Dimensiones:", this.width, "x", this.height);
    };
    img.src = url;
});

// Input Audio
document.getElementById('audioInput').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    if (!archivo.type.startsWith('audio/')) {
        alert("Por favor selecciona un archivo de audio");
        return;
    }
    
    const url = URL.createObjectURL(archivo);
    const container = document.getElementById('audioContainer');
    
    container.innerHTML = `
        <audio controls>
            <source src="${url}" type="${archivo.type}">
            Tu navegador no soporta audio HTML5
        </audio>
        <p style="margin-top: 10px; font-size: 0.9em;">${archivo.name}</p>
    `;
    
    console.log("Audio cargado:");
    console.log("Nombre:", archivo.name);
    console.log("Duración: Disponible en el reproductor");
    console.log("Tamaño:", (archivo.size / 1024 / 1024).toFixed(2), "MB");
});

// Input Video
document.getElementById('videoInput').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    if (!archivo.type.startsWith('video/')) {
        alert("Por favor selecciona un archivo de video");
        return;
    }
    
    const url = URL.createObjectURL(archivo);
    const container = document.getElementById('videoContainer');
    
    container.innerHTML = `
        <video controls width="100%">
            <source src="${url}" type="${archivo.type}">
            Tu navegador no soporta video HTML5
        </video>
        <p style="margin-top: 10px; font-size: 0.9em;">${archivo.name}</p>
    `;
    
    console.log("Video cargado:");
    console.log("Nombre:", archivo.name);
    console.log("Tipo:", archivo.type);
    console.log("Tamaño:", (archivo.size / 1024 / 1024).toFixed(2), "MB");
});

// Inicializar color
colorPreview.style.backgroundColor = colorInput.value;