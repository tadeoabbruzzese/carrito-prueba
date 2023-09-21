import { comprarProducto } from './src/carrito'
import { leerLocalStorage } from './src/carrito'
import {eliminarProducto} from './src/carrito'
import {vaciarCarrito} from './src/carrito'
import {procesarPedido} from './src/carrito'
import {leerLocalStorageCompra} from './src/carrito'
import {eliminarProductoCompra} from './src/carrito'
import {obtenerEventos} from './src/carrito'
import {calcularTotal} from './src/carrito'
import './styles.css'
import * as bootstrap from 'bootstrap'

/* ---------------------------------- */
/* Comprar producto
/* ---------------------------------- */

const carrito = document.getElementById('carrito')
const productos = document.getElementById('lista-productos')
console.log(carrito, productos)

cargarEventos()

function cargarEventos() {

    const ruta = String(location.href)
    console.log(ruta)

    if ( !ruta.includes('carrito.html')){
        console.warn('Estoy en index.html');
        esIndex()
    }
    else{
        console.warn('Estoy en carrito.html');
        esCarrito()
    }

    
}


function esIndex() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-carrito')

    // Se ejecuta cuando presiono sobre el click boton comprar de cada producto
    productos.addEventListener('click', e => comprarProducto(e)) // cuando se haga click en productos, ejecuta una funcion

    // Al cargar el documento se muestra lo almacenado en el LS
    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    // Cuando se elimina un producto del carrito
    carrito.addEventListener('click', e => eliminarProducto(e))

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

    // Enviar pedido a la página carrito.html
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}

function esCarrito() {

    const carritoCompra = document.querySelector('#lista-compra')
    // Leer el localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())

    // Borrar producto cuando estoy en el carrito.html
    carritoCompra.addEventListener('click', e => eliminarProductoCompra(e))

    calcularTotal()

    carritoCompra.addEventListener('change', e => obtenerEventos(e))
    carritoCompra.addEventListener('keyup', e => obtenerEventos(e))
}