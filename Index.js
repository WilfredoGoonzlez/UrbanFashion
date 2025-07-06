const imagenes = document.querySelector('.imagenes');
const imgs = imagenes.children;
const totalImagenes = imgs.length;

// Clonar la primera imagen y agregarla al final
const primerClon = imgs[0].cloneNode(true);
imagenes.appendChild(primerClon);

let index = 0;

function mostrarImagen() {
    index++;

    imagenes.style.transition = "transform 0.5s ease-in-out";
    imagenes.style.transform = `translateX(-${index * 100}%)`;

    // Cuando llegue al clon (última imagen), hacer reset invisible
    if (index === totalImagenes) {
        setTimeout(() => {
            imagenes.style.transition = "none";
            imagenes.style.transform = `translateX(0%)`;
            index = 0;
        }, 500); // Tiempo igual al de la transición
    }
}

setInterval(mostrarImagen, 3000);


























// Esperamos que todo esté listo para inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Inicializar eventos
    document.querySelectorAll('.btn-eliminar').forEach(btn => btn.addEventListener('click', eliminarItemCarrito));
    document.querySelectorAll('.sumar-cantidad').forEach(btn => btn.addEventListener('click', sumarCantidad));
    document.querySelectorAll('.restar-cantidad').forEach(btn => btn.addEventListener('click', restarCantidad));
    document.querySelectorAll('.boton-item').forEach(btn => btn.addEventListener('click', agregarAlCarritoClicked));
    document.querySelector('.btn-pagar')?.addEventListener('click', pagarClicked);

    // Ocultar carrito al cargar
    ocultarCarrito();

    // Modal login
    document.getElementById('btnMostrarLogin').addEventListener('click', () => {
        document.getElementById('loginOverlay').style.display = 'flex';
    });

    document.getElementById('cerrarModal').addEventListener('click', () => {
        document.getElementById('loginOverlay').style.display = 'none';
    });
}

function agregarAlCarritoClicked(e) {
    const item = e.target.closest('.item');
    const titulo = item.querySelector('.titulo-item').innerText;
    const precio = item.querySelector('.precio-item').innerText;
    const imagen = item.querySelector('.img-item').src;

    agregarItemAlCarrito(titulo, precio, imagen);
    mostrarCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.querySelector('.carrito-items');
    const titulosExistentes = Array.from(itemsCarrito.querySelectorAll('.carrito-item-titulo'));

    if (titulosExistentes.some(t => t.innerText === titulo)) {
        alert("El item ya está en el carrito");
        return;
    }

    const itemHTML = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">$${parseFloat(precio).toFixed(2)}</span>
            </div>
            <span class="btn-eliminar"><i class="fa-solid fa-trash"></i></span>
        </div>`;

    itemsCarrito.insertAdjacentHTML('beforeend', itemHTML);
    actualizarTotalCarrito();
    refrescarEventos();
}

function refrescarEventos() {
    document.querySelectorAll('.btn-eliminar').forEach(btn => btn.onclick = eliminarItemCarrito);
    document.querySelectorAll('.sumar-cantidad').forEach(btn => btn.onclick = sumarCantidad);
    document.querySelectorAll('.restar-cantidad').forEach(btn => btn.onclick = restarCantidad);
}

function eliminarItemCarrito(e) {
    e.target.closest('.carrito-item').remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function actualizarTotalCarrito() {
    const items = document.querySelectorAll('.carrito-item');
    let total = 0;
    items.forEach(item => {
        const precio = parseFloat(item.querySelector('.carrito-item-precio').innerText.replace('$', ''));
        const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        total += precio * cantidad;
    });
    document.querySelector('.carrito-precio-total').innerText = `$${total.toFixed(2)}`;
}

function mostrarCarrito() {
    const carrito = document.querySelector('.carrito');
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    document.querySelector('.contenedor-items').style.width = '60%';
}

function ocultarCarrito() {
    const carrito = document.querySelector('.carrito');
    const itemsCarrito = document.querySelector('.carrito-items');
    if (!itemsCarrito || itemsCarrito.childElementCount === 0) {
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        document.querySelector('.contenedor-items').style.width = '100%';
    }
}

function sumarCantidad(e) {
    const input = e.target.parentElement.querySelector('.carrito-item-cantidad');
    input.value = parseInt(input.value) + 1;
    actualizarTotalCarrito();
}

function restarCantidad(e) {
    const input = e.target.parentElement.querySelector('.carrito-item-cantidad');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        actualizarTotalCarrito();
    }
}

function pagarClicked() {
    alert("Gracias por su compra");
    document.querySelector('.carrito-items').innerHTML = '';
    actualizarTotalCarrito();
    ocultarCarrito();
}



























// Mostrar login desde botón del header
document.addEventListener('DOMContentLoaded', function () {
    const btnMostrarLogin = document.getElementById('btnMostrarLogin');
    const overlay = document.getElementById('loginOverlay');
    const cerrar = document.getElementById('cerrarModal');

    btnMostrarLogin.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    cerrar.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

























