document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnIngresarMercado").addEventListener("click", function() {
        let inputUser = document.getElementById("inputUser");
        let inputPassword = document.getElementById("inputPassword");
        
        inputUser.classList.remove("bg-danger")
        inputPassword.classList.remove("bg-danger")

        if (inputUser.value === "") {
            inputUser.classList.add("bg-danger")
            document.getElementById("alertNoLogin").innerHTML = `
            <p class="text-center alert alert-danger">
                Porfavor, complete todos los campos necesarios para iniciar sesión!
            </p>`
        } else if (inputPassword.value === "") {
            inputPassword.classList.add("bg-danger")
            document.getElementById("alertNoLogin").innerHTML = `
            <p class="text-center alert alert-danger">
                Porfavor, complete todos los campos necesarios para iniciar sesión!
            </p>`
        } else {
            inputUser.classList.add("bg-success")
            inputPassword.classList.add("bg-success")

            localStorage.setItem("Nombre", inputUser.value);
            
            window.location = "inicio.html"
        }
    })
})