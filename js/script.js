// 1. Clase Servicio
class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// 2. Catálogo
const catalogo = [
    new Servicio(1, "Emailing Estratégico", 2500),
    new Servicio(2, "Diseño UX/UI", 5000),
    new Servicio(3, "Data Strategy", 4500),
    new Servicio(4, "AI Automation", 6000)
];

// 3. LocalStorage
let carrito = JSON.parse(localStorage.getItem("carrito_akku")) || [];

// 4. DOM
const contenedorServicios = document.getElementById("contenedor-servicios");
const listaCarrito = document.getElementById("lista-carrito");
const precioTotal = document.getElementById("precio-total");
const btnVaciar = document.getElementById("btn-vaciar");

// 5. Renderizar servicios
function renderizarServicios() {
    contenedorServicios.innerHTML = "";

    catalogo.forEach(servicio => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-servicio");

        const boton = document.createElement("button");
        boton.textContent = "Agregar";
        boton.addEventListener("click", () => agregarAlCarrito(servicio.id));

        div.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>$${servicio.precio}</p>
        `;

        div.appendChild(boton);
        contenedorServicios.appendChild(div);
    });
}

// 6. Agregar al carrito
function agregarAlCarrito(id) {
    const servicio = catalogo.find(s => s.id === id);
    carrito.push(servicio);
    actualizarInterfaz();
}

// 7. Eliminar
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

// 8. Actualizar interfaz
function actualizarInterfaz() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = `${item.nombre} - $${item.precio}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.classList.add("btn-borrar");
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));

        li.appendChild(span);
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });

    const totalBase = carrito.reduce((acc, s) => acc + s.precio, 0);

    if (totalBase > 8000) {
        const totalConDescuento = totalBase * 0.85;
        precioTotal.innerHTML = `
            Subtotal: $${totalBase} <br>
            <strong>Total con Bonificación (15%): $${totalConDescuento.toFixed(2)}</strong>
        `;
    } else {
        precioTotal.textContent = `Total: $${totalBase}`;
    }

    localStorage.setItem("carrito_akku", JSON.stringify(carrito));
}

// 9. Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfaz();
});

// 10. Inicializar
renderizarServicios();
actualizarInterfaz();
