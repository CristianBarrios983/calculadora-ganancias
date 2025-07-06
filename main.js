const formulario = document.getElementById('formulario-productos');
const productosDiv = document.getElementById('productos');
const calcularBoton = document.getElementById('calcular');

let productos = []; //Array para almacenar los productos

calcularBoton.style.display = 'none'; //Oculta el boton de calcular inicialmente

const resumenDiv = document.getElementById('resumen');

resumenDiv.style.display = 'none'; //Oculta el contenedor de resumen inicialmente

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreProducto = document.getElementById('nombre-producto').value;
    const precioCompra = document.getElementById('precio-compra').value;
    const cantidadUnidades = document.getElementById('cantidad-unidades').value;
    const unidadesPorPaquete = document.getElementById('unidades-paquete').value;
    const precioVenta = document.getElementById('precio-venta').value;

    const producto = {
        nombreProducto: nombreProducto,
        precioCompra: precioCompra,
        cantidadUnidades: cantidadUnidades,
        unidadesPorPaquete: unidadesPorPaquete,
        precioVenta: precioVenta
    }

    productos.push(producto); //Agrega el producto al array de productos

    mostrarProductos(); //Muestra los productos en el div de productos
    
    document.getElementById('nombre-producto').value = '';
    document.getElementById('precio-compra').value = '';
    document.getElementById('cantidad-unidades').value = '';
    document.getElementById('unidades-paquete').value = '';
    document.getElementById('precio-venta').value = '';

    // console.log(productos);


})


function mostrarProductos(){
    productosDiv.innerHTML = '';
    let productosHTML = '';

    productos.forEach((producto, index) => {
        productosHTML += `
        <div class="producto">
                <label for=""><span>X${producto.cantidadUnidades}</span> ${producto.nombreProducto} <span class="precio-compra">$${producto.precioCompra}</span> <span>${producto.unidadesPorPaquete} uni.</span> <span class="precio">$${producto.precioVenta}</span></label>
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


function calcular() {
    let inversionTotal = 0;
    let ventaTotal = 0;
    let gananciaTotal = 0;

    resumenDiv.style.display = 'flex'; 
    formulario.style.display = 'none';
    productosDiv.style.display = 'none';

    let resumenHTML =  `<h2 style="text-align: center;">Resumen de ganancias</h2>`;

    productos.forEach((producto) => {
        const inversion = parseFloat(producto.precioCompra) * parseInt(producto.cantidadUnidades);
        const venta = (parseFloat(producto.precioVenta) * parseInt(producto.unidadesPorPaquete)) * producto.cantidadUnidades;
        const ganancia = venta - inversion;
        const porcentajeGanancia = (ganancia / inversion) *100;
        const gananciaPorUnidad = parseFloat(producto.precioVenta) - (parseFloat(producto.precioCompra) / parseInt(producto.unidadesPorPaquete));
        const porcentajeDeGananciaPorUnidad = ((gananciaPorUnidad / (parseFloat(producto.precioCompra) / parseInt(producto.unidadesPorPaquete))) * 100).toFixed(2);


        resumenHTML += `
            <div>
                <p><strong>${producto.nombreProducto}</strong></p>
                <p>Cantidad: ${producto.cantidadUnidades} unidades</p>
                <p>Inversion: $${inversion.toFixed(2)}</p>
                <p>Venta: $${venta.toFixed(2)}</p>
                <p>Ganancia: $${ganancia.toFixed(2)}</p>
                <p>Ganancia por unidad: $${gananciaPorUnidad.toFixed(2)} (${porcentajeDeGananciaPorUnidad}%)</p>
            </div>
        `;

        inversionTotal += inversion;
        ventaTotal += venta;
        gananciaTotal += ganancia;

    });

    const porcentajeDeGananciaTotal = ((gananciaTotal / inversionTotal) * 100).toFixed(2);

    resumenHTML += `
            <div>
                <h2 style="text-align: center;">Totales</h2>
                <p>Inversion total: $${inversionTotal.toFixed(2)}</p>
                <p>Venta total: $${ventaTotal.toFixed(2)}</p>
                <p>Ganancia total: $${gananciaTotal.toFixed(2)}</p>
                <p>Porcentaje de ganancia total: ${porcentajeDeGananciaTotal}%</p>
            </div>
            <div>
                <button class="editar-btn" onclick="editar()">Editar</button>
            </div>
            <div>
                <button class="img-btn" onclick="descargarResumen()">Descargar resumen</button>
            </div>
        `;

    document.getElementById('resumen').innerHTML = resumenHTML;
}


function editar() {
    document.getElementById('resumen').innerHTML = '';
    resumenDiv.style.display = 'none';
    formulario.style.display = 'flex';
    productosDiv.style.display = 'flex';
}
