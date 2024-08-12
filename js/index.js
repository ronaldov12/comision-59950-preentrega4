// Le doy la bienvenida al usuario y lo invito a revisar mis productos
alert("Bienvenido a Stiilsed Kellad");
alert("Mira nuestros productos");

// Defino un array de productos con sus respectivas propiedades: id, nombre y precio
const productos = [
    { id: 1, nombre: "Reloj Tommy Hilfiger", precio: 359 },
    { id: 2, nombre: "Reloj Tissot Everytime Gent", precio: 549 },
    { id: 3, nombre: "Reloj Tissot Seastar", precio: 764 },
    { id: 4, nombre: "Reloj Swatch Ashbayang", precio: 130 }
];

// Función para mostrar los productos disponibles en la consola
function mostrarProductos() {
    console.log("Productos disponibles:");
    // Recorro el array de productos y muestro cada uno con su id, nombre y precio
    productos.forEach(producto => {
        console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}$`);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
    let carrito = [];  // Inicializo el carrito como un array vacío para que cada producto que seleccione el  usuario se cguarde aca
    let idIngresado;   // hice la variable idIngresado para detextar el  id ingresado por  el usuario

    mostrarProductos(); // Muestra los productos disponibles

    while (true) {
        // Solicito al usuario que ingrese el id del producto que desea agregar al carrito
        idIngresado = prompt("Ingrese un numero del 1 al 4 para agregar al carrito \n 1) Reloj Tommy Hilfiger 359$\n 2) Reloj Tissot Everytime Gent 549$ \n 3) Reloj Tissot Seastar 764$  \n 4)Reloj Swatch Ashbayang 130$ \n ingrese 'fin' si desea  finalizar la compra");
        // pongo el tolowercase  por si   el usuario ingresa la palabra en mayuscula o minuscula igual lo tome
        if (idIngresado.toLowerCase() === 'fin') break;// Si el usuario ingresa 'fin', termino el bucle

        // Convierto el id ingresado a un número porque el valor ingresado por el usuario es una cadena de texto y necesito un mumero para compararlo con los ids de los productos
        let id = parseInt(idIngresado);
        // Busco el producto correspondiente al id ingresado
        let productoElegido = productos.find(producto => producto.id === id);

        // Si el producto existe, lo agrego al carrito y lo informo en la consola
        if (productoElegido) {
            carrito.push(productoElegido);
            console.log("Producto agregado: " + productoElegido.nombre);
            // Si el producto no existe, muestro un mensaje de error en la consola
        } else {
            console.error("Este producto no existe. Inténtelo de nuevo.");
        }
    }
    // Retorno el carrito con los productos agregados
    return carrito;
}

// Función para calcular el total con IVA
function calcularTotalConIva(carrito) {
    const IVA = 0.21; // declaro una constante IVA con el valor de esta
    let total = carrito.reduce((contador, producto) => contador + producto.precio, 0)  // Sumo los precios de los productos seleccionados en el carrito 
    total = total + (total * IVA); // le agrego el IVA al total
    return total.toFixed(2); // Devolvemos el total con 2 decimales  
}

// Función para simular el pago con tarjeta de crédito
function simularPagoConTarjeta(montoTotal) {
    // Solicito al usuario que ingrese el número de su tarjeta de crédito
    let numeroTarjeta = prompt("Ingrese el número de su tarjeta de crédito (16 dígitos):")
    // Solicito al usuario que ingrese el codigo de seguridad (cvv)
    let cvv = prompt("Ingrese el código de seguridad (CVV, 3 dígitos):")
    // Solicito al usuario que ingrese la fecha de vencimiento de su tarjeta
    let vencimiento = prompt("ingrese la fecha de vencimiento (4 dígitos)")
    // Verifico si el número de la tarjeta tiene 16 dígitos, el CVV tiene 3 dígitos, y la fecha de vencimiento tiene 4 dígitos
    if (numeroTarjeta.length === 16 && cvv.length === 3 && vencimiento.length === 4) {
        // Si los datos son correctos, muestro un mensaje de éxito y confirmo que el pago se ha realizado
        alert(`Pago exitoso. Se ha debitado ${montoTotal}$ de su tarjeta.`)
        return true; // Devuelvo true para indicar que el pago fue exitoso
    } else {
        alert("Error en el pago. Verifique los datos e inténtelo de nuevo.")
        return false;  
    }

}

// Función para preguntar al usuario si desea pagar en cuotas
function pagarEnCuotas(total) {
    let respuesta = prompt("¿desea pagar en cuotas? si/no").toLowerCase();

    // verifico si la respuesta es si
    if (respuesta === "si") {
        let cuotas = parseInt(prompt("elija el numero de cuotas: 3, 6 o 12"));
        //valido a cuantas cuotas desea pagar
        if (cuotas === 3 || cuotas === 6 || cuotas === 12) {
            // calculo el monto total a cuotas
            let montoPorCuota = total / cuotas;
            alert(`El monto a pagar por cada cuota en ${cuotas} cuotas es: ${montoPorCuota.toFixed(2)}$`);
            // Llamo a la función que simula el pago con tarjeta, pasando el monto de la primera cuota
            let pagoExitoso = simularPagoConTarjeta(montoPorCuota.toFixed(2)); // Simula el pago de la primera cuota
             // Si el pago fue exitoso, muestro un mensaje de confirmación
            if (pagoExitoso) {
                alert("Pago de la primera cuota realizado exitosamente.");
            }
        } else {
            alert("Opción no válida. Elija entre 3, 6 o 12 cuotas.");
        }
    } else if (respuesta === 'no') {
        // Mostrar el total a pagar si no se elige pagar en cuotas
        alert(`El total a pagar es: ${total}$`);
    } else {
        // Mensaje de error si la respuesta no es si ni no
        alert("Opción no válida. Por favor ingrese 'si' o 'no'.");
    }
}

// Función principal para ejecutar el carrito de compras
function carritoDeCompras() {
    carrito = agregarAlCarrito(); // Agregar productos al carrito
    let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0); // Calcular el total
    let montoPorCuota = pagarEnCuotas(total); // Preguntar si el usuario quiere pagar en cuotas
    console.log("Carrito final:", carrito); // Mostrar el carrito final en la consola
    console.log("Total a pagar (con IVA):", total); // Mostrar el total con iva en la consola
}
carritoDeCompras();
// Ejecutar la función principal