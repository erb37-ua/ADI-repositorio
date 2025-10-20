import { crearUsuario } from "../../services/usuarios.js";

const formRegistro = document.getElementById("formRegistro");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("passwordConfirm");
const inputName = document.getElementById("name");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = inputName.value;
    const email = inputCorreo.value;
    const password = inputPassword.value;
    const passwordConfirm = inputPasswordConfirm.value;

    const errores = [];
    if (password !== passwordConfirm) errores.push("Las contraseñas no coinciden");

    if (errores.length) {
        alert("❌ Por favor corrige los siguientes errores:\n- " + errores.join("\n- "));
        return;
    }

    try {
        await crearUsuario({ email, password, name });
        alert("✅ Tu cuenta ha sido creada correctamente");
        window.location.href = "/frontend/pages/home/index.html";
    } catch (error) {
        alert("❌ No se pudo crear la cuenta. " + (error.userMessage || error.message));
    }
});
