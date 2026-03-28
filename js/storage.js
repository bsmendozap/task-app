const Storage = {
    initUsers() {
        const users = JSON.parse(localStorage.getItem("users"));

        if (!users) {
            const defaultUsers = [
                { id_user: 1, nameuser: "User 1", password_user: "prueba1", role: "Administrador" },
                { id_user: 2, nameuser: "User 2", password_user: "prueba2", role: "Usuario_normal" },
                { id_user: 3, nameuser: "User 3", password_user: "prueba3", role: "Usuario_normal" }
            ];

            localStorage.setItem("users", JSON.stringify(defaultUsers));
        }
    },

    initTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));

        if (!tasks) {
            const defaultTasks = [
                {
                    id_task: 1,
                    title: "Revisar reporte",
                    state: "Pendiente",
                    creation_date: "2026-03-27",
                    expiration_date: "2026-03-29",
                    user_id: 2
                },
                {
                    id_task: 2,
                    title: "Actualizar documentación",
                    state: "Completada",
                    creation_date: "2026-03-27",
                    expiration_date: "2026-03-30",
                    user_id: 1
                },
                {
                    id_task: 3,
                    title: "Preparar reunión",
                    state: "Pendiente",
                    creation_date: "2026-03-20",
                    expiration_date: "2026-03-24",
                    user_id: 2
                }
            ];

            localStorage.setItem("tasks", JSON.stringify(defaultTasks));
        }
    },

    getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    },

    getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    },

    saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },

    setCurrentUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser")) || null;
    },

    clearCurrentUser() {
        localStorage.removeItem("currentUser");
    }
}