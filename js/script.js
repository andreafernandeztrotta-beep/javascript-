// 1. Función constructora de Servicios (Nivel Pro)
function Servicio(nombre, precio) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
}

// 2. Tu catálogo de servicios de Akkü Studio Lab
const catalogo = [
    new Servicio("Emailling Estratégico", 2500),
    new Servicio("Diseño UX/UI", 5000),
    new Servicio("Data Strategy", 4500)
];

const carrito = [];

function iniciarSimulador() {
    alert("Bienvenido a la plataforma de servicios de Akkü Studio Lab 🚀");
    
    let mensajeMenu = "¿Qué servicio desea cotizar? \n";
    catalogo.forEach((serv, index) => {
        mensajeMenu += `${index + 1}. ${serv.nombre} ($${serv.precio}) \n`;
    });
    mensajeMenu += "Escriba el número o 'ESC' para terminar.";

    let seleccion = prompt(mensajeMenu);

    // Corregimos el ESC para que no falle nunca
    while (seleccion !== null && seleccion.toUpperCase() !== "ESC") {
        let indice = parseInt(seleccion) - 1;

        if (catalogo[indice]) {
            carrito.push(catalogo[indice]);
            alert(`Agregado: ${catalogo[indice].nombre}`);
            console.log("Servicios en cotización:", carrito);
        } else {
            alert("Opción no válida. Por favor, elija un número del menú.");
        }
        
        seleccion = prompt(mensajeMenu);
    }

    finalizarCotizacion();
}

function finalizarCotizacion() {
    if (carrito.length > 0) {
        let total = 0;
        for (const item of carrito) {
            total += item.precio;
        }

        // Condicional de descuento por volumen de servicios
        if (total > 8000) {
            let conDescuento = total * 0.85; // 15% de descuento en servicios premium
            alert(`Total Akkü Studio: $${total}. \n¡Bonificación aplicada! Total final: $${conDescuento}`);
        } else {
            alert(`El total de su cotización es: $${total}`);
        }
    } else {
        alert("No se seleccionaron servicios. ¡Gracias por visitar Akkü!");
    }
}

iniciarSimulador();

