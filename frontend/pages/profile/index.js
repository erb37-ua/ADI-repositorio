// profile/index.js
import { pb } from "../../services/pb.js";
import { cerrarSesion, actualizarUsuario, eliminarUsuario, usuarioActual } from "../../services/usuarios.js";

document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("nombre");
    const inputCorreo = document.getElementById("correo");
    const inputPass = document.getElementById("pass");
    const inputPass2 = document.getElementById("pass2");
    const btnGuardar = document.querySelector(".profile-card__buttons .profile-card__btn");
    const btnCerrar = document.getElementById("btnCerrarSesion");
    const btnEliminar = document.querySelector(".profile-card__delete .profile-card__btn");

    const usuario = usuarioActual();

    if (!usuario) {
        alert("⚠️ Debes iniciar sesión para ver tu perfil.");
        window.location.href = "../login/index.html";
        return;
    }

    // Rellenar campos
    inputNombre.value = usuario.name || "";
    inputCorreo.value = usuario.email || "";
    inputPass.value = "";
    inputPass2.value = "";

    // Guardar cambios
    btnGuardar.addEventListener("click", async (e) => {
        e.preventDefault();

        const nuevosDatos = { name: inputNombre.value };

        if (inputPass.value) {
            if (inputPass.value !== inputPass2.value) {
                alert("❌ Las contraseñas no coinciden");
                return;
            }
            if (inputPass.value.length < 8) {
                alert("❌ La contraseña debe tener al menos 8 caracteres");
                return;
            }
            nuevosDatos.password = inputPass.value;
            nuevosDatos.passwordConfirm = inputPass2.value;
        }
        try {
            const updatedUser = await actualizarUsuario(usuario.id, nuevosDatos);
            alert("✅ Datos actualizados correctamente");
            
            // --- CORRECCIÓN AQUÍ ---
            // En lugar de: pb.authStore.model = updatedUser;
            // Usa:
            pb.authStore.save(pb.authStore.token, updatedUser);
            // --- FIN DE LA CORRECCIÓN ---

            console.log("Usuario actualizado:", updatedUser);
        } catch (err) {
            console.error(err);
            alert("❌ No se pudieron guardar los cambios: " + err.message);
        }
    });

    // Cerrar sesión
    btnCerrar.addEventListener("click", () => {
        cerrarSesion();
        window.location.href = "../login/index.html";
    });

    // Eliminar cuenta
    btnEliminar.addEventListener("click", async () => {
        if (!confirm("⚠️ ¿Deseas eliminar tu cuenta?")) return;

        try {
            await eliminarUsuario(usuario.id);
            cerrarSesion();
            alert("✅ Cuenta eliminada correctamente");
            window.location.href = "../login/index.html";
        } catch (err) {
            console.error(err);
            alert("❌ No se pudo eliminar la cuenta: " + err.message);
        }
    });
});
