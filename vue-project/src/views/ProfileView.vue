<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

// Datos simulados (sin backend)
const nombre = ref("Esteban");
const correo = ref("esteban@example.com");
const pass = ref("");
const pass2 = ref("");

const handleSave = () => {
    if (pass.value !== pass2.value) {
        console.warn("Las contraseñas no coinciden.");
        return;
    }
    console.log("Cambios de perfil guardados (demo, sin backend).");
};

const handleLogout = () => {
    console.log("Cierre de sesión simulado.");
    router.push("/login");
};

const handleDelete = () => {
    console.warn("Cuenta eliminada (simulación, sin backend).");
};
</script>

<template>
<div class="profile">
    <section class="profile-card">
        <h2 class="profile-card__title">Perfil</h2>

        <form id="formPerfil" novalidate @submit.prevent="handleSave">
        <!-- Nombre -->
        <div class="profile-card__row">
            <label for="nombre" class="profile-card__label">
            Nombre
            </label>
            <div class="profile-card__input-icon">
                <i class="profile-card__icon fa-solid fa-user"></i>
                <input
                id="nombre"
                class="profile-card__input"
                type="text"
                placeholder="Tu nombre"
                required
                v-model="nombre"
                />
            </div>
        </div>

        <!-- Correo -->
        <div class="profile-card__row">
            <label for="correo" class="profile-card__label">
            Correo electrónico
            </label>
            <div class="profile-card__input-icon">
                <i class="profile-card__icon fa-solid fa-envelope"></i>
                <input
                id="correo"
                class="profile-card__input"
                type="email"
                placeholder="ejemplo@gmail.com"
                :value="correo"
                disabled
                />
            </div>
        </div>

        <!-- Contraseña -->
        <div class="profile-card__row">
            <label for="pass" class="profile-card__label">
            Contraseña
            </label>
            <div class="profile-card__input-icon">
                <!-- Candado SVG borde gris, relleno transparente -->
                <svg
                class="profile-card__icon profile-card__icon--lock"
                viewBox="0 0 24 24"
                aria-hidden="true"
                >
                <!-- Cuerpo del candado -->
                <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    ry="2"
                />
                <!-- Arco -->
                <path
                    d="M9 10V7a3 3 0 0 1 6 0v3"
                />
                <!-- Agujero de la llave -->
                <circle cx="12" cy="15" r="1.3" />
                </svg>

                <input
                id="pass"
                class="profile-card__input"
                type="password"
                placeholder="**********************"
                v-model="pass"
                />
            </div>
        </div>

        <!-- Repetir contraseña -->
        <div class="profile-card__row">
            <label for="pass2" class="profile-card__label">
            Repetir contraseña
            </label>
            <div class="profile-card__input-icon">
                <!-- Mismo candado SVG -->
                <svg
                class="profile-card__icon profile-card__icon--lock"
                viewBox="0 0 24 24"
                aria-hidden="true"
                >
                <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    ry="2"
                />
                <path
                    d="M9 10V7a3 3 0 0 1 6 0v3"
                />
                <circle cx="12" cy="15" r="1.3" />
                </svg>

                <input
                id="pass2"
                class="profile-card__input"
                type="password"
                placeholder="**********************"
                v-model="pass2"
                />
            </div>
        </div>

        <!-- Botones -->
        <div class="profile-card__row profile-card__buttons">
            <button type="submit" class="profile-card__btn">
            Guardar cambios
            </button>
            <button
            type="button"
            class="profile-card__btn"
            id="btnCerrarSesion"
            @click="handleLogout"
            >
            Cerrar sesión
            </button>
        </div>
        </form>

        <div class="profile-card__row profile-card__delete">
        <button
            type="button"
            class="profile-card__btn profile-card__btn--danger"
            @click="handleDelete"
        >
            Eliminar cuenta
        </button>
        </div>
    </section>
</div>
</template>

<style scoped>
.profile {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px 120px;
}

.profile-card {
    background: var(--card);
    border-radius: var(--radius);
    padding: var(--pad);
    border: 2px solid var(--dark);
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
}

.profile-card__title {
    font-size: 28px;
    margin-bottom: 28px;
    text-align: center;
    font-weight: 700;
}

.profile-card__row {
    margin-bottom: 20px;
    position: relative;
    text-align: left;
}

.profile-card__label {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #333;
}

.profile-card__input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--dark);
    font-size: 15px;
    color: #333;
    font-weight: 400;
    font-family: 'Itim', sans-serif;
    background: #fff;
}

.profile-card__input::placeholder {
    color: #666;
    font-weight: 400;
}

.profile-card__input-icon {
    position: relative;
}

.profile-card__icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #666;
    pointer-events: none;
}

/* Candado SVG: borde gris, relleno transparente */
.profile-card__icon--lock {
    width: 22px;
    height: 22px;
    stroke: #666;
    stroke-width: 1.6;
    fill: transparent;      /* fondo transparente, se ve el blanco del input */
}

.profile-card__input-icon .profile-card__input {
    padding-left: 46px;
}

.profile-card__buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 30px; 
}

.profile-card__btn {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 12px;
    background: var(--dark);
    color: #fff;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 400;     /* antes 700 */
    font-family: 'Itim', sans-serif;
}

.profile-card__btn--danger {
    background: var(--accent);
    color: #fff;
    border-radius: 12px;
    padding: 12px 25px;
    border: none;
    cursor: pointer;
    font-weight: 400;     /* antes 700 */
    font-family: 'Itim', sans-serif;
}


.profile-card__delete {
    text-align: center;
    margin-top: 12px;
}
</style>
