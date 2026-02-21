// Referencias a elementos
const botones = document.querySelectorAll('button[data-pdf]'); // Selecciona todos los botones con data-pdf
const archivoActual = document.getElementById('archivoActual');

// Función para cargar PDF (reutilizable)
function cargarPDF(archivo) {
    if (archivo) {
        const viewerUrl = `./lib/pdf.js/web/viewer.html?file=${encodeURIComponent(archivo)}`;
        window.open(viewerUrl, '_blank');
        archivoActual.textContent = archivo;
    }
}

// Event listeners para cada botón
botones.forEach(boton => {
    boton.addEventListener('click', function() {
        const archivo = this.getAttribute('data-pdf'); // Variable dinámica: lee el data-pdf del botón clicado
        cargarPDF(archivo);
    });
});