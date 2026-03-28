const Auth = {

    login(username, password) {

        const users = Storage.getUsers();

        const userFound = users.find(user =>
            user.nameuser === username && user.password_user === password
        );

        if (!userFound) {
            return {
                success: false,
                message: "Usuario o contraseña incorrectos."

            };
        }

        Storage.setCurrentUser(userFound);

        return {
            success: true,
            user: userFound
        };
    }
};