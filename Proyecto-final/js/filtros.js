function aplicarFiltro(tipo) {
    const datosImagen = ctx.getImageData(0, 0, canvas.width, canvas.height);

    switch (tipo) {
        case 'rojo':
            Rojo(datosImagen.data);
            break;
        case 'azul':
            Azul(datosImagen.data);
            break;
        case 'verde':
            Verde(datosImagen.data);
            break; 
        case 'negativo':
            negativo(datosImagen.data);
            break;
        case 'blanco-y-negro':
            blancoYNegro(datosImagen.data);
            break;
        default:
            console.log('Filtro no reconocido');
    }

    ctx.putImageData(datosImagen, 0, 0);
}
function Rojo(datos) {
    for (let i = 0; i < datos.length; i += 4) {
        datos[i] = Math.min(datos[i] + 255, 255);  
    }
}

function Azul(datos) {
    for (let i = 0; i < datos.length; i += 4) {
        datos[i + 2] = Math.min(datos[i + 2] + 255, 255);  
    }
} 

function Verde(datos) {
    for (let i = 0; i < datos.length; i += 4) {
        datos[i + 1] = Math.min(datos[i + 1] + 255, 255); 
    }
}

function negativo(datos) {
    for (let i = 0; i < datos.length; i += 4) {
        datos[i] = 255 - datos[i];       
        datos[i + 1] = 255 - datos[i + 1];
        datos[i + 2] = 255 - datos[i + 2];
    }
}

function blancoYNegro(datos) {
    for (let i = 0; i < datos.length; i += 4) {
        const promedio = (datos[i] + datos[i + 1] + datos[i + 2]) / 3;
        datos[i] = promedio;        
        datos[i + 1] = promedio;  
        datos[i + 2] = promedio;  
    }
}