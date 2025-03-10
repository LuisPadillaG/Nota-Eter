const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
window.onload = function() {
    guardarCambio(ctx.getImageData(0, 0, canvas.width, canvas.height));
};
const opciones = ["circulo", "cuadrado", "imagen", "pincel", "borrador", "linea", "triangulo", "deshacer", "rehacer"];
const prev_sticker = document.querySelector("#sticker-prev");
const rangoImagen = document.querySelector("#rango-imagen");
let opcion;
let sticker_url;
let posicionesCursor = [[],[]];
let iniciarTrazo = false;
let historial = [];
let historialDeshechos = [];


class Rectangulo {
    constructor(id, posicionesCursor , colorlinea, colorrelleno, grozorlinea){
        this.Id = id,
        this.x = Math.min(posicionesCursor[0].x, posicionesCursor[1].x),
        this.y = Math.min(posicionesCursor[0].y, posicionesCursor[1].y),
        this.alto = Math.abs(posicionesCursor[1].y - posicionesCursor[0].y),
        this.ancho = Math.abs(posicionesCursor[1].x - posicionesCursor[0].x),

        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea
    }
    ImprimirDatos(){
        console.log("Id: " + this.Id);
        console.log("X: " + this.x);
        console.log("Y: " + this.y);
        console.log("Alto: " + this.alto);
        console.log("Ancho: " + this.ancho);
        console.log("Color Linea: " + this.colorLinea);
        console.log("Color Relleno: " + this.colorRelleno);
        console.log("Grozor Linea: " + this.grozorLinea);
    }
    Dibujar(){
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
}

class Circulo {
    constructor(id, posicionesCursor, colorlinea, colorrelleno, grozorlinea){
        this.Id = id,
        this.x = posicionesCursor[0].x,
        this.y = posicionesCursor[0].y,
        this.radio = Math.sqrt((posicionesCursor[1].x - posicionesCursor[0].x) **2 + (posicionesCursor[1].y - posicionesCursor[0].y) ** 2),

        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea
    }
    ImprimirDatos(){
        console.log("Id: " + this.Id);
        console.log("X: " + this.x);
        console.log("Y: " + this.y);
        console.log("Radio " + this.radio);
        console.log("Color Linea: " + this.colorLinea);
        console.log("Color Relleno: " + this.colorRelleno);
        console.log("Grozor Linea: " + this.grozorLinea);
    }
    Dibujar(){
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;

        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

class Sticker{
    constructor(url, posX, posY, porcentaje){
        this.imagen = new Image();
        this.imagen.src = url;
        this.ancho = this.imagen.width * (porcentaje/100);
        this.alto = this.imagen.height * (porcentaje/100);
        this.x = posX;
        this.y = posY;
    }
    Dibujar(){
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height, this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
    }
}

class Triangulo {
    constructor(id, posicionesCursor, colorLinea, colorRelleno, grosorLinea) {
        this.Id = id;
        this.x1 = posicionesCursor[0].x;
        this.y1 = posicionesCursor[0].y;
        this.x2 = posicionesCursor[1].x;
        this.y2 = posicionesCursor[1].y;
        this.colorLinea = colorLinea;
        this.colorRelleno = colorRelleno;
        this.grosorLinea = grosorLinea;
    }

    Dibujar() {
        const base = Math.abs(this.x2 - this.x1);
        const altura = Math.abs(this.y2 - this.y1);

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1 + base, this.y1);
        ctx.lineTo(this.x1 + (base / 2), this.y1 - altura);
        ctx.closePath();

        ctx.lineWidth = this.grosorLinea;
        ctx.strokeStyle = this.colorLinea;
        ctx.fillStyle = this.colorRelleno;

        ctx.fill();
        ctx.stroke();
    }
}

