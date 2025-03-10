    let currentImageIndex = 0;
    const items = document.querySelectorAll('.item');
    const totalItems = items.length;

    function showNextImage() {
        // Ocultar la imagen actual
        items[currentImageIndex].classList.remove('active');
        
        // Calcular el índice de la siguiente imagen
        currentImageIndex = (currentImageIndex + 1) % totalItems;
        
        // Mostrar la siguiente imagen
        items[currentImageIndex].classList.add('active');
    }

    // Inicializar mostrando la primera imagen
    items[currentImageIndex].classList.add('active');

    // Cambiar la imagen cada 3 segundos
    setInterval(showNextImage, 4000);
