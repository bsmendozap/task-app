const App = {
    init() {
        Storage.initUsers();
        Storage.initTasks();

        const currentUser = Auth.getCurrentUser();

        if (currentUser && currentUser.role === "Administrador") {
            DOM.showAdmin(currentUser);
            DOM.loadUserFilter();
            DOM.loadTaskUsers();
            DOM.renderStats();
            DOM.renderTasks();
        } else {
            DOM.showLogin();
        }

        this.bindEvents();
    },

    bindEvents() {
        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");
        const filterState = document.getElementById("filter-state");
        const filterUser = document.getElementById("filter-user");
        const taskForm = document.getElementById("task-form");

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

            if (result.user.role !== "Administrador") {
                DOM.setLoginMessage("Esta interfaz es solo para administrador.");
                Auth.logout();
                return;
            }

            DOM.setLoginMessage("", true);
            DOM.showAdmin(result.user);
            DOM.loadUserFilter();
            DOM.loadTaskUsers();
            DOM.renderStats();
            DOM.renderTasks();
        });

        logoutBtn.addEventListener("click", () => {
            Auth.logout();
            location.reload();
        });

        filterState.addEventListener("change", () => {
            DOM.renderTasks();
        });

        filterUser.addEventListener("change", () => {
            DOM.renderTasks();
        });

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
        
    },

    handleCompleteTask(taskId) {
        Tasks.completeTask(taskId);
        DOM.renderStats();
        DOM.renderTasks();
    },

    handleDeleteTask(taskId) {
        Tasks.deleteTask(taskId);
        DOM.renderStats();
        DOM.renderTasks();
    },

    handleEditDate(taskId) {
        const newDate = prompt("Ingrese la nueva fecha de vencimiento en formato YYYY-MM-DD:");

        if (newDate === null) {
            return;
        }

        const result = Tasks.updateTaskDate(taskId, newDate);

        alert(result.message);

        if (result.success) {
            DOM.renderStats();
            DOM.renderTasks();
        }
    },

    handleChangeUser(taskId) {
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
    }

};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});