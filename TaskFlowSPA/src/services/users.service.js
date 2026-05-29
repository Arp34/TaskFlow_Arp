

async function obtenerUsuarios(){
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}

async function obtenerUsuarioPorEmail(email){
    const response = await fetch(`http://localhost:3000/users?email=${email}`);

    if (!response.ok) {
        throw new Error("Error al obtener el usuario por email");
    }

    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}

export { obtenerUsuarios, obtenerUsuarioPorEmail }