const Storage = {

    //Carga de Data de usuarios
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

    //Carga de data de las tareas
    initTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));

        if (!tasks || tasks.length === 0) {
            const defaultTasks = [
                {
                    id_task: 1,
                    title: "Revisar reporte financiero",
                    state: "Pendiente",
                    creation_date: "2026-03-27",
                    expiration_date: "2026-03-30",
                    user_id: 2
                },
                {
                    id_task: 2,
                    title: "Actualizar documentación del sistema",
                    state: "Completada",
                    creation_date: "2026-03-25",
                    expiration_date: "2026-03-28",
                    user_id: 2
                },
                {
                    id_task: 3,
                    title: "Preparar reunión con clientes",
                    state: "Pendiente",
                    creation_date: "2026-03-20",
                    expiration_date: "2026-03-24",
                    user_id: 2
                },
                {
                    id_task: 4,
                    title: "Corregir errores de login",
                    state: "Pendiente",
                    creation_date: "2026-03-26",
                    expiration_date: "2026-03-29",
                    user_id: 3
                },
                {
                    id_task: 5,
                    title: "Implementar filtros de tareas",
                    state: "Completada",
                    creation_date: "2026-03-22",
                    expiration_date: "2026-03-26",
                    user_id: 3
                },
                {
                    id_task: 6,
                    title: "Optimizar vista móvil",
                    state: "Pendiente",
                    creation_date: "2026-03-18",
                    expiration_date: "2026-03-21",
                    user_id: 3
                },
                {
                    id_task: 7,
                    title: "Diseñar formulario de usuarios",
                    state: "Pendiente",
                    creation_date: "2026-03-28",
                    expiration_date: "2026-04-02",
                    user_id: 1
                },
                {
                    id_task: 8,
                    title: "Revisar permisos de administrador",
                    state: "Completada",
                    creation_date: "2026-03-19",
                    expiration_date: "2026-03-23",
                    user_id: 1
                },
                {
                    id_task: 9,
                    title: "Validar fechas de vencimiento",
                    state: "Pendiente",
                    creation_date: "2026-03-21",
                    expiration_date: "2026-03-22",
                    user_id: 1
                },
                {
                    id_task: 10,
                    title: "Crear módulo de estadísticas",
                    state: "Pendiente",
                    creation_date: "2026-03-28",
                    expiration_date: "2026-04-05",
                    user_id: 2
                },
                {
                    id_task: 11,
                    title: "Probar reasignación de tareas",
                    state: "Pendiente",
                    creation_date: "2026-03-23",
                    expiration_date: "2026-03-27",
                    user_id: 3
                },
                {
                    id_task: 12,
                    title: "Ajustar estilos del dashboard",
                    state: "Completada",
                    creation_date: "2026-03-24",
                    expiration_date: "2026-03-29",
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