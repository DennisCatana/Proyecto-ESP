// Array con las rutas de tus imágenes
            const images = [
                '/images/image1.jpeg',  // imagen 1
                '/images/image2.jpeg',  // imagen 2
                '/images/image3.jpeg',   // Agregar más
                '/images/image4.jpg',
                '/images/image5.jpeg',
                '/images/image6.jpeg',
                '/images/image7.jpeg',
                '/images/image8.jpeg',
                '/images/image9.jpeg',
                '/images/image10.jpeg',
            ];

            let currentIndex = 0;  // Índice de la imagen actual
            const imgElement = document.getElementById('carousel-image');

            // Función para mostrar la imagen actual con transición
            function showImage() {
                imgElement.style.opacity = 0;  // Oculta la imagen
                setTimeout(() => {
                    imgElement.src = images[currentIndex];  // Cambia la fuente
                    imgElement.style.opacity = 1;  // Muestra con fade
                }, 250);  // Delay de 250ms para la transición
            }

            // Función para ir a la siguiente imagen
            function nextImage() {
                currentIndex = (currentIndex + 1) % images.length;  // Bucle al final
                showImage();
            }

            // Función para ir a la imagen anterior
            function prevImage() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;  // Bucle al inicio
                showImage();
            }

            // Mostrar la primera imagen al cargar
            showImage();