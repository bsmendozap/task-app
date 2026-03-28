const Tasks = {
    getAllTasks() {
        return Storage.getTasks();
    },

    getFilteredTasks(stateFilter, userFilter) {
        let tasks = this.getAllTasks();

        if (stateFilter !== "Todas") {
            tasks = tasks.filter(task => task.state === stateFilter);
        }

        if (userFilter !== "Todos") {
            tasks = tasks.filter(task => task.user_id === Number(userFilter));
        }

        return tasks;
    },

    completeTask(taskId) {
        const tasks = Storage.getTasks();

        const updatedTasks = tasks.map(task => {
            if (task.id_task === taskId) {
                return { ...task, state: "Completada" };
            }
            return task;
        });

        Storage.saveTasks(updatedTasks);
    },

    deleteTask(taskId) {
        const tasks = Storage.getTasks();
        const updatedTasks = tasks.filter(task => task.id_task !== taskId);
        Storage.saveTasks(updatedTasks);
    },

    getStats() {
        const tasks = Storage.getTasks();
        const today = new Date().toISOString().split("T")[0];

        return {
            total: tasks.length,
            pending: tasks.filter(task => task.state === "Pendiente").length,
            completed: tasks.filter(task => task.state === "Completada").length,
            overdue: tasks.filter(task => task.state === "Pendiente" && task.expiration_date < today).length
        };
    },

    addTask(title, expirationDate, userId) {
        const tasks = Storage.getTasks();
        const users = Storage.getUsers();
        const currentDate = new Date().toISOString().split("T")[0];

        if (!title || !expirationDate || !userId) {
            return {
                success: false,
                message: "Todos los campos son obligatorios."
            };
        }

        const userExists = users.some(user => user.id_user === Number(userId));

        if (!userExists) {
            return {
                success: false,
                message: "El usuario seleccionado no existe."
            };
        }

        if (expirationDate < currentDate) {
            return {
                success: false,
                message: "La fecha de vencimiento no puede ser menor a la fecha actual."
            };
        }

        const newTask = {
            id_task: Date.now(),
            title: title,
            state: "Pendiente",
            creation_date: currentDate,
            expiration_date: expirationDate,
            user_id: Number(userId)
        };

        tasks.push(newTask);
        Storage.saveTasks(tasks);

        return {
            success: true,
            message: "Tarea agregada correctamente."
        };
    },

    updateTaskDate(taskId, newExpirationDate) {
        const tasks = Storage.getTasks();

        const taskToUpdate = tasks.find(task => task.id_task === taskId);

        if (!taskToUpdate) {
            return {
                success: false,
                message: "La tarea no existe."
            };
        }

        if (taskToUpdate.state === "Completada") {
            return {
                success: false,
                message: "No se puede modificar la fecha de una tarea completada."
            };
        }

        if (!newExpirationDate) {
            return {
                success: false,
                message: "Debe seleccionar una nueva fecha."
            };
        }

        if (newExpirationDate < taskToUpdate.creation_date) {
            return {
                success: false,
                message: "La fecha de vencimiento no puede ser menor a la fecha de creación."
            };
        }

        const updatedTasks = tasks.map(task => {
            if (task.id_task === taskId) {
                return {
                    ...task,
                    expiration_date: newExpirationDate
                };
            }
            return task;
        });

        Storage.saveTasks(updatedTasks);

        return {
            success: true,
            message: "Fecha de vencimiento actualizada correctamente."
        };
    },

    updateTaskUser(taskId, newUserId) {
        const tasks = Storage.getTasks();
        const users = Storage.getUsers();

        const taskToUpdate = tasks.find(task => task.id_task === taskId);

        if (!taskToUpdate) {
            return {
                success: false,
                message: "La tarea no existe."
            };
        }

        if (taskToUpdate.state === "Completada") {
            return {
                success: false,
                message: "No se puede cambiar el usuario de una tarea completada."
            };
        }

        if (!newUserId) {
            return {
                success: false,
                message: "Debe seleccionar un usuario."
            };
        }

        const userExists = users.some(user => user.id_user === Number(newUserId));

        if (!userExists) {
            return {
                success: false,
                message: "El usuario seleccionado no existe."
            };
        }

        const updatedTasks = tasks.map(task => {
            if (task.id_task === taskId) {
                return {
                    ...task,
                    user_id: Number(newUserId)
                };
            }
            return task;
        });

        Storage.saveTasks(updatedTasks);

        return {
            success: true,
            message: "Usuario asignado actualizado correctamente."
        };
    }

};