import { renderRoute } from "../router/router";
import { dbUsers } from "../utils/constant";
import { obtenerUsuarioPorEmail } from "./users.service";

// ===============================
// FUNCION: REGISTRAR USUARIO EN API
// ===============================

// Esta funcion SOLO se encarga de:
// 1. comunicarse con la API
// 2. enviar datos
// 3. devolver respuesta
//
// NO debe:
// - leer formularios
// - mostrar alerts
// - manejar HTML
//
// Responsabilidad:
// capa de comunicacion/backend

export async function registerUser(userData) {
  const response = await fetch(dbUsers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Error al crear el usuario");
  }

  return await response.json();
}

// ===============================
// FUNCION: OBTENER DATOS DEL FORMULARIO
// ===============================

// Esta funcion:
// 1. lee inputs del DOM
// 2. obtiene sus valores
// 3. crea un objeto JS
//
// Responsabilidad:
// convertir formulario -> objeto usable

export function getUserFormData() {
  const name = document.getElementById("register-name").value.trim();
  const lastname = document.getElementById("register-lastname").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const role = document.getElementById("register-role").value.trim().toUpperCase();
  return { name, lastname, email, password, role };
}

// ===============================
// FUNCION: CREAR USUARIO
// ===============================

// Esta funcion controla TODA la logica:
//
// 1. validar si usuario existe
// 2. preparar objeto final
// 3. llamar API
// 4. mostrar mensajes
// 5. redireccionar
//
// Responsabilidad:
// coordinar el flujo completo

export async function createUser(userData) {

  const existingUser = await obtenerUsuarioPorEmail(userData.email);

  if (existingUser) {
    alert("El correo ya está registrado");
    return;
  }

  const newUser = {
    ...userData,
    role: [userData.role]
  };

  const response = await registerUser(newUser)

  if (response) {

    alert("Usuario creado exitosamente");

    window.history.pushState(null, null, "/login");

    renderRoute();
  }
}
