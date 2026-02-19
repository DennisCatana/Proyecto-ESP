const selector = document.getElementById('selectorArchivo');
        const visor = document.getElementById('visor');
        const descarga = document.getElementById('descarga');
        
        selector.addEventListener('change', function() {
            const archivo = this.value;
            if (archivo) {
                // Mostrar el archivo en el visor
                visor.src = archivo;
                visor.style.display = 'block';
                
                // Configurar el enlace de descarga
                descarga.href = archivo;
                descarga.style.display = 'inline';
            } else {
                // Ocultar si no hay selección
                visor.style.display = 'none';
                descarga.style.display = 'none';
            }
        });
