// Importa PocketBase desde un CDN que ofrece el módulo ES
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@latest/dist/pocketbase.es.js';

// Singleton: una sola instancia de PocketBase para toda la app
export const pb = new PocketBase("http://127.0.0.1:8090"); // Ajusta la URL si es distinta

// Cargar sesión desde localStorage al iniciar la app
const authData = localStorage.getItem("pb_auth");
if (authData) {
    try {
        const data = JSON.parse(authData);
        pb.authStore.save(data.token, data.model);
    } catch (err) {
        console.error("Error cargando sesión:", err);
        pb.authStore.clear();
    }
}

// Guardar sesión automáticamente cuando cambie
pb.authStore.onChange(() => {
    if (pb.authStore.isValid) {
        const data = {
            token: pb.authStore.token,
            model: pb.authStore.model
        };
        localStorage.setItem("pb_auth", JSON.stringify(data));
    } else {
        localStorage.removeItem("pb_auth");
    }
});
