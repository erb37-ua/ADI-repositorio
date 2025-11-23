import { pb } from './pb.js'

// LOGIN
export async function loginUser(email, password) {
    return pb.collection('users').authWithPassword(email, password)
}

// REGISTRO
export async function registerUser({ name, email, password }) {
    return pb.collection('users').create({
        name,
        email,
        password,
        passwordConfirm: password,
        emailVisibility: true,
    })
}

// ACTUALIZAR USUARIO
export async function updateUser(id, data) {
    if (!id) throw new Error('ID de usuario no proporcionado')
    return pb.collection('users').update(id, data)
}

// BORRAR USUARIO
export async function deleteUser(id) {
    if (!id) throw new Error('ID de usuario no proporcionado')
    return pb.collection('users').delete(id)
}

// USUARIO ACTUAL desde el authStore
export function getCurrentUser() {
    return pb.authStore.isValid ? pb.authStore.model : null
}

// LOGOUT
export function logoutUser() {
    pb.authStore.clear()
}
