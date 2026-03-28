const DOM = {

    //Vista de Administrador
    showAdmin(user) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("admin-section").classList.remove("hidden");
        document.getElementById("welcome-admin").textContent = `Bienvenido, ${user.nameuser}`;
    },

    //Vista de usuario normal
    showUser(user) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("admin-section").classList.add("hidden");
        document.getElementById("user-section").classList.remove("hidden");

        document.getElementById("welcome-user").textContent = `Bienvenido, ${user.nameuser}`;
    },

    //Vista login
    showLogin() {
        document.getElementById("login-section").classList.remove("hidden");
        document.getElementById("admin-section").classList.add("hidden");
    },

    //Vista Mensajes
    setLoginMessage(message, success = false) {
        const element = document.getElementById("login-message");
        element.textContent = message;
        element.style.color = success ? "green" : "#b91c1c";
    },

    setTaskMessage(message, success = false) {
        const element = document.getElementById("task-message");

        if (!element) return;

        element.textContent = message;
        element.style.color = success ? "green" : "#b91c1c";
    },

    //Carga de usuarios en el filtro
    loadUserFilter() {
        const users = Storage.getUsers();
        const filterUser = document.getElementById("filter-user");

        filterUser.innerHTML = `<option value="Todos">Todos</option>`;

        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id_user;
            option.textContent = user.nameuser;
            filterUser.appendChild(option);
        });
    },

    //Carga a los usuarios en el select
    loadTaskUsers() {
        const users = Storage.getUsers();
        const taskUser = document.getElementById("task-user");

        if (!taskUser) return;

        taskUser.innerHTML = `<option value="">Seleccione un usuario</option>`;

        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id_user;
            option.textContent = `${user.nameuser} - ${user.role}`;
            taskUser.appendChild(option);
        });
    },

    //Renderizado de estadisticas del User
    renderUserStats(userId) {
        const tasks = Storage.getTasks();
        const today = new Date().toISOString().split("T")[0];

        const userTasks = tasks.filter(task => task.user_id === userId);

        document.getElementById("user-total").textContent = userTasks.length;
        document.getElementById("user-pending").textContent =
            userTasks.filter(task => task.state === "Pendiente").length;

        document.getElementById("user-completed").textContent =
            userTasks.filter(task => task.state === "Completada").length;

        document.getElementById("user-overdue").textContent =
            userTasks.filter(task =>
                task.state === "Pendiente" && task.expiration_date < today
            ).length;
    },

    //Renderizado de estadisticas generales al aadministrador
    renderStats() {
        const stats = Tasks.getStats();

        document.getElementById("total-tasks").textContent = stats.total;
        document.getElementById("pending-tasks").textContent = stats.pending;
        document.getElementById("completed-tasks").textContent = stats.completed;
        document.getElementById("overdue-tasks").textContent = stats.overdue;
    },

    //Renderizado de las tareas generales
    renderTasks() {
        const stateFilter = document.getElementById("filter-state").value;
        const userFilter = document.getElementById("filter-user").value;
        const tasks = Tasks.getFilteredTasks(stateFilter, userFilter);
        const users = Storage.getUsers();
        const taskList = document.getElementById("task-list");
        const today = new Date().toISOString().split("T")[0];

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No hay tareas registradas con ese filtro.</p>";
            return;
        }

        tasks.forEach(task => {
            const assignedUser = users.find(user => user.id_user === task.user_id);

            let statusText = task.state;
            let statusClass = "badge-pending";

            if (task.state === "Completada") {
                statusText = "Completada";
                statusClass = "badge-completed";
            } else if (task.expiration_date < today) {
                statusText = "Vencida";
                statusClass = "badge-overdue";
            } else {
                statusText = "Pendiente";
                statusClass = "badge-pending";
            }

            const row = document.createElement("article");
            row.classList.add("task-row");

            row.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <span class="task-subtext">Creada: ${task.creation_date}</span>
            </div>

            <div class="task-user">
                <strong>Usuario:</strong> ${assignedUser ? assignedUser.nameuser : "No asignado"}
            </div>

            <div class="task-date">
                <strong>Vence:</strong> ${task.expiration_date}
            </div>

            <div class="task-status">
                <span class="badge ${statusClass}">${statusText}</span>
            </div>

            <div class="task-actions">
                ${task.state === "Pendiente" ? `<button class="btn-complete" onclick="App.handleCompleteTask(${task.id_task})">Completar</button>` : ""}
                ${task.state === "Pendiente" ? `<button class="btn-edit" onclick="App.handleEditDate(${task.id_task})">Modificar fecha</button>` : ""}
                ${task.state === "Pendiente" ? `<button class="btn-assign" onclick="App.handleChangeUser(${task.id_task})">Cambiar usuario</button>` : ""}
                <button class="btn-delete" onclick="App.handleDeleteTask(${task.id_task})">Eliminar</button>
            </div>
        `;

            taskList.appendChild(row);
        });
    },

    //Renderizado de las tareas por ID
    renderUserTasks(userId) {
        const stateFilter = document.getElementById("user-filter-state").value;
        const tasks = Tasks.getTasksByUser(userId, stateFilter);
        const taskList = document.getElementById("user-task-list");
        const today = new Date().toISOString().split("T")[0];

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tienes tareas.</p>";
            return;
        }

        tasks.forEach(task => {
            let statusText = task.state;
            let statusClass = "badge-pending";

            if (task.state === "Completada") {
                statusClass = "badge-completed";
            } else if (task.expiration_date < today) {
                statusText = "Vencida";
                statusClass = "badge-overdue";
            } else {
                statusText = "Pendiente";
                statusClass = "badge-pending";
            }

            const row = document.createElement("article");
            row.classList.add("task-row");

            row.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <span class="task-subtext">Creada: ${task.creation_date}</span>
            </div>

            <div class="task-date">
                <strong>Vence:</strong> ${task.expiration_date}
            </div>

            <div class="task-status">
                <span class="badge ${statusClass}">${statusText}</span>
            </div>

            <div class="task-actions">
                ${task.state === "Pendiente" ? `<button class="btn-complete" onclick="App.handleCompleteTask(${task.id_task})">Completar</button>` : ""}
                ${task.state === "Pendiente" ? `<button class="btn-edit" onclick="App.handleEditDate(${task.id_task})">Modificar fecha</button>` : ""}
            </div>
        `;

            taskList.appendChild(row);
        });
    }
};