<script setup>
    import { ref, computed, nextTick } from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { useMainStore } from '@/stores/main'

    const router = useRouter()
    const store = useMainStore()

    const correo = ref('')
    const password = ref('')
    const remember = ref(false)

    const errorMsg = ref('')
    const cargando = computed(() => store.authLoading)

    // Estado visual
    const shakeLogin = ref(false)
    const emailError = ref(false)
    const passwordError = ref(false)

    const triggerShake = async () => {
        // reiniciar animación 
        shakeLogin.value = false
        await nextTick()
        shakeLogin.value = true
        setTimeout(() => {
            shakeLogin.value = false
        }, 350)
    }

    const handleSubmit = async () => {
        emailError.value = false
        passwordError.value = false

        if (!correo.value || !password.value) {
            errorMsg.value = 'Rellena correo y contraseña.'
            emailError.value = !correo.value
            passwordError.value = !password.value
            await triggerShake()
            return
        }

        errorMsg.value = ''

        try {
            await store.login(correo.value, password.value)
            router.push('/profile')
        } catch (err) {
            errorMsg.value = err.message || 'Error al iniciar sesión.'

            emailError.value = true
            passwordError.value = true

            await triggerShake()
        }
    }
</script>

<template>
    <div class="login">
        <section
        class="login-card"
        :class="{ 'login-card--shake': shakeLogin }"
        >
        <h2 class="login-card__title">Iniciar sesión</h2>

        <form id="formLogin" @submit.prevent="handleSubmit">
            <!-- Correo -->
            <div
            class="login-card__form-row login-card__form-row--icon"
            :class="{ 'login-card__form-row--error': emailError }"
            >
            <label for="correo" class="login-card__label">Correo electrónico</label>
            <i class="login-card__icon fa-solid fa-envelope"></i>
            <input
                id="correo"
                name="correo"
                class="login-card__input"
                placeholder="ejemplo@gmail.com"
                type="email"
                required
                v-model="correo"
            />
            </div>

            <!-- Contraseña -->
            <div
            class="login-card__form-row login-card__form-row--icon"
            :class="{ 'login-card__form-row--error': passwordError }"
            >
            <label for="password" class="login-card__label">Contraseña</label>

            <svg
                class="login-card__icon login-card__icon--lock"
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
                name="password"
                class="login-card__input"
                placeholder="**********************"
                type="password"
                required
                v-model="password"
            />
            </div>

            <!-- Mensajes-->
            <Transition name="fade-slide">
            <p
                v-if="errorMsg"
                class="login-card__error"
            >
                {{ errorMsg }}
            </p>
            </Transition>

            <!-- Contraseña olvidada -->
            <div class="login-card__form-row form-row--compact-link">
                <a href="#" class="login-card__link login-card__link--forgot">
                    ¿Contraseña olvidada?
                </a>
            </div>

            <!-- Botón iniciar -->
            <div class="login-card__form-row">
                <button
                    type="submit"
                    id="btnLogin"
                    class="login-card__button"
                    :disabled="cargando"
                >
                    {{ cargando ? 'Entrando...' : 'Iniciar sesión' }}
                </button>
            </div>

            <!-- Enlace de Registro -->
            <div class="login-card__form-row login-card__form-row--register form-row--compact-link">
                <RouterLink to="/register" class="login-card__link login-card__link--register">
                    ¿No tienes cuenta? Regístrate
                </RouterLink>
            </div>

            <!-- Recuérdame -->
            <div class="login-card__form-row">
            <label class="login-card__remember">
                <input type="checkbox" id="recordarme" v-model="remember" />
                Recuérdame
            </label>
            </div>

            <!-- Separador -->
            <div class="login-card__separator">o</div>

            <!-- Botón Google -->
            <div class="login-card__form-row">
                <button
                    type="button"
                    class="login-card__button login-card__button--google"
                >
                    <i class="fa-brands fa-google"></i> Continúa con Google
                </button>
            </div>
        </form>
        </section>
    </div>
</template>

<style scoped>
    .login {
        margin: 0 auto;
        padding: 40px 20px 120px;
        display: flex;
        justify-content: center;
    }

    .login-card {
        background: var(--card);
        border-radius: var(--radius);
        padding: var(--pad);
        border: 2px solid rgba(43, 91, 91, 0.12);
        max-width: 450px;
        width: 100%;
        margin: 0 auto;
        border-color: #2b5b5b;
        text-align: center;
    }

    .login-card__title {
        font-size: 28px;
        margin-bottom: 28px;
        font-weight: bold;
    }

    .login-card__form-row {
        margin-bottom: 22px;
        position: relative;
        text-align: left;
    }

    .form-row--compact-link {
        margin-top: -6px;
        margin-bottom: 12px;
    }

    .login-card__form-row--register {
        text-align: center;
    }

    .login-card__form-row--icon .login-card__input {
        padding-left: 46px;
    }

    .login-card__label {
        display: block;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        color: #333;
    }

    .login-card__input {
        width: 100%;
        padding: 10px 11px;
        border-radius: 10px;
        border: 1px solid #2b5b5b;
        font-family: 'Itim', sans-serif;
    }

    .login-card__input::placeholder {
        color: #666;
    }

    /* Iconos */
    .login-card__icon {
        position: absolute;
        left: 12px;
        top: 72%;
        transform: translateY(-50%);
        color: #666;
    }

    /* Candado SVG */
    .login-card__icon--lock {
    width: 22px;
    height: 22px;
    stroke: #666;
    stroke-width: 1.6;
    fill: transparent;
    margin-right: 0;
    pointer-events: none;
    }

    .login-card__link {
    font-size: 14px;
    text-decoration: underline;
    display: inline-block;
    font-weight: bold;
    }

    .login-card__link--forgot {
    color: #2b5b5b;
    }

    .login-card__link--register {
    color: #2b5b5b;
    }

    .login-card__button {
    display: block;
    margin: 16px auto 0;
    padding: 12px 52px;
    border-radius: 12px;
    background: var(--dark);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-family: 'Itim', sans-serif;
    }

    .login-card__button[disabled] {
    opacity: 0.7;
    cursor: default;
    }

    .login-card__button--google {
    background: #fff;
    color: var(--dark);
    border: 1px solid var(--dark);
    margin-bottom: 20px;
    }

    .login-card__remember {
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    }

    .login-card__separator {
    display: flex;
    align-items: center;
    text-align: center;
    color: #666;
    margin: 24px 0;
    }

    .login-card__separator::before,
    .login-card__separator::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    }

    .login-card__separator:not(:empty)::before {
    margin-right: 0.75em;
    }

    .login-card__separator:not(:empty)::after {
    margin-left: 0.75em;
    }

    /* Mensaje de error */
    .login-card__error {
    color: #e63946;
    font-size: 14px;
    margin: 0 0 8px;
    text-align: left;
    }

    /* Resaltado de campos con error */
    .login-card__form-row--error .login-card__input {
    border-color: #e63946;
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.15);
    }

    .login-card__form-row--error .login-card__icon,
    .login-card__form-row--error .login-card__icon--lock {
    color: #e63946;
    stroke: #e63946;
    }

    /* Transición del mensaje */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
    transition: opacity 0.22s ease-out, transform 0.22s ease-out;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
    }

    /* Shake del login */
    @keyframes login-shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
    100% { transform: translateX(0); }
    }

    .login-card--shake {
    animation: login-shake 0.3s;
    }
</style>
