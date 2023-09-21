import { info } from "sass"
import Swal from "sweetalert2"

const carritoLista = document.querySelector('#carrito tbody')
// console.log(carritoLista)

// añadir producto al carrito
export function comprarProducto(e) {
    e.preventDefault() // Detiene el comportamiento por defecto
    console.log(e.target) 
    if(e.target.classList.contains('agregar-carrito')){ // Valido que estes presionando el boton comprar
        // console.log('Hiciste click sobre el boton')
        const producto = e.target.parentElement.parentElement.parentElement
        leerDatosProducto(producto)
    }
}


// Leer datos del producto
function leerDatosProducto(producto){

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        color: producto.querySelector('.color').textContent,
        id: producto.querySelector('a').getAttribute('data'),
        cantidad: 1
    }
    console.log(infoProducto)

    let productosLS 
    productosLS = obtenerProductosLocalStorage() // Devuelve un []

    /* Fijarme si el producto ya fue agregado al localStorage */
    productosLS.forEach(function(productoLS) {
        if(productoLS.id === infoProducto.id) {
            productosLS = productoLS.id
        }
    });

    if(productosLS === infoProducto.id){
        console.warn('El producto ya esta en el carrito');
    }
    else{
        insertarCarrito(infoProducto)
    }
}

// Comprobar si hay elementos en el LS
function  obtenerProductosLocalStorage() {
    let productosLS // Creo nuevamente la variable por el scope
    // Comprobar si hay algo en el LS (Local Storage)
    if( localStorage.getItem('productos')  === null) { // Si no existe,se le asigna un array vacio
        productosLS = []
    }
    else { // Si existe, guardo la informacion que llega del local storage en la variable productosLS
        productosLS = JSON.parse(localStorage.getItem('productos'))
    }
    return productosLS // retorna la variable al scope global
}

// Muestra en el carrito un nuevo producto, osea agrega al tbody una fila
function insertarCarrito(producto) {
    const row = document.createElement('tr')
    // Estructura del carrito
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100"
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto bi bi-x-circle" data-id="${producto.id}" ></a>
        </td>
    `
    // appendchild para agregar el elemento creado en JS al DOM
    carritoLista.appendChild(row)
    guardarProductosLocalStorage(producto)

}

// Almacena el producto en el LocalStorage 

function guardarProductosLocalStorage(producto) {
    let productos

    // Toma valor de un array con datos del LS
    productos = obtenerProductosLocalStorage()

    // Agrego el producto al carrito
    productos.push(producto)

    // Persisto la información en el LS
    localStorage.setItem('productos', JSON.stringify(productos))
}

export function leerLocalStorage(){
    let productosLS
    productosLS = obtenerProductosLocalStorage() // me trae la informacion de los productos 
    productosLS.forEach( function(producto) {
        const row = document.createElement('tr')
    // Estructura del carrito
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100"
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto bi bi-x-circle" data-id="${producto.id}" ></a>
        </td>
    `
    // appendchild para agregar el elemento creado en JS al DOM
    carritoLista.appendChild(row)
    })
}

export function eliminarProducto(e) {
    // console.log(e.target)
    e.preventDefault()

    let producto, productoID
    if( e.target.classList.contains('borrar-producto')){
        console.warn('Hicieron click sobre el circulo borrado')
        producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')

        producto.remove()
        eliminarProductoLocalStorage(productoID)

    }
}

function eliminarProductoLocalStorage(id) {
    let productosLS 
    // Obtenemos el array de productos
    productosLS = obtenerProductosLocalStorage()
    // Comparamos el ID del producto borrado con el LocalStorage
    productosLS.forEach( function(productoLS, index){
        // si el id del producto es igual al id que viene por parametro...
        if (productoLS.id === id) {
            productosLS.splice(index, 1) // Le paso el indice y la cantidad que quiero borrar
        }
    })

    // Array sin el elemento eliminado
    localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {

    e.preventDefault()
    // ¿Hay un primer elemento? => if true...
    while(carritoLista.firstChild) {
        carritoLista.removeChild(carritoLista.firstChild)
    }
    vaciarLocalStorage()
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}

export function procesarPedido(e) {

    e.preventDefault()
    let array = obtenerProductosLocalStorage()

    if( array.length === 0) {
        console.warn('el carrito esta vacío');
        Swal.fire(
            'No hay productos en el carrito!',
            'Carrito Vacío',
            'error'
          )
    } else{
        location.href = 'pages/carrito.html'
    }
}


// Leer localStorageCompra para obtener los productos
export function leerLocalStorageCompra(){
    const listaCompra = document.querySelector('#lista-compra')
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach( function(producto){
        const div = document.createElement('div')
        div.classList.add('row', 'py-3', 'mb-3')
        div.innerHTML = `
        
        <div class="col-4 mb-1">
                    <!-- imagen -->
                    <div class="bg-image rounded">
                        <img class="w-100" src="${producto.imagen}" alt="${producto.titulo}">
                    </div>
                    </div>
                    <div class="col-6">
                    <p><strong>${producto.titulo}</strong></p>
                    <p>${producto.color}</p>
                    <p>Caracteristicas</p>
                    <p>Precio</p>

                    <a data-id=${producto.id} class="btn-sm me-1 mb-2 borrar-producto-compra bi bi-trash-fill text-danger"></a>
                    
                    </div>
                    <div class="col-2">
                    <input type="number" min="1" class="form-control text-center cantidad" placeholder="Cantidad" value="${producto.cantidad}" >
                    <p class="text-center mt-4">
                        <strong class="precio">${producto.precio * producto.cantidad}</strong>
                    </p>
                </div>

        `
        listaCompra.appendChild(div)

    })
}

export function eliminarProductoCompra(e) {
    
    e.preventDefault()
    let productoID
    if( e.target.classList.contains('borrar-producto-compra')){
        e.target.parentElement.parentElement.remove()
        let producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')
    }
    eliminarProductoLocalStorage(productoID)
    calcularTotal()
}

export function obtenerEventos(e) {
    e.preventDefault()
    const { target } = e // Desestructuro el objeto e 
    // console.log(e.target)
    let producto, id, cantidad, productosLS
    if( target.classList.contains('cantidad')) {
        // console.log('cambio el input')
       producto = target.parentElement.parentElement
       id = producto.querySelector('a').getAttribute('data-id') // selecciono y guardo el id
        cantidad = producto.querySelector('input').value // obtengo la cantidad de veces que el usuario selecciono para comprar
        //console.log(id, cantidad)

        let precio = producto.querySelector('.precio')
        productosLS = obtenerProductosLocalStorage() // obtengo el array que contiene a los productos
        productosLS.forEach(function (productoLS, index){
            if(productoLS.id === id){ // Si el id que obtengo del producto matchea, entonces...
                productoLS.cantidad = cantidad

                let total = Number(productoLS.cantidad * Number(productoLS.precio))
                precio.textContent = total.toFixed(2) // Le indico que solo quiero hasta 2 decimales
            } 
        })
        localStorage.setItem('productos', JSON.stringify(productosLS))
        calcularTotal()
    }
}


// Calcular el total del carrito

export function calcularTotal(){
    //Declaro variables globales dentro del scope de la funcion
    let productosLS
    let total = 0, subtotal = 0, impuestos = 0
    productosLS = obtenerProductosLocalStorage() // aca tengo toda la data del localStorage

    productosLS.forEach( productoLS =>{
        let totalProducto = Number(productoLS.cantidad * productoLS.precio)
        total = total + totalProducto // se va sumando segun la iteracion del forEach
    })

    console.log(total)
    impuestos = parseFloat(total * 0.18).toFixed(2)
    subtotal = parseFloat(total - impuestos).toFixed(2)

    document.querySelector('#total').textContent = total.toFixed(2)
    document.querySelector('#iva').textContent = impuestos
    document.querySelector('#sub-total').textContent = subtotal
}