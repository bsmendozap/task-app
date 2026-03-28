const Storage = {
    initUsers() {
        const users = JSON.parse(localStorage.getItem("users"));

        if(!users){
            const defaultUsers = [
                {id_user: 1, nameuser: "User 1", password_user: "prueba1", role: "Administrador"},
                {id_user: 1, nameuser: "User 1", password_user: "prueba1", role: "Usuario_normal"},
            ];

            localStorage.setItem("users", JSON.stringify(defaultUsers));

        }
    },
    

    getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    },

    setCurrentUser(user){
        localStorage.setItem("currentUser", JSON.stringify(user));
    },

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("currentUser")) || null;
    }

}