// Script de la Página 6 - Buscador Global
console.log("Página 6 (Buscador) cargada correctamente");

// Base de datos simulada del contenido de todas las páginas
const baseDatosPaginas = [
    {
        id: 1,
        titulo: "Inicio - Índice Principal",
        url: "index.html",
        contenido: "bienvenido sitio web multifuncional navegación páginas inicio principal menu",
        palabrasClave: ["inicio", "navegación", "menú", "principal"]
    },
    {
        id: 2,
        titulo: "Formulario de Carga",
        url: "pagina2.html",
        contenido: "email correo password contraseña archivo texto cargar formulario input consola mostrar",
        palabrasClave: ["email", "password", "archivo", "formulario", "txt"]
    },
    {
        id: 3,
        titulo: "Calendario y Visualizador PDF",
        url: "pagina3.html",
        contenido: "fecha calendario seleccionar dia semana pdf documento cargar visualizar visor",
        palabrasClave: ["fecha", "calendario", "pdf", "documento", "día"]
    },
    {
        id: 4,
        titulo: "Cargador de Multimedia",
        url: "pagina4.html",
        contenido: "color selector imagen foto audio musica sonido video pelicula multimedia cargar",
        palabrasClave: ["color", "imagen", "audio", "video", "multimedia"]
    },
    {
        id: 5,
        titulo: "La Revolución Digital",
        url: "pagina5.html",
        contenido: "transformación digital tecnología internet dispositivos inteligentes inteligencia artificial innovación computación sociedad educación ciudades colaboración internacional biología convergencia",
        palabrasClave: ["tecnología", "digital", "innovación", "inteligencia artificial", "futuro"]
    },
    {
        id: 6,
        titulo: "Buscador Global del Sitio",
        url: "pagina6.html",
        contenido: "buscador buscar busqueda encontrar contenido indexado paginas sitio web resultado filtro",
        palabrasClave: ["búsqueda", "buscador", "encontrar", "resultados", "índice"]
    },
    {
        id: 7,
        titulo: "Historia de la Humanidad",
        url: "pagina7.html",
        contenido: "humanidad historia civilización antigua mesopotamia egipto grecia roma edad media renacimiento revolución industrial modernidad contemporánea futuro",
        palabrasClave: ["historia", "civilización", "antigua", "renacimiento", "futuro"]
    },
    {
        id: 8,
        titulo: "Catálogo de Productos",
        url: "pagina8.html",
        contenido: "productos articulos catalogo precios filtro rango lista compras tienda electronica ropa hogar deportes",
        palabrasClave: ["productos", "precios", "catálogo", "filtro", "tienda"]
    }
];

// Textos completos simulados para búsqueda profunda
const textosCompletos = {
    5: "La transformación digital ha revolucionado cada aspecto de nuestra existencia moderna dispositivos móviles inteligentes representan avance significativo inteligencia artificial emerge como frontera siguiente",
    7: "La historia de la humanidad es un relato épico de innovación superación y transformación desde las primeras civilizaciones hasta la era espacial hemos demostrado una capacidad increíble para adaptarnos y prosperar"
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    renderizarIndice();
    console.log("Buscador inicializado con", baseDatosPaginas.length, "páginas indexadas");
});

function renderizarIndice() {
    const contenedor = document.getElementById('indicePaginas');
    contenedor.innerHTML = baseDatosPaginas.map(pagina => `
        <div class="pagina-index">
            <h4>${pagina.titulo}</h4>
            <div class="stats">${pagina.contenido.split(' ').length} palabras indexadas</div>
            <div class="palabras-clave">
                ${pagina.palabrasClave.map(p => `<span class="tag">${p}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function realizarBusqueda() {
    const termino = document.getElementById('buscadorInput').value.toLowerCase().trim();
    const buscarTitulos = document.getElementById('buscarTitulos').checked;
    const buscarContenido = document.getElementById('buscarContenido').checked;
    const resaltar = document.getElementById('resaltarResultados').checked;
    
    if (!termino) {
        alert("Por favor ingresa un término de búsqueda");
        return;
    }
    
    console.log("Buscando:", termino);
    
    const resultados = [];
    
    baseDatosPaginas.forEach(pagina => {
        let encontrado = false;
        let contexto = "";
        
        // Buscar en título
        if (buscarTitulos && pagina.titulo.toLowerCase().includes(termino)) {
            encontrado = true;
            contexto = `Título coincide: "${pagina.titulo}"`;
        }
        
        // Buscar en contenido
        if (buscarContenido && pagina.contenido.toLowerCase().includes(termino)) {
            encontrado = true;
            const palabras = pagina.contenido.split(' ');
            const index = palabras.findIndex(p => p.toLowerCase().includes(termino));
            const inicio = Math.max(0, index - 3);
            const fin = Math.min(palabras.length, index + 4);
            contexto = palabras.slice(inicio, fin).join(' ');
        }
        
        // Buscar en textos completos si existe
        if (textosCompletos[pagina.id] && textosCompletos[pagina.id].toLowerCase().includes(termino)) {
            encontrado = true;
            const texto = textosCompletos[pagina.id];
            const index = texto.toLowerCase().indexOf(termino);
            const inicio = Math.max(0, index - 30);
            const fin = Math.min(texto.length, index + termino.length + 30);
            contexto = "..." + texto.substring(inicio, fin) + "...";
        }
        
        if (encontrado) {
            resultados.push({
                ...pagina,
                contexto: contexto,
                termino: termino
            });
        }
    });
    
    mostrarResultados(resultados, resaltar);
}

function mostrarResultados(resultados, resaltar) {
    const contenedor = document.getElementById('resultadosBusqueda');
    
    if (resultados.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>😕 No se encontraron resultados</p>
                <small>Intenta con otros términos como: tecnología, historia, precios, color, etc.</small>
            </div>
        `;
        console.log("Búsqueda sin resultados");
        return;
    }
    
    console.log("Resultados encontrados:", resultados.length);
    
    let html = `<div class="estadisticas-busqueda">Se encontraron ${resultados.length} resultado(s)</div>`;
    
    html += resultados.map(res => {
        let contextoMostrar = res.contexto;
        if (resaltar && res.termino) {
            const regex = new RegExp(`(${res.termino})`, 'gi');
            contextoMostrar = contextoMostrar.replace(regex, '<span class="highlight">$1</span>');
        }
        
        return `
            <div class="resultado-item" onclick="window.location.href='${res.url}'">
                <h4>${res.titulo}</h4>
                <div class="pagina-origen">📄 ${res.url} • Página ${res.id}</div>
                <div class="contexto">${contextoMostrar}</div>
            </div>
        `;
    }).join('');
    
    contenedor.innerHTML = html;
}

// Búsqueda en tiempo real
document.getElementById('buscadorInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        realizarBusqueda();
    }
});