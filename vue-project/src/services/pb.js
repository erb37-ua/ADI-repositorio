// Ubicación: vue-project/src/services/pb.js
import PocketBase from 'pocketbase';

// Conexión a tu backend local
export const pb = new PocketBase("http://127.0.0.1:8090");

// --- Gestión de sesión (opcional pero recomendada) ---

// Cargar sesión guardada al iniciar
const authData = localStorage.getItem("pb_auth");
if (authData) {
    pb.authStore.loadFromCookie(authData);
}

// Guardar automáticamente la sesión si cambia
pb.authStore.onChange(() => {
    if (pb.authStore.isValid) {
        // document.cookie se usa a veces, pero aquí mantenemos tu lógica de localStorage
        // para consistencia, o usamos la exportación del modelo
        const cookie = pb.authStore.exportToCookie({ httpOnly: false });
        localStorage.setItem("pb_auth", cookie);
    } else {
        localStorage.removeItem("pb_auth");
    }
});