function calcular() {
    alert('Calculado con Exito');
}

const formulario = document.getElementById('formulario-productos');
const productosDiv = document.getElementById('productos');
const calcularBoton = document.getElementById('calcular');

let productos = []; //Array para almacenar los productos

calcularBoton.style.display = 'none'; //Oculta el boton de calcular inicialmente

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

    productos.push(producto); //Agrega el producto al array de productos

    mostrarProductos(); //Muestra los productos en el div de productos
    
    document.getElementById('nombre-producto').value = '';
    document.getElementById('precio-compra').value = '';
    document.getElementById('cantidad-unidades').value = '';
    document.getElementById('precio-venta').value = '';

    // console.log(productos);


})


function mostrarProductos(){
    productosDiv.innerHTML = '';
    let productosHTML = '';

    productos.forEach((producto, index) => {
        productosHTML += `
        <div class="producto">
                <label for="">${producto.nombreProducto} <span class="precio-compra">$${producto.precioCompra}</span> <span>${producto.cantidadUnidades} uni.</span> <span class="precio">$${producto.precioVenta}</span></label>
                <button class="eliminar-producto" onclick=eliminarProducto(${index})>x</button>
        </div>
        `;
    });

    productosDiv.innerHTML = productosHTML;
    productosDiv.appendChild(calcularBoton); //Agrega el boton de calcular despues de agregar los productos
    
    calcularBoton.style.display = 'block'; //Muestra el boton de calcular al agregar un producto


}


function eliminarProducto (index) {
    productos.splice(index, 1);
    productosDiv.innerHTML = '';
    mostrarProductos();

    if (productos.length === 0) {
        calcularBoton.style.display = 'none';
    }
} 