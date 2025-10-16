import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        // Autenticación en la colección de usuarios estándar
        const authData = await pb.collection('users').authWithPassword(
            "fmpp3@alu.ua.es",   // tu email
            "pocketbase"        // tu contraseña
        );
        console.log("Login exitoso:", authData);

        // Listar registros de otra colección
        const recetas = await pb.collection("recetas").getFullList();
        for (const item of recetas) {
            console.log(item.nombre, item.ingredientes);
        }

        pb.authStore.clear();
    } catch (error) {
        console.log("Error:", error.message);
    }
}

main();
