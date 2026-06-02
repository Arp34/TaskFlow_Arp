import { dbTasks } from "../utils/constant";
import { getSession } from "./users.service";

export async function createTask(taskData) {

    const response = await fetch(dbTasks, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error("Error al crear tarea");
    }

    return await response.json();
}

export function getTaskFormData() {

    const title = document.getElementById("title").value.trim();

    const description = document.getElementById("description").value.trim();

    const status = document.getElementById("status").value.trim();

    const date = document.getElementById("date").value;

    return {
        title,
        description,
        status,
        date
    };
}

export async function saveTask(taskData) {

    const session = getSession();

    const newTask = {
        ...taskData,
        userId: session.id
    };

    return await createTask(newTask);
}

export async function getTasks(){
    const response = await fetch(dbTasks);

    if (!response.ok) {
        throw new Error("Error al obtener tareas");
    }

    return await response.json();
}

export async function getVisibleTasks() {
    const session = getSession();
    const tasks = await getTasks();
    if (session.role.includes("ADMIN")) {
        return tasks;
    }
    return tasks.filter(task => task.userId === session.id);
}

export async function getTaskById(id) {
    const response = await fetch(`${dbTasks}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener tarea");
    }
    return await response.json();
}

export async function updateTask(id, taskData) {
    
    const oldTask = await getTaskById(id);
    
    const updatedTask = {
        ...oldTask,
        ...taskData
    };

    const response = await fetch(`${dbTasks}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar tarea");
    }

    return await response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${dbTasks}/${id}`, {
        method: "DELETE"
    });
    
    if (!response.ok) {
        throw new Error("Error al eliminar tarea");
    }
}