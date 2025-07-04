function calcular() {
    alert('Calculado con Exito');
}

const formulario = document.getElementById('formulario-productos');
const productosDiv = document.getElementById('productos');
const calcularBoton = document.getElementById('calcular');

let productos = [];

calcularBoton.style.display = 'none';

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreProducto = document.getElementById('nombre-producto').value;
    const precioCompra = document.getElementById('precio-compra').value;
    const cantidadUnidades = document.getElementById('cantidad-unidades').value;
    const precioVenta = document.getElementById('precio-venta').value;

    const producto = {
        nombreProducto: nombreProducto,
        precioCompra: precioCompra,
        cantidadUnidades: cantidadUnidades,
        precioVenta: precioVenta
    }

    productos.push(producto);

    const productoHTML = `
        <div class="producto">
                <label for="">${nombreProducto} <span class="precio-compra">$${precioCompra}</span> <span>${cantidadUnidades} uni.</span> <span class="precio">$${precioVenta}</span></label>
        </div>
    `;

    // productosDiv.innerHTML += productoHTML;
    calcularBoton.insertAdjacentHTML('beforebegin', productoHTML);

    calcularBoton.style.display = 'block'; 
    
    document.getElementById('nombre-producto').value = '';
    document.getElementById('precio-compra').value = '';
    document.getElementById('cantidad-unidades').value = '';
    document.getElementById('precio-venta').value = '';

    console.log(productos);


});