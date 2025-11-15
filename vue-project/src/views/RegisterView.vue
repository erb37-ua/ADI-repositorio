<template>
    <div class="signup">
        <section class="signup-card">
            <h2 class="signup-card__title">Crear cuenta</h2>

            <div class="signup-card__row">
            <button class="signup-card__btn" type="button">
                <i class="signup-card__icon fa-brands fa-google"></i>
                Continúa con Google
            </button>
            </div>

            <div class="signup-card__separator">o</div>

            <!-- Evitamos recarga de página -->
            <form id="formRegistro" @submit.prevent>
            <div class="signup-card__row signup-card__input-icon">
                <label for="name" class="signup-card__label">Nombre de Usuario</label>
                <i class="signup-card__icon fa-solid fa-user"></i>
                <input id="name" class="signup-card__input" placeholder="Tu Nombre" type="text" required />
            </div>

            <div class="signup-card__row signup-card__input-icon">
                <label for="correo" class="signup-card__label">Correo electrónico</label>
                <i class="signup-card__icon fa-solid fa-envelope"></i>
                <input id="correo" class="signup-card__input" placeholder="ejemplo@gmail.com" type="email" required />
            </div>

            <div class="signup-card__row signup-card__input-icon">
                <label for="password" class="signup-card__label">Contraseña</label>
                <i class="signup-card__icon fa-solid fa-lock"></i>
                <input id="password" class="signup-card__input" placeholder="**********************" type="password" required />
            </div>

            <div class="signup-card__row signup-card__input-icon">
                <label for="passwordConfirm" class="signup-card__label">Confirmar Contraseña</label>
                <i class="signup-card__icon fa-solid fa-lock"></i>
                <input id="passwordConfirm" class="signup-card__input" placeholder="**********************" type="password" required />
            </div>

            <div class="signup-card__row">
                <button id="btnCrearCuenta" type="submit" class="signup-card__btn">
                <i class="signup-card__icon fa-solid fa-right-to-bracket"></i>
                Crear cuenta
                </button>
            </div>
            </form>

            <div class="signup-card__terms">
            Al crear una cuenta, usted acepta la
            <RouterLink to="/privacidad" class="signup-card__terms-link">Política de Privacidad</RouterLink>
            de esta página.
            </div>
        </section>
    </div>
</template>

<style scoped>
.signup {
        margin: 0 auto;
        padding: 40px 20px 120px;
    }

    .signup-card {
        background: var(--card);
        border-radius: var(--radius);
        padding: var(--pad);
        border: 2px solid rgba(43, 91, 91, 0.12);
        /* CAMBIO 1: Hacemos la tarjeta más estrecha. 450px como el Login. */
        max-width: 450px; 
        margin: 0 auto;
        border-color: #2b5b5b;
        text-align: center;
    }

    .signup-card__title {
        font-size: 28px;
        margin-bottom: 28px;
        text-align: center;
    }

    /* Form Rows */
    .signup-card__row {
        margin-bottom: 18px;
        position: relative;
        text-align: left;
    }

    .signup-card__label {
        display: block;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        color: #333;
    }

    .signup-card__input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 10px;
        border: 1px solid #2b5b5b;
        /* CAMBIO 2: Añadida la fuente Itim */
        font-family: 'Itim', sans-serif;
    }

    /* Iconos dentro de inputs */
    .signup-card__input-icon .signup-card__icon {
        position: absolute;
        left: 12px;
        top: 70%;
        transform: translateY(-50%);
        color: #666;
    }

    .signup-card__input-icon .signup-card__input {
        padding-left: 40px;
    }

    /* Botones */
    .signup-card__row button {
        display: block;
        margin: 0 auto;
    }

    .signup-card__btn {
        display: inline-block;
        padding: 12px 52px;
        border-radius: 12px;
        background: var(--dark);
        color: #fff;
        text-decoration: none;
        border: none;
        cursor: pointer;
        font-size: 15px;
        /* CAMBIO 3: Añadida la fuente Itim */
        font-family: 'Itim', sans-serif;
    }
    
    /* Botón de Google (tiene estilos ligeramente distintos) */
    .signup-card__btn--google {
      background:#fff;
      color:var(--dark);
      border:1px solid var(--dark);
      width: 100%; /* Hacemos que ocupe todo el ancho */
    }

    .signup-card__icon {
        margin-right: 8px;
        vertical-align: middle;
    }

    /* Separador */
    .signup-card__separator {
        display: flex;
        align-items: center;
        text-align: center;
        color: #666;
        margin: 20px 0;
    }

    .signup-card__separator::before,
    .signup-card__separator::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #ccc;
    }

    .signup-card__separator:not(:empty)::before {
        margin-right: 0.75em;
    }

    .signup-card__separator:not(:empty)::after {
        margin-left: 0.75em;
    }

    /* Terms */
    .signup-card__terms {
        font-size: 12px;
        color: #666;
        text-align: center;
        margin-top: 10px;
        line-height: 1.4;
    }

    .signup-card__terms-link {
        color: #666;
        text-decoration: underline;
    }
</style>
