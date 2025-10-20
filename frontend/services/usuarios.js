import { pb } from "./pb.js";

export async function crearUsuario({ email, password, name }) { 
    try {
        const usuario = await pb.collection("users").create({
            name,
            email,
            password,
            passwordConfirm: password,
            emailVisibility: true
        });
        return usuario;
    } catch (error) {
        // Relanza el error a index.js para que pueda manejar la alerta
        throw new Error(error.message);
    }
}

// Iniciar sesión
export async function iniciarSesion(email, password) {
    try {
        return await pb.collection("users").authWithPassword(email, password);
    } catch (error) {
        throw new Error("Correo o contraseña incorrectos.");
    }
}

// Cerrar sesión
export function cerrarSesion() {
    pb.authStore.clear();
}

// Obtener usuario logueado
export function usuarioActual() {
    return pb.authStore.isValid ? pb.authStore.model : null;
}

// Actualizar usuario
export async function actualizarUsuario(id, datos) {
    return await pb.collection("users").update(id, datos);
}

// Eliminar usuario
export async function eliminarUsuario(id) {
    return await pb.collection("users").delete(id);
}
