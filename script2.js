// Script de la Página 2 - Formulario y Archivo
console.log("Página 2 (Formulario) cargada correctamente");

// Capturar inputs en tiempo real
document.getElementById('email').addEventListener('input', function(e) {
    const valor = e.target.value;
    document.getElementById('emailDisplay').textContent = valor || 'No ingresado';
    console.log("Email actual:", valor);
});

document.getElementById('password').addEventListener('input', function(e) {
    const valor = e.target.value;
    const mascara = valor ? '*'.repeat(valor.length) : 'No ingresado';
    document.getElementById('passDisplay').textContent = mascara;
    console.log("Password actual (longitud):", valor.length);
});

function cargarArchivo() {
    const inputArchivo = document.getElementById('archivoTxt');
    const archivo = inputArchivo.files[0];
    
    if (!archivo) {
        alert("Por favor selecciona un archivo .txt primero");
        return;
    }
    
    if (!archivo.name.endsWith('.txt')) {
        alert("Solo se permiten archivos .txt");
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const contenido = e.target.result;
        
        // Mostrar en consola
        console.log("=== CONTENIDO DEL ARCHIVO ===");
        console.log(contenido);
        console.log("=============================");
        
        // Mostrar en página
        document.getElementById('textoArchivo').textContent = contenido;
        
        // Información adicional
        console.log("Nombre del archivo:", archivo.name);
        console.log("Tamaño:", archivo.size, "bytes");
        console.log("Tipo:", archivo.type);
    };
    
    reader.onerror = function() {
        console.error("Error al leer el archivo");
        alert("Error al leer el archivo");
    };
    
    reader.readAsText(archivo);
}

// Mensaje inicial en consola
console.log("Sistema listo para cargar email, password y archivos de texto");