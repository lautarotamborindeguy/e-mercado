//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    function cargarDatos(url) {      
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => { 
                for (i = 0; i< datos.length; i++ ) {                    
                    let data = document.getElementById("data");
                    data.innerHTML += `
                    <div class="container">
                        <div class="centrado border rounded tarjeta-producto mb-4 mt-4">
                            <div class="row w-100 m-2">
                                <div class="col-md-4">
                                    <img src="`+ datos[i].imgSrc +`" alt="Imagen del Producto" class="imagen-producto img-thumbnail">
                                </div>
                                <div class="col-md-8">
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <h2 class="mt-2 mb-3">
                                            `+ datos[i].name +`
                                        </h2>
                                        <div class="d-flex justify-content-between font-weight-bold">
                                            <p class="mr-1">
                                                `+ datos[i].cost +`
                                            </p>
                                            <p>
                                                `+ datos[i].currency +`
                                            </p>
                                        </div>
                                    </div>
                                    <p class="mb-3">
                                        `+ datos[i].description +`
                                    </p>
                                    <p class="cantidad-vendidos font-weight-light">
                                        <small>`+ datos[i].soldCount +` Vendidos </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
            })
        .catch(error => alert("Hubo un error: " + error));
    } 
    cargarDatos(PRODUCTS_URL) 
});
