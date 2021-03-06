const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_CHEVROLET = "https://lautarotamborindeguy.github.io/e-mercado/json/chevrolet.json"
const PRODUCT_INFO_FIAT = "https://lautarotamborindeguy.github.io/e-mercado/json/fiat.json"
const PRODUCT_INFO_PEUGEOT = "https://lautarotamborindeguy.github.io/e-mercado/json/peugeot.json"
const PRODUCT_INFO_SUSUKI = "https://lautarotamborindeguy.github.io/e-mercado/json/susuki.json"
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
  let nombreUsuario = localStorage.getItem("Nombre");
  let mostrarUser = document.getElementById("mostrarUser");
  
  mostrarUser.innerHTML = mostrarUser.innerHTML + nombreUsuario
  
  if(document.getElementById("btnSalir")){
    if(nombreUsuario === undefined || nombreUsuario === null){
      window.location = "index.html"
    }
    document.getElementById("btnSalir").addEventListener("click", function(){
      localStorage.removeItem("Nombre");  
      window.location = "index.html"
    })
    document.getElementById("btnIngresarPerfil").addEventListener("click", function(){
      window.location = "my-profile.html"
    })
    document.getElementById("btnIngresarCarrito").addEventListener("click", function(){
      window.location = "cart.html"
    })
  }
});

