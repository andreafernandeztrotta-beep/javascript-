// 1. Clase para Servicios
class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// 2. Catálogo de Akkü Studio Lab
const catalogo = [
    new Servicio(1, "Emailling Estratégico", 2500),
    new Servicio(2, "Diseño UX/UI", 5000),
    new Servicio(3, "Data Strategy", 4500),
    new Servicio(4, "AI Automation", 6000)
];

// 3. Recuperar carrito de LocalStorage (Uso de JSON)
let carrito = JSON.parse(localStorage.getItem("carrito_akku")) || [];

// Captura de elementos del DOM
const contenedorServicios = document.getElementById("contenedor-servicios");
const listaCarrito = document.getElementById("lista-carrito");
const precioTotal = document.getElementById("precio-total");
const btnVaciar = document.getElementById("btn-vaciar");

// 4. Función para mostrar los servicios en el HTML
function renderizarServicios() {
    contenedorServicios.innerHTML = ""; // Limpiar por seguridad
    catalogo.forEach(servicio => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-servicio");
        div.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>$${servicio.precio}</p>
            <button class="btn-agregar" data-id="${servicio.id}">Agregar</button>
        `;
        contenedorServicios.appendChild(div);
    });

    // Eventos para los botones de agregar
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

// 5. Lógica del Carrito
function agregarAlCarrito(id) {
    const servicio = catalogo.find(s => s.id === id);
    carrito.push(servicio);
    actualizarInterfaz();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // Dibujar el carrito en el HTML
    listaCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nombre} - $${item.precio}</span>
            <button class="btn-borrar" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        listaCarrito.appendChild(li);
    });

    // Calcular total y aplicar descuento (Lógica de Negocio)
    const totalBase = carrito.reduce((acc, s) => acc + s.precio, 0);
    if (totalBase > 8000) {
        const totalConDescuento = totalBase * 0.85;
        precioTotal.innerHTML = `Subtotal: $${totalBase} <br> <strong>Total con Bonificación (15%): $${totalConDescuento.toFixed(2)}</strong>`;
    } else {
        precioTotal.innerText = `Total: $${totalBase}`;
    }

    // Guardar en Storage (Uso de JSON)
    localStorage.setItem("carrito_akku", JSON.stringify(carrito));
}

// 6. Evento para vaciar
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfaz();
});

// Inicialización
renderizarServicios();
actualizarInterfaz();
