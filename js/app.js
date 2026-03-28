const App = {
    // Inicializacion la aplicación:
    init() {
        Storage.initUsers();
        Storage.initTasks();

        const currentUser = Auth.getCurrentUser();

        if (currentUser) {
            if (currentUser.role === "Administrador") {
                DOM.showAdmin(currentUser);
                DOM.loadUserFilter();
                DOM.loadTaskUsers();
                DOM.renderStats();
                DOM.renderTasks();
            } else if (currentUser.role === "Usuario_normal") {
                DOM.showUser(currentUser);
                DOM.renderUserStats(currentUser.id_user);
                DOM.renderUserTasks(currentUser.id_user);
            } else {
                DOM.showLogin();
            }
        } else {
            DOM.showLogin();
        }

        this.bindEvents();
    },

    //Eventos del sistema 
    bindEvents() {
        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");
        const logoutUserBtn = document.getElementById("logout-user-btn");

        const userFilterState = document.getElementById("user-filter-state");
        const filterState = document.getElementById("filter-state");
        const filterUser = document.getElementById("filter-user");

        const taskForm = document.getElementById("task-form");

        //Login
        if (loginBtn) {
            loginBtn.addEventListener("click", () => {
                const username = document.getElementById("username").value.trim();
                const password = document.getElementById("password").value.trim();

                if (!username || !password) {
                    DOM.setLoginMessage("Debe ingresar usuario y contraseña.");
                    return;
                }

                const result = Auth.login(username, password);

                if (!result.success) {
                    DOM.setLoginMessage(result.message);
                    return;
                }

                DOM.setLoginMessage("", true);

                if (result.user.role === "Administrador") {
                    DOM.showAdmin(result.user);
                    DOM.loadUserFilter();
                    DOM.loadTaskUsers();
                    DOM.renderStats();
                    DOM.renderTasks();
                } else if (result.user.role === "Usuario_normal") {
                    DOM.showUser(result.user);
                    DOM.renderUserStats(result.user.id_user);
                    DOM.renderUserTasks(result.user.id_user);
                }
            });
        }

        //Logout Admin
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                Auth.logout();
                location.reload();
            });
        }

        //Logout User
        if (logoutUserBtn) {
            logoutUserBtn.addEventListener("click", () => {
                Auth.logout();
                location.reload();
            });
        }


        //Filtros
        if (filterState) {
            filterState.addEventListener("change", () => {
                DOM.renderTasks();
            });
        }

        if (filterUser) {
            filterUser.addEventListener("change", () => {
                DOM.renderTasks();
            });
        }

        if (userFilterState) {
            userFilterState.addEventListener("change", () => {
                const user = Auth.getCurrentUser();
                if (user) {
                    DOM.renderUserTasks(user.id_user);
                }
            });
        }

        //Creacion de tarea
        if (taskForm) {
            taskForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const title = document.getElementById("task-title").value.trim();
                const expirationDate = document.getElementById("task-date").value;
                const userId = document.getElementById("task-user").value;

                const result = Tasks.addTask(title, expirationDate, userId);

                DOM.setTaskMessage(result.message, result.success);

                if (result.success) {
                    taskForm.reset();
                    DOM.renderStats();
                    DOM.renderTasks();
                }
            });
        }
    },

    // Acciones del usuario post creacion
    handleCompleteTask(taskId) {
        const currentUser = Auth.getCurrentUser();

        Tasks.completeTask(taskId);

        if (currentUser.role === "Administrador") {
            DOM.renderStats();
            DOM.renderTasks();
        } else if (currentUser.role === "Usuario_normal") {
            DOM.renderUserStats(currentUser.id_user);
            DOM.renderUserTasks(currentUser.id_user);
        }
    },

    handleCompleteTask(taskId) {
        const currentUser = Auth.getCurrentUser();

        Tasks.completeTask(taskId);

        if (currentUser.role === "Administrador") {
            DOM.renderStats();
            DOM.renderTasks();
        } else if (currentUser.role === "Usuario_normal") {
            DOM.renderUserStats(currentUser.id_user);
            DOM.renderUserTasks(currentUser.id_user);
        }
    },

    handleEditDate(taskId) {
        const currentUser = Auth.getCurrentUser();

        const newDate = prompt("Ingrese la nueva fecha de vencimiento en formato YYYY-MM-DD:");

        if (newDate === null) {
            return;
        }

        const result = Tasks.updateTaskDate(taskId, newDate);
        alert(result.message);

        if (result.success) {
            if (currentUser.role === "Administrador") {
                DOM.renderStats();
                DOM.renderTasks();
            } else if (currentUser.role === "Usuario_normal") {
                DOM.renderUserStats(currentUser.id_user);
                DOM.renderUserTasks(currentUser.id_user);
            }
        }
    },

    handleChangeUser(taskId) {
        const currentUser = Auth.getCurrentUser();

        if (currentUser.role !== "Administrador") {
            return;
        }

        const users = Storage.getUsers();
        let message = "Ingrese el ID del nuevo usuario:\n\n";

        users.forEach(user => {
            message += `${user.id_user} - ${user.nameuser} (${user.role})\n`;
        });

        const newUserId = prompt(message);

        if (newUserId === null) {
            return;
        }

        const result = Tasks.updateTaskUser(taskId, newUserId);
        alert(result.message);

        if (result.success) {
            DOM.renderTasks();
        }
    },

    handleDeleteTask(taskId) {
        const currentUser = Auth.getCurrentUser();

        const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarea?");

        if (!confirmDelete) {
            return;
        }

        Tasks.deleteTask(taskId);

        if (currentUser.role === "Administrador") {
            DOM.renderStats();
            DOM.renderTasks();
        } else if (currentUser.role === "Usuario_normal") {
            DOM.renderUserStats(currentUser.id_user);
            DOM.renderUserTasks(currentUser.id_user);
        }
    },
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});