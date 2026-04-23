// 1. Clase para definir la estructura de tus servicios
class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// 2. Variables de estado
let catalogo = []; 
let carrito = JSON.parse(localStorage.getItem("carrito_akku")) || [];

// 3. Referencias al DOM (estos IDs deben coincidir con tu index.html)
const contenedorServicios = document.getElementById("contenedor-servicios");
const listaCarrito = document.getElementById("lista-carrito");
const precioTotal = document.getElementById("precio-total");
const btnVaciar = document.getElementById("btn-vaciar");

// 4. CARGA ASÍNCRONA: El corazón de tu proyecto final
async function cargarDatos() {
    try {
        // Buscamos los datos en el archivo servicios.json
        const response = await fetch('./servicios.json');
        const data = await response.json();
        
        // Llenamos el catálogo con objetos de la clase Servicio
        catalogo = data.map(s => new Servicio(s.id, s.nombre, s.precio));
        
        // Una vez que tenemos los datos, dibujamos la interfaz
        renderizarServicios();
        actualizarInterfaz();
    } catch (error) {
        console.error("Error al conectar con los datos:", error);
    }
}

// 5. Renderizado dinámico de servicios
function renderizarServicios() {
    contenedorServicios.innerHTML = "";
    catalogo.forEach(servicio => {
        const div = document.createElement("div");
        div.className = "tarjeta-servicio";
        div.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>$${servicio.precio}</p>
            <button onclick="agregarAlCarrito(${servicio.id})">Agregar</button>
        `;
        contenedorServicios.appendChild(div);
    });
}

// 6. Lógica del Carrito
window.agregarAlCarrito = (id) => {
    const item = catalogo.find(s => s.id === id);
    carrito.push(item);
    actualizarInterfaz();
};

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    listaCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - $${item.precio} 
            <button class="btn-borrar" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((acc, s) => acc + s.precio, 0);
    
    // Aplicamos bonificación si el monto es alto (Lógica de negocio)
    if (total > 8000) {
        const bonificado = total * 0.85;
        precioTotal.innerHTML = `Total: <del>$${total}</del> <strong>$${bonificado.toFixed(2)} (15% OFF)</strong>`;
    } else {
        precioTotal.textContent = `Total: $${total}`;
    }

    localStorage.setItem("carrito_akku", JSON.stringify(carrito));
}

// 7. Eventos
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfaz();
});

// 8. ¡Arrancamos el simulador!
cargarDatos();
