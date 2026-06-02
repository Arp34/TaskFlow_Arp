import { renderRoute } from "../router/router";
import { dbUsers } from "../utils/constant";


async function obtenerUsuarios(){
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}

//Buscar usuario por email (para login)

async function obtenerUsuarioPorEmail(email){
    const response = await fetch(`${dbUsers}?email=${email}`);

    if (!response.ok) {
        throw new Error("Error al obtener el usuario");
    }

    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}

// Leer Formulario Login

function getLoginFormData() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    return { email, password };
}

//guardar sesion en localStorage

function saveSession(user){
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

function getSession(){
    return JSON.parse(localStorage.getItem("session"));
}

//cerrar sesion
function logout(){
    localStorage.removeItem("session");
    
    window.history.pushState(null, null, "/login");

    renderRoute();
}

async function loginUser(loginData){

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


export { obtenerUsuarios, obtenerUsuarioPorEmail, getLoginFormData, saveSession, getSession, logout, loginUser };