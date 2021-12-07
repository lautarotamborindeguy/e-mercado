//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    function obtenerCarrito(url){
        fetch(url)
        .then(response => response.json())
        .then(datos => {
            mostrarCarrito(datos.articles)
            
        })
        subTotal()
    }
    obtenerCarrito(CART_INFO_URL2)
})
function subTotal(){
    fetch(CART_INFO_URL2)
    .then(response => response.json())
    .then(datos => {
        cuenta(datos.articles)
        costoEnvio()
        totalAPagar()
    })
    
}
function cuenta(array){
    var subTotalCarrito = 0;
    for (i = 0; i < array.length; i++) {
        let product = array[i];

        let cantidadProductos = document.getElementById(`inputNumber`+ i +``).value
        let costoProductoUnidad = product.unitCost;
        let totalProducto = cantidadProductos * costoProductoUnidad
        
        document.getElementById(`costoProducto`+ i +``).innerHTML = totalProducto; 

        if (product.currency === "USD") {
            var subTotalCarrito = subTotalCarrito + totalProducto * 40
        } else {
            var subTotalCarrito = subTotalCarrito + totalProducto
        }
    }
    document.getElementById("costoSubTotalUYU").innerHTML = subTotalCarrito;
    document.getElementById("costoSubtotalUSD").innerHTML = subTotalCarrito / 40;
    
}
function costoEnvio(){  
    let subTotalCarrito = parseInt(document.getElementById("costoSubTotalUYU").innerHTML)

    let selectMetodoEnvio = document.getElementById("inputMetodoEnvio").value
    
    let costoEnvioPremium = Math.round(subTotalCarrito * 0.15);
    let costoEnvioExpress = Math.round(subTotalCarrito * 0.07);
    let costoEnvioStandard = Math.round(subTotalCarrito * 0.05);
    
    let costoEnvioPremiumUSD = Math.round(subTotalCarrito * 0.15) / 40;
    let costoEnvioExpressUSD = Math.round(subTotalCarrito * 0.07) / 40;
    let costoEnvioStandardUSD = Math.round(subTotalCarrito * 0.05) / 40;

    let espCostoEnvioUSD = document.getElementById("espCostoEnvioUSD")

    if (selectMetodoEnvio === "Premium") {
        espCostoEnvio.innerHTML = costoEnvioPremium;
    } else if (selectMetodoEnvio === "Express"){
        espCostoEnvio.innerHTML = costoEnvioExpress;
    } else {
        espCostoEnvio.innerHTML = costoEnvioStandard;
    } 

    if (selectMetodoEnvio === "Premium") {
        espCostoEnvioUSD.innerHTML = costoEnvioPremiumUSD;
    } else if (selectMetodoEnvio === "Express"){
        espCostoEnvioUSD.innerHTML = costoEnvioExpressUSD;
    } else {
        espCostoEnvioUSD.innerHTML = costoEnvioStandardUSD;
    } 
    totalAPagar()
}
function totalAPagar(){
    let subTotal = parseInt(document.getElementById("costoSubTotalUYU").innerText);
    let costoEnvio = parseInt(document.getElementById("espCostoEnvio").innerText) 
    
    let costoTotal = subTotal + costoEnvio
    let costoTotalUSD = (subTotal + costoEnvio) / 40

    let espCostoTotal = document.getElementById("espCostoTotal")
    let espCostoTotalUSD = document.getElementById("espCostoTotalUSD")

    espCostoTotal.innerHTML = costoTotal
    espCostoTotalUSD.innerHTML = costoTotalUSD
}
function mostrarCarrito(array){
    for (i = 0; i< array.length; i++) {                   
        let espCarrito = document.getElementById("espCarrito");
        let product = array[i];
        if (product.currency === "USD") {
            var subtotalCarrito = subtotalCarrito + (product.unitCost * product.count) * 40;
        } else {
            var subtotalCarrito = subtotalCarrito + (product.unitCost * product.count);
        }
        espCarrito.innerHTML += `
        <div>
            <div class="mt-4 border-bottom container-fluid">
                <div class="row p-2 elemento-carrito">
                    <div class="col-md-2 p-0 float-left">
                        <img src="`+ product.src +`" alt="Imagen del Producto" class="imagen-producto-carrito">
                    </div>
                    <div class="col-md-6">
                        <h3 class="mt-1 text-left nombre-producto-carrito">
                            `+ product.name +`
                        </h3>
                    </div>
                    <div class="col-md-4 d-flex justify-content-around">
                        <div>
                            <input type="number" min="1" id="inputNumber`+ i +`" value="`+ product.count +`" class="mb-2 input-cantProductos" onchange="subTotal()">
                        </div>
                        <div class="text-center">
                            <div class="d-flex mr-3">
                                <p id="costoProducto`+ i +`">
                                    `+ product.unitCost +`
                                </p>
                                <p>
                                    `+ product.currency +`
                                </p>
                            </div>   
                                <p><small id="costoProductoUnidad`+ i +`">`+ product.unitCost +`c/u<small></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
function metodoDePago(){
    if (document.getElementById("inputMetodoPago").value === "Bancaria") {
        document.getElementById("pagoBancaria").classList.remove("d-none")
        document.getElementById("pagoTarjeta").classList.add("d-none")
    } else {
        document.getElementById("pagoTarjeta").classList.remove("d-none")
        document.getElementById("pagoBancaria").classList.add("d-none")
    }
}
function validacionFormulario(){
    let camposCompletos = true;
    
    if (document.getElementById("inputAddress").value === "") {
        camposCompletos = false;
    }
    if (document.getElementById("inputNumCasa").value === "") {
        camposCompletos = false;
    }
    if (document.getElementById("inputEsq").value === "") {
        camposCompletos = false;
    }
    if (document.getElementById("inputCity").value === "") {
        camposCompletos = false;
    }
    if (document.getElementById("inputState").value === "") {
        camposCompletos = false;
    }
    if (document.getElementById("inputCountry").value === "") {
        camposCompletos = false;
    }

    if (document.getElementById("inputMetodoPago").value === "Bancaria") {
        if (document.getElementById("numCuenta").value === "") {
            camposCompletos = false;
        }
    } else {
        if (document.getElementById("numTarjeta").value === "") {
            camposCompletos = false;
        }
        if (document.getElementById("codigoTarjeta").value === "") {
            camposCompletos = false;
        }
        if (document.getElementById("vencimientoTarjeta").value === "") {
            camposCompletos = false;
        }
    }

    if (camposCompletos === true) {
        compraRealizada()
        setTimeout(function() {
            quitarAlertCompraRealizada();
        },3000);
    } else {
        debeCompletarCampos()
        setTimeout(function() {
            quitarDebeCompletarCampos();
        },3000);
    }
}
function compraRealizada(){
    document.getElementById("alertCompraRealizada").classList.remove("d-none")
}

function quitarAlertCompraRealizada(){
    document.getElementById("alertCompraRealizada").classList.add("d-none")
}

function debeCompletarCampos(){
    document.getElementById("alertDebeCompletarCampos").classList.remove("d-none")
}
function quitarDebeCompletarCampos(){
    document.getElementById("alertDebeCompletarCampos").classList.add("d-none")
}