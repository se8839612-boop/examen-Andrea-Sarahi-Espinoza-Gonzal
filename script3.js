// Script de la Página 3 - Calendario y PDF
console.log("Página 3 (Calendario y PDF) cargada correctamente");

function mostrarFecha() {
    const fechaInput = document.getElementById('fechaInput').value;
    
    if (!fechaInput) {
        alert("Por favor selecciona una fecha");
        return;
    }
    
    const fecha = new Date(fechaInput);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = diasSemana[fecha.getDay()];
    
    // Formatear fecha
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    
    // Mostrar en página
    document.getElementById('fechaDisplay').textContent = fechaFormateada;
    document.getElementById('diaSemana').textContent = diaSemana;
    
    // Mostrar en consola
    console.log("=== INFORMACIÓN DE FECHA ===");
    console.log("Fecha seleccionada:", fechaFormateada);
    console.log("Día de la semana:", diaSemana);
    console.log("Timestamp:", fecha.getTime());
    console.log("============================");
}

function cargarPDF() {
    const inputPDF = document.getElementById('pdfInput');
    const archivo = inputPDF.files[0];
    
    if (!archivo) {
        alert("Por favor selecciona un archivo PDF");
        return;
    }
    
    if (!archivo.type.includes('pdf') && !archivo.name.endsWith('.pdf')) {
        alert("Solo se permiten archivos PDF");
        return;
    }
    
    const url = URL.createObjectURL(archivo);
    const visor = document.getElementById('visorPDF');
    
    // Crear iframe para mostrar PDF
    visor.innerHTML = `<iframe src="${url}" title="Visor PDF"></iframe>`;
    
    // Información en consola
    console.log("=== PDF CARGADO ===");
    console.log("Nombre:", archivo.name);
    console.log("Tamaño:", (archivo.size / 1024).toFixed(2), "KB");
    console.log("URL temporal:", url);
    console.log("===================");
    
    // Liberar URL cuando ya no se necesite (opcional, aquí se mantiene para visualización)
}

// Establecer fecha máxima como hoy
document.addEventListener('DOMContentLoaded', function() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInput').setAttribute('max', hoy);
    console.log("Fecha máxima establecida:", hoy);
});