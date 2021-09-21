//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    function cargarDatos(url) {  
        document.getElementById("data").innerHTML = "";    
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => { 
                agregarId(datos)
                mostrarProductos(datos, 0)
            })
        .catch(error => alert("Hubo un error: " + error));
    } 
    cargarDatos(PRODUCTS_URL)
    
    document.getElementById("btnFiltrarPrecios").addEventListener("click", function(){
        function mostrarProductosFiltrados(url){
            document.getElementById("data").innerHTML = "";
            fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                agregarId(datos)
                let productosFiltrados = filtrarProductos(datos)
                mostrarProductos(productosFiltrados, 0)
            })
        }
        mostrarProductosFiltrados(PRODUCTS_URL)
    })  
    
    
    
    document.getElementById("sortAscPrecios").addEventListener("click", function(){
        function productosOrdenDescPrecio (url){
            fetch(url)
            .then(promesa => promesa.json())
            .then(datos => {
                agregarId(datos)
                let data = document.getElementById("data");
                data.innerHTML = " "
                let productosFiltrados = filtrarProductos(datos)
                mostrarProductos(productosFiltrados, 1)
            })
        }
        productosOrdenDescPrecio(PRODUCTS_URL)
    })

    document.getElementById("sortDescPrecios").addEventListener("click", function(){
        function productosOrdenDescPrecio (url){
            fetch(url)
            .then(promesa => promesa.json())
            .then(datos => {
                agregarId(datos)
                let data = document.getElementById("data");
                data.innerHTML = " "
                let productosFiltrados = filtrarProductos(datos)
                mostrarProductos(productosFiltrados, 2)
            })
        }
        productosOrdenDescPrecio(PRODUCTS_URL)
    })
    
    document.getElementById("sortDescRelev").addEventListener("click", function(){
        function productosOrdenDescPrecio (url){
            fetch(url)
            .then(promesa => promesa.json())
            .then(datos => {
                agregarId(datos)
                let data = document.getElementById("data");
                data.innerHTML = " "
                let productosFiltrados = filtrarProductos(datos)
                mostrarProductos(productosFiltrados, 3)
            })
        }
        productosOrdenDescPrecio(PRODUCTS_URL)
    })

    document.getElementById("btnLimpiarFiltros").addEventListener("click", function(){
        limpiarFiltros()
        cargarDatos(PRODUCTS_URL)
    })

    
    
});
function agregarId(array){
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.id = [i]
    }
}
function filtrarProductos(array){
    var precioMinUsuario = document.getElementById("inputPrecioMin").value
    var precioMaxUsuario = document.getElementById("inputPrecioMax").value

    if ((precioMinUsuario != undefined) && (precioMinUsuario != "") && (parseInt(precioMinUsuario)) >= 0) {
        precioMinUsuario = parseInt(precioMinUsuario)
    } else {
        precioMinUsuario = undefined
    }

    if ((precioMaxUsuario != undefined) && (precioMaxUsuario != "") && (parseInt(precioMaxUsuario)) >= 0) {
        precioMaxUsuario = parseInt(precioMaxUsuario)
    } else {
        precioMaxUsuario = undefined
    }


    const productosFiltrados = array.filter(producto => ((precioMinUsuario == undefined) || (precioMinUsuario != undefined && precioMinUsuario <= producto.cost)) && ((precioMaxUsuario == undefined) || (precioMaxUsuario != undefined && precioMaxUsuario >= producto.cost)))
    
    return(productosFiltrados)         
}

function mostrarProductos(array, criterio){
    sortProductos(criterio, array)
    for (i = 0; i< array.length; i++ ) {                   
        let data = document.getElementById("data");
        let product = array[i]
        data.innerHTML += `
        <div>
            <div class="centrado border rounded tarjeta-producto mb-4 mt-4">
                <div class="row w-100 m-2">
                    <div class="col-md-4">
                        <img src="`+ product.imgSrc +`" alt="Imagen del Producto" class="imagen-producto img-thumbnail">
                    </div>
                    <div class="col-md-8">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h2 class="mt-1">
                                `+ product.name +`
                            </h2>
                            <div class="d-flex justify-content-between font-weight-bold">
                                <p class="mr-1">
                                    `+ product.cost +`
                                </p>
                                <p>
                                    `+ product.currency +`
                                </p>
                            </div>
                        </div>
                        <p>
                            `+ product.description +`
                        </p>
                        <p class="cantidad-vendidos font-weight-light mt-2">
                            <small>`+ product.soldCount +` Vendidos </small>
                        </p>
                        <button id="btnVerLibros" type="button" class="btn btn-success float-right" onclick="verLibro('`+ product.id +`')">Ver Auto</button>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
function verLibro(id) {
    localStorage.setItem('productId', id)
    window.location = "product-info.html"
}
function limpiarFiltros(){
    document.getElementById("inputPrecioMin").value = " "
    document.getElementById("inputPrecioMax").value = " "
    document.getElementById("data").innerHTML = " "
}
function sortProductos(criterio, array){
    if (criterio === 1) {
        result = array.sort(
            function(a,b) {
                if (a.cost < b.cost) {return -1;}
                if (a.cost > b.cost) {return 1;}
                return 0;
            }
        )
    } else if (criterio === 2){
        result = array.sort(
            function (a, b){
                if(a.cost > b.cost) {return -1;}
                if(a.cost < b.cost) {return 1;}
                return 0;
            }
        )
    } else if (criterio === 3){
        result = array.sort(
            function (a, b){
                if (a.soldCount > b.soldCount) {return -1;}
                if (a.soldCount < b.soldCount) {return 1;}
                return 0;
            }
        )
    } else { 
        result = array.sort(
            function (){
                return 0
            }
        )
    }
}



