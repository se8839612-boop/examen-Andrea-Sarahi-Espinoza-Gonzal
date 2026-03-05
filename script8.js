// Script de la Página 8 - Catálogo con Filtro de Precios
console.log("Página 8 (Catálogo) cargada correctamente");

// Generar 55 productos automáticamente
const categorias = ['electronica', 'hogar', 'ropa', 'deportes', 'libros'];
const iconos = {
    electronica: '💻',
    hogar: '🏠',
    ropa: '👕',
    deportes: '⚽',
    libros: '📚'
};

const nombresBase = {
    electronica: ['Laptop Pro', 'Tablet Ultra', 'Smartphone X', 'Auriculares BT', 'Monitor 4K', 'Teclado Mecánico', 'Mouse Gamer', 'Webcam HD', 'Disco SSD', 'Router WiFi'],
    hogar: ['Sofá Moderno', 'Lámpara LED', 'Cafetera Elite', 'Aspiradora Pro', 'Microondas Digital', 'Refrigerador Smart', 'Lavadora Auto', 'Cama Queen', 'Mesa Comedor', 'Silla Ergonómica'],
    ropa: ['Camisa Formal', 'Jeans Clásico', 'Zapatillas Sport', 'Chaqueta Cuero', 'Vestido Elegante', 'Reloj Lujo', 'Gafas Sol', 'Bufanda Lana', 'Gorra Estilo', 'Cinturón Cuero'],
    deportes: ['Bicicleta Montaña', 'Pesas Set', 'Colchoneta Yoga', 'Raqueta Tenis', 'Balón Fútbol', 'Mancuernas', 'Cuerda Saltar', 'Guantes Boxeo', 'Botella Agua', 'Banda Resistencia'],
    libros: ['Novela Bestseller', 'Ciencia Ficción', 'Historia Mundo', 'Cocina Gourmet', 'Autoayuda Pro', 'Negocios Exitosos', 'Arte Moderno', 'Filosofía Clásica', 'Tecnología Futuro', 'Viajes Mundo']
};

let productos = [];
let idCounter = 1;

// Generar 55 productos (11 de cada categoría)
categorias.forEach(cat => {
    for (let i = 0; i < 11; i++) {
        const nombreBase = nombresBase[cat][i % 10];
        const variante = i > 9 ? ' Premium' : ` ${String.fromCharCode(65 + i)}`;
        productos.push({
            id: idCounter++,
            nombre: `${nombreBase}${variante}`,
            categoria: cat,
            precio: Math.floor(Math.random() * 900) + 50, // $50 - $950
            icono: iconos[cat]
        });
    }
});

console.log(`Generados ${productos.length} productos`);

// Estado
let paginaActual = 1;
const productosPorPagina = 10;
let productosFiltrados = [...productos];

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    aplicarFiltros();
    console.log("Catálogo inicializado con", productos.length, "artículos");
});

function setupEventListeners() {
    // Rangos de precio
    const rangoMin = document.getElementById('rangoMin');
    const rangoMax = document.getElementById('rangoMax');
    
    rangoMin.addEventListener('input', function() {
        let val = parseInt(this.value);
        const maxVal = parseInt(rangoMax.value);
        if (val > maxVal) {
            val = maxVal;
            this.value = val;
        }
        document.getElementById('valorMin').textContent = val;
        actualizarBarraVisual();
        aplicarFiltros();
    });
    
    rangoMax.addEventListener('input', function() {
        let val = parseInt(this.value);
        const minVal = parseInt(rangoMin.value);
        if (val < minVal) {
            val = minVal;
            this.value = val;
        }
        document.getElementById('valorMax').textContent = val;
        actualizarBarraVisual();
        aplicarFiltros();
    });
    
    // Filtros de categoría
    document.querySelectorAll('.cat-filter').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });
    
    // Ordenar
    document.getElementById('ordenarSelect').addEventListener('change', aplicarFiltros);
}

function actualizarBarraVisual() {
    const min = parseInt(document.getElementById('rangoMin').value);
    const max = parseInt(document.getElementById('rangoMax').value);
    const porcentajeMin = (min / 1000) * 100;
    const porcentajeMax = (max / 1000) * 100;
    
    document.getElementById('barraVisual').style.background = 
        `linear-gradient(to right, #ddd ${porcentajeMin}%, #667eea ${porcentajeMin}%, #667eea ${porcentajeMax}%, #ddd ${porcentajeMax}%)`;
}

function aplicarFiltros() {
    const minPrecio = parseInt(document.getElementById('rangoMin').value);
    const maxPrecio = parseInt(document.getElementById('rangoMax').value);
    
    // Obtener categorías seleccionadas
    const catsSeleccionadas = Array.from(document.querySelectorAll('.cat-filter:checked'))
        .map(cb => cb.value);
    
    // Filtrar
    productosFiltrados = productos.filter(p => {
        const cumplePrecio = p.precio >= minPrecio && p.precio <= maxPrecio;
        const cumpleCategoria = catsSeleccionadas.includes(p.categoria);
        return cumplePrecio && cumpleCategoria;
    });
    
    // Ordenar
    const orden = document.getElementById('ordenarSelect').value;
    switch(orden) {
        case 'precio-asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
    }
    
    paginaActual = 1;
    renderizarProductos();
    actualizarEstadisticas();
}

function renderizarProductos() {
    const grid = document.getElementById('gridProductos');
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
    
    if (productosPagina.length === 0) {
        grid.innerHTML = `
            <div class="no-resultados">
                <h3>😕 No hay productos</h3>
                <p>Intenta ajustar los filtros de precio o categoría</p>
            </div>
        `;
    } else {
        grid.innerHTML = productosPagina.map(p => `
            <div class="producto-card">
                <div class="producto-imagen">${p.icono}</div>
                <div class="producto-info">
                    <span class="producto-categoria">${p.categoria}</span>
                    <h4 class="producto-nombre">${p.nombre}</h4>
                    <div class="producto-precio">$${p.precio}</div>
                    <div class="producto-id">ID: #${String(p.id).padStart(3, '0')}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar paginación
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1;
    document.getElementById('infoPagina').textContent = `Página ${paginaActual} de ${totalPaginas}`;
    document.getElementById('btnPrev').disabled = paginaActual === 1;
    document.getElementById('btnNext').disabled = paginaActual >= totalPaginas;
}

function actualizarEstadisticas() {
    const mostrando = Math.min(productosFiltrados.length, productosPorPagina);
    document.getElementById('contadorProductos').textContent = 
        `Mostrando ${mostrando} de ${productosFiltrados.length} productos (Total catálogo: 55)`;
    
    console.log(`Filtros aplicados: ${productosFiltrados.length} productos encontrados`);
}

function cambiarPagina(direccion) {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const nuevaPagina = paginaActual + direccion;
    
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        paginaActual = nuevaPagina;
        renderizarProductos();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function resetFiltros() {
    document.getElementById('rangoMin').value = 0;
    document.getElementById('rangoMax').value = 1000;
    document.getElementById('valorMin').textContent = '0';
    document.getElementById('valorMax').textContent = '1000';
    document.getElementById('ordenarSelect').value = 'default';
    
    document.querySelectorAll('.cat-filter').forEach(cb => cb.checked = true);
    
    actualizarBarraVisual();
    aplicarFiltros();
    console.log("Filtros reseteados");
}

// Inicializar barra visual
actualizarBarraVisual();