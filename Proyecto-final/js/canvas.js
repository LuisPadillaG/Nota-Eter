let colorLinea = "#fffde7";
let colorRelleno = "#FFA113";

document.getElementById('seleccionar-color-linea').addEventListener('input', function() {
    colorLinea = this.value;
});

document.getElementById('seleccionar-color-relleno').addEventListener('input', function() {
    colorRelleno = this.value;
});

function alHacerClick(event) {
    posicionesCursor[0] = { x: event.offsetX, y: event.offsetY };
    iniciarTrazo = true;    
}

function move(event) {
    if (iniciarTrazo && opcion === 4) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 15;
        ctx.moveTo(posicionesCursor[0].x, posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        posicionesCursor[0] = { x: event.offsetX, y: event.offsetY };
    }
    if (iniciarTrazo && (opcion === 4 || opcion === 5)) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 15;  
        ctx.strokeStyle = colorLinea;
        ctx.moveTo(posicionesCursor[0].x, posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        posicionesCursor[0] = { x: event.offsetX, y: event.offsetY };
    }
}

function leave() {
    iniciarTrazo = false;
}

function alSoltarClick(event) {
    posicionesCursor[1] = { x: event.offsetX, y: event.offsetY };
    iniciarTrazo = false;  
    
    if (opcion === 6) { 
        dibujarLinea(posicionesCursor[0], posicionesCursor[1], colorLinea, 15);
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
}

function SeleccionarOpcion(opcionUsuario) {
    for (let i = 0; i < opciones.length; i++) {
        if (opcionUsuario == opciones[i]) {
            opcion = i + 1;
            if (opcionUsuario === 'borrador') {
                colorLinea = "#FFFFFF"; 
                ctx.globalCompositeOperation = "destination-out"; 
            } else {
                ctx.globalCompositeOperation = "source-over"; 
                if (opcionUsuario === 'pincel' || opcionUsuario === 'linea' || opcionUsuario === 'circulo' || opcionUsuario === 'cuadrado' || opcionUsuario === 'triangulo') {
                    colorLinea = document.getElementById('seleccionar-color-linea').value;
                    colorRelleno = document.getElementById('seleccionar-color-relleno').value; 
                }
            }
        }
    }
}


function DibujarFigura(event) {
    if (opcion === 1) { 
        let circulo = new Circulo(1, posicionesCursor, colorLinea, colorRelleno, 15);
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height)); 
        circulo.Dibujar();
    }
    if (opcion === 2) { 
        let cuadrado = new Rectangulo(1, posicionesCursor, colorLinea, colorRelleno, 15);
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height)); 
        cuadrado.Dibujar();
    }
    if (opcion === 3) {
        sticker = new Sticker(sticker_url, event.offsetX, event.offsetY, rangoImagen.value);
        sticker.Dibujar();
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height)); 
    }
    if (opcion === 4) { 
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
    if (opcion === 7) {
        let triangulo = new Triangulo(1, posicionesCursor, colorLinea, colorRelleno, 15);
        guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height)); 
        triangulo.Dibujar();
    }
} 
function cargarImagenFondo(event) {
    if (event.target.files[0] && event.target.files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                
                const imagenPrev = document.getElementById("imagen-prev");
                imagenPrev.style.backgroundImage = `url(${img.src})`;
                imagenPrev.style.backgroundSize = 'cover';
                imagenPrev.style.backgroundPosition = 'center';
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height));
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert("Pon un archivo de imagen válido.");
    }
}
function cargarSticker(event) {
    if (event.target.files[0] && event.target.files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            sticker_url = e.target.result;
            const stickerPrev = document.getElementById("sticker-prev");
            stickerPrev.style.backgroundImage = `url(${sticker_url})`;
            stickerPrev.style.backgroundSize = 'cover';
            stickerPrev.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert("Pon un archivo de imagen válido.");
    }
}
function reDibujarCanvas(nuevoCanvas) {
    ctx.putImageData(nuevoCanvas, 0, 0);
}

function deshacerCambio() {
    reDibujarCanvas(historial.pop());
}
function guardarCambio(canvasData) {
    historial.push(canvasData);
}
function cargarImagenFondo(event) {
    if (event.target.files[0] && event.target.files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const imagenPrev = document.getElementById("imagen-prev");
                imagenPrev.style.backgroundImage = `url(${img.src})`;
                imagenPrev.style.backgroundSize = 'cover';
                imagenPrev.style.backgroundPosition = 'center';

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height));
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert("Por favor selecciona un archivo de imagen válido.");
    }
}


function dibujarLinea(inicio, fin, color, grosor) {
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = color;
    ctx.moveTo(inicio.x, inicio.y);
    ctx.lineTo(fin.x, fin.y);
    ctx.stroke();
    ctx.closePath();
}

function rehacerCambio() {
    if (historialDeshechos.length > 0) {
        const lastUndoneState = historialDeshechos.pop();
        historial.push(lastUndoneState); 
        reDibujarCanvas(lastUndoneState); 
    } else {
        console.log("No hay cambios para rehacer.");
    }
}

function deshacerCambio() {
    if (historial.length > 1) {
        const lastState = historial.pop();
        historialDeshechos.push(lastState); 
        const stateToRestore = historial[historial.length - 1];
        reDibujarCanvas(stateToRestore); 
    } else {
        console.log("No hay más cambios para deshacer.");
    }
}




function descargarImagen() {
    const canvas = document.getElementById('canvas');

    let nombreArchivo = prompt("Ingresa el nombre del archivo (sin extensión):", "mi_imagen");
    if (!nombreArchivo) {
        nombreArchivo = "Portadacanvas";
    }

    let formato = prompt("Elige el formato de la imagen (png, jpg):", "png");
    if (formato !== "png" && formato !== "jpg") {
        alert("Formato no válido, se descargará como PNG.");
        formato = "png"; //por defecto
    }

   
    const imagenData = canvas.toDataURL("image/" + formato);

    const enlace = document.createElement("a");
    enlace.href = imagenData;
    enlace.download = `${nombreArchivo}.${formato}`;

    enlace.click();
}


function reDibujarCanvas(nuevoCanvas) {
    ctx.putImageData(nuevoCanvas, 0, 0);
}
