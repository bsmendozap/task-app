document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado");
    Storage.initUsers();

    const loginBtn = document.getElementById("login-btn");
    const loginMessage = document.getElementById("login-message");

    loginBtn.addEventListener("click", () => {
        console.log("Click detectado");
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if(!username || !password){
            loginMessage.textContent = "Debe ingresar usuario y contraseña.";
            return; 
        }

        const result = Auth.login(username, password);

        if(!result.success){
            loginMessage.textContent = result.message;
            return;
        }

        loginMessage.style.color = "green";
        loginMessage.textContent = `Bienvenido ${result.user.nameuser}`;

    })
})