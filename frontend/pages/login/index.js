// login/index.js
import { iniciarSesion } from "../../services/usuarios.js";
import { pb } from "../../services/pb.js";

const formLogin = document.getElementById("formLogin");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = inputCorreo.value.trim();
    const password = inputPassword.value;

    if (!email || !password) {
        alert("Por favor completa todos los campos.");
        return;
    }

    try {
        await iniciarSesion(email, password);

        // Redirigir al perfil
        alert("✅ Sesión iniciada correctamente");
        window.location.href = "../profile/index.html";
    } catch (error) {
        alert("❌ " + (error.message || "No se pudo iniciar sesión."));
    }
});
