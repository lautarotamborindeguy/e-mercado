//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        
    function muestraProductos(url){
        fetch(url)
       .then(response => response.json())
       .then(datos => {
           console.log(datos.id)
            if(datos.id == localStorage.getItem("productId")){
                mostrarProducto(datos)
            }
        })
    }
    muestraProductos(PRODUCT_INFO_CHEVROLET)

    function muestraComentarios(url){
        fetch(url)
       .then(response => response.json())
       .then(datos => {
           for (let i = 0; i < datos.length; i++) {
               const comentario = datos[i];
               mostrarComentarios(comentario)
           }
        })
    }
    muestraComentarios(PRODUCT_INFO_COMMENTS_URL)
    
       
})
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
                            <img class="d-block w-100" src="`+ object.images[0] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="`+ object.images[1] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="`+ object.images[2] +`" alt="Imagen Auto">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="`+ object.images[3] +`" alt="Imagen Auto">
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

function mostrarComentarios(object){
    let espComentarios = document.getElementById("espComentarios")
    
    espComentarios.innerHTML += `
    <div class="border-bottom mb-3">
        <p>Puntaje: `+ object.score +`</p>
        <div class="d-flex justify-content-between ">
            <div>
                <p><strong>`+ object.user +`</strong></p>
            </div>
            <p>`+ object.dateTime +`</p>
        </div>
        <p>`+ object.description +`</p>
    </div>
    `
}

