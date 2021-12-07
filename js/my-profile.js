//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    function mostrarFormulario(){
        if (localStorage.getItem('datosPersonales') === null) {
            document.getElementById("formularioIngresoDatos").classList.remove("d-none")
            document.getElementById("espDatosPersonalesUs").classList.add("d-none")
        } else {
            document.getElementById("formularioIngresoDatos").classList.add("d-none")
            document.getElementById("espDatosPersonalesUs").classList.remove("d-none")
        }
    }
    mostrarFormulario()
    
    document.getElementById("btnGuardarDatos").addEventListener("click", function() {
        function datosPersonales(){
            let nombreUs = document.getElementById("inputNombre").value;
            let apellidosUs = document.getElementById("inputApellidos").value;
            let edadUs = document.getElementById("inputEdad").value;
            let emailUs = document.getElementById("inputEmail").value;
            let contactoUs = document.getElementById("inputContacto").value
            
            let datosPersonales = {
                nombre: nombreUs,
                apellidos: apellidosUs,
                edad: edadUs,
                email: emailUs,
                telefono: contactoUs
            }
        
            localStorage.setItem('datosPersonales', JSON.stringify(datosPersonales))
        }
        datosPersonales()
    })
    document.getElementById("btnModificarDatos").addEventListener("click", function(){
        document.getElementById("formularioIngresoDatos").classList.remove("d-none")
        document.getElementById("espDatosPersonalesUs").classList.add("d-none")
        
        let objetoDatosPersonales = localStorage.getItem('datosPersonales')
        let objetoDatosPersonalesConvertido = JSON.parse(objetoDatosPersonales)

        document.getElementById("inputNombre").value = objetoDatosPersonalesConvertido.nombre
        document.getElementById("inputApellidos").value = objetoDatosPersonalesConvertido.apellidos
        document.getElementById("inputEdad").value = objetoDatosPersonalesConvertido.edad
        document.getElementById("inputEmail").value = objetoDatosPersonalesConvertido.email
        document.getElementById("inputContacto").value = objetoDatosPersonalesConvertido.telefono

    })
    document.getElementById("btnEliminarDatos").addEventListener("click", function(){
        localStorage.removeItem('datosPersonales')
    })
});

function mostrarDatosPersonales(){
    let objetoDatosPersonales = localStorage.getItem('datosPersonales')
    let objetoDatosPersonalesConvertido = JSON.parse(objetoDatosPersonales)
    
    document.getElementById("espNombreUs").innerHTML = objetoDatosPersonalesConvertido.nombre
    document.getElementById("espApellidosUs").innerHTML = objetoDatosPersonalesConvertido.apellidos
    document.getElementById("espEdadUs").innerHTML = objetoDatosPersonalesConvertido.edad
    document.getElementById("espEmailUs").innerHTML = objetoDatosPersonalesConvertido.email
    document.getElementById("espContactoUs").innerHTML = objetoDatosPersonalesConvertido.telefono
}
mostrarDatosPersonales()