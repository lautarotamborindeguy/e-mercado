//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    function muestraProductos(url){
        fetch(url)
       .then(response => response.json())
       .then(datos => {
            if(datos.id == localStorage.getItem("productId")){
                mostrarProducto(datos)
                obtenerProductoRel(datos.relatedProducts[0])
                obtenerProductoRel(datos.relatedProducts[1])
            }
        })
    }
    muestraProductos(PRODUCT_INFO_CHEVROLET)
    muestraProductos(PRODUCT_INFO_FIAT)
    muestraProductos(PRODUCT_INFO_SUSUKI)
    muestraProductos(PRODUCT_INFO_PEUGEOT)
    
    
    function muestraComentarios(url){
        fetch(url)
       .then(response => response.json())
       .then(datos => {
            document.getElementById("btnEnviarComentario").addEventListener("click", function(){
                agregarComentario(datos)
                mostrarComentarios(datos)
            })
            mostrarComentarios(datos)
            
        })
    }
    muestraComentarios(PRODUCT_INFO_COMMENTS_URL)
    
    function obtenerProductoRel(valor){
        fetch(PRODUCTS_URL)
        .then(promesa => promesa.json())
        .then(datos => {
            for (let i = 0; i < datos.length; i++) {
                if (datos.indexOf(datos[i]) === valor) {
                    mostrarProductoRel(datos[i])
                } 
            }
        })
    }
    
})

function agregarComentario(array){
    
        var comentarioUser = document.getElementById("inputComentarioUser").value 
        let puntajeUser = document.querySelector('[name="rating"]').value
        let usuario = localStorage.getItem("Nombre")
        
        var fechaComentario = new Date()
        var dia = fechaComentario.getDate();
        var mes = fechaComentario.getMonth() + 1;
        var anio = fechaComentario.getFullYear();
        var diaComentario = anio + '-' + mes + '-' + dia
        var horaComentario = fechaComentario.getHours() + ':' + fechaComentario.getMinutes() + ':' + fechaComentario.getSeconds()
        var fechaComentario = diaComentario + ' ' + horaComentario
        
       function infiltrarComentario(fecha, comentario, puntaje, usuario, array){
            let objeto = {
                score : Number(puntaje) ,
                description: comentario,
                user : usuario,
                dateTime: fecha
            }
            array.push(objeto)
        }
        infiltrarComentario(fechaComentario, comentarioUser, puntajeUser, usuario, array)   
}

function mostrarProducto(object){
        let data = document.getElementById("data");
        data.innerHTML += `
        <div>
            <div class="centrado tarjeta-producto border-bottom mb-4 mt-4">
                <div class="row w-100 m-2">
                    <div class="col-md-6">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100 carrousel-producto" src="`+ object.images[0] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100 carrousel-producto" src="`+ object.images[1] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100 carrousel-producto" src="`+ object.images[2] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100 carrousel-producto" src="`+ object.images[3] +`" alt="Imagen Auto">
                        </p>
                        </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a>
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex justify-content-between align-items-center titulo-producto"> 
                                <h2 class="mt-1 titulo-producto mr-4">
                                    `+ object.name +`
                                </h2>
                                
                            </div>
                            
                            <div class="font-weight-bold">
                                <div class="d-flex justify-content-between mt-3">
                                    <p class="mr-1">
                                        `+ object.cost +`
                                    </p>
                                    <p>
                                        `+ object.currency +`
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p class="mb-4 categoria-producto">
                           <strong> Categoria:   </strong>`+ object.category +`
                        </p>
                        <p class="descripcion-producto mb-4">
                            `+ object.description +`
                        </p>
                        <p class="cantidad-vendidos font-weight-light mt-2  position-relative">
                            <small>`+ object.soldCount +` Vendidos </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
}
function mostrarProductoRel(object){
    let data = document.getElementById("espProductosRelacionados");
    data.innerHTML += `
    <div>
            <div class="centrado border rounded tarjeta-producto mb-4 mt-4">
                <div class="row w-100 m-2">
                    <div class="col-md-4">
                        <img src="`+ object.imgSrc +`" alt="Imagen del objecto" class="imagen-objecto img-thumbnail">
                    </div>
                    <div class="col-md-8">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h2 class="mt-1">
                                `+ object.name +`
                            </h2>
                            <div class="d-flex justify-content-between font-weight-bold">
                                <p class="mr-1">
                                    `+ object.cost +`
                                </p>
                                <p>
                                    `+ object.currency +`
                                </p>
                            </div>
                        </div>
                        <p>
                            `+ object.description +`
                        </p>
                        <p class="cantidad-vendidos font-weight-light mt-2">
                            <small>`+ object.soldCount +` Vendidos </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
}

function mostrarComentarios(array){
    let espComentarios = document.getElementById("espComentarios")
    espComentarios.innerHTML =  ` `
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        puntajeEstrellasAct(element.score)
        puntajeEstrellasOut(element.score)
        
        espComentarios.innerHTML += `
        <div class="border-bottom mb-3" id="comentarios">
            <div id="espPuntaje"> 

            </div>
            <div class="d-flex justify-content-between ">
                <div>
                    <p><strong>`+ element.user +`</strong></p>
                </div>
                <p>`+ element.dateTime +`</p>
            </div>
            <p>`+ element.description +`</p>
        </div>
        `
        
    }
}
function puntajeEstrellasAct(puntaje){
    for (let i = 0; i < puntaje; i++) {
        espComentarios.innerHTML += `
        <label>
            <i class="active-comentarios fa fa-star"></i>
        </label>
        `
    }
}
function puntajeEstrellasOut(puntaje){
    let espComentarios = document.getElementById("espComentarios")
    for (let i = puntaje ; i < 5; i++) {
        espComentarios.innerHTML += `
        <label>
            <i class="fa fa-star"></i>
        </label>
        `
    }
}

