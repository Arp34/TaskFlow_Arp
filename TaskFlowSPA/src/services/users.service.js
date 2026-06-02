import { renderRoute } from "../router/router";
import { dbUsers } from "../utils/constant";


export async function obtenerUsuarios(){
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}

//Buscar usuario por email (para login)

export async function obtenerUsuarioPorEmail(email){
    const response = await fetch(`${dbUsers}?email=${email}`);

    if (!response.ok) {
        throw new Error("Error al obtener el usuario");
    }

    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}

export async function getUserById(id) {

    const response = await fetch(`${dbUsers}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener usuario");
    }

    return await response.json();
}

// Leer Formulario Login

export function getLoginFormData() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    return { email, password };
}

//guardar sesion en localStorage

export function saveSession(user){
    const sessionUser = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role
    }
    localStorage.setItem("session", JSON.stringify(sessionUser));
}

// Obtener sesion desde localStorage

export function getSession(){
    return JSON.parse(localStorage.getItem("session"));
}

//cerrar sesion
export function logout(){
    localStorage.removeItem("session");
    
    window.history.pushState(null, null, "/login");

    renderRoute();
}

export async function loginUser(loginData){

    // 1. Obtener usuario por email
    const user = await obtenerUsuarioPorEmail(loginData.email);

    // 2. Validar si usuario existe
    if (!user) {
        alert("Usuario o contraseña no coinciden");
        return;
    }

    // 3. Validar contraseña
    if (user.password !== loginData.password) {
        alert("Usuario o contraseña no coinciden");
        return;
    }

    // 4. Guardar sesion
    saveSession(user);

    // 5. Redireccionar a dashboard
        window.history.pushState(null, null, "/dashboard");
    
        renderRoute();
}

export async function updateUser(id, userData) {

    const oldUser = await getUserById(id);

    const updatedUser = {
        ...oldUser,
        ...userData
    };

    const response = await fetch(`${dbUsers}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
    }

    return await response.json();
}

export async function deleteUser(id) {

    const response = await fetch(`${dbUsers}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar usuario");
    }
}


