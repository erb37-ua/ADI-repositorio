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
                    <input
                        id="name"
                        class="signup-card__input"
                        placeholder="Tu Nombre"
                        type="text"
                        required
                    />
                </div>

                <div class="signup-card__row signup-card__input-icon">
                    <label for="correo" class="signup-card__label">Correo electrónico</label>
                    <i class="signup-card__icon fa-solid fa-envelope"></i>
                    <input
                        id="correo"
                        class="signup-card__input"
                        placeholder="ejemplo@gmail.com"
                        type="email"
                        required
                    />
                </div>

                <div class="signup-card__row signup-card__input-icon">
                    <label for="password" class="signup-card__label">Contraseña</label>

                    <!-- Candado SVG -->
                    <svg
                        class="signup-card__icon signup-card__icon--lock"
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
                        id="password"
                        class="signup-card__input"
                        placeholder="**********************"
                        type="password"
                        required
                    />
                </div>

                <div class="signup-card__row signup-card__input-icon">
                    <label for="passwordConfirm" class="signup-card__label">Confirmar Contraseña</label>

                    <!-- Candado SVG -->
                    <svg
                        class="signup-card__icon signup-card__icon--lock"
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
                        id="passwordConfirm"
                        class="signup-card__input"
                        placeholder="**********************"
                        type="password"
                        required
                    />
                </div>

                <div class="signup-card__row">
                    <button id="btnCrearCuenta" type="submit" class="signup-card__btn">
                        Crear cuenta
                    </button>
                </div>
            </form>

            <div class="signup-card__terms">
                Al crear una cuenta, usted acepta la
                <RouterLink to="/privacidad" class="signup-card__terms-link">
                    Política de Privacidad
                </RouterLink>
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
        max-width: 450px;
        margin: 0 auto;
        border-color: #2b5b5b;
        text-align: center;
    }

    .signup-card__title {
        font-size: 28px;
        margin-bottom: 28px;
        text-align: center;
        font-weight: 700; /* ahora en negrita */
    }

    /* Más aire entre filas (antes 18px) */
    .signup-card__row {
        margin-bottom: 22px;
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
        font-family: 'Itim';
        background: #fff;
    }

    .signup-card__input-icon .signup-card__icon {
        position: absolute;
        left: 12px;
        top: 72%;
        transform: translateY(-50%);
        color: #666;
    }

    .signup-card__input-icon .signup-card__input {
        padding-left: 46px;
    }

    .signup-card__icon--lock {
        width: 22px;
        height: 22px;
        stroke: #666;
        stroke-width: 1.6;
        fill: transparent;
        margin-right: 0;
        pointer-events: none;
    }

    /* Más separación visual antes del botón de "Crear cuenta" */
    .signup-card__row button {
        display: block;
        margin: 16px auto 0;  /* margen superior extra */
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
        font-family: 'Itim', sans-serif;
    }

    .signup-card__btn--google {
        background: #fff;
        color: var(--dark);
        border: 1px solid var(--dark);
        width: 100%;
    }

    .signup-card__icon {
        margin-right: 8px;
        vertical-align: middle;
    }

    .signup-card__separator {
        display: flex;
        align-items: center;
        text-align: center;
        color: #666;
        margin: 24px 0; /* un pelín más de aire también aquí si quieres */
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

    .signup-card__terms {
        font-size: 12px;
        color: #666;
        text-align: center;
        margin-top: 14px;
        line-height: 1.4;
    }

    .signup-card__terms-link {
        color: #666;
        text-decoration: underline;
    }
</style>
