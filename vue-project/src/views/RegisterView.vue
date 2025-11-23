<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'

const router = useRouter()
const store = useMainStore()

const name = ref('')
const correo = ref('')
const password = ref('')
const passwordConfirm = ref('')

const errorMsg = ref('')
const cargando = computed(() => store.authLoading)

// Estado visual
const shakeSignup = ref(false)
const nameError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)
const passwordConfirmError = ref(false)

const resetErrors = () => {
  nameError.value = false
  emailError.value = false
  passwordError.value = false
  passwordConfirmError.value = false
}

const triggerShake = async () => {
  shakeSignup.value = false
  await nextTick()
  shakeSignup.value = true
  setTimeout(() => {
    shakeSignup.value = false
  }, 350)
}

// Validación de email "tipo PocketBase"
const isValidEmail = (email) => {
  // Aproximación razonable a lo que suele aceptar:
  // algo@dominio.ext (sin espacios, con un punto en el dominio)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  resetErrors()
  errorMsg.value = ''

  // 1) Campos obligatorios
  if (!name.value || !correo.value || !password.value || !passwordConfirm.value) {
    errorMsg.value = 'Rellena todos los campos.'
    nameError.value = !name.value
    emailError.value = !correo.value
    passwordError.value = !password.value
    passwordConfirmError.value = !passwordConfirm.value
    await triggerShake()
    return
  }

  // 2) Formato de correo
  if (!isValidEmail(correo.value)) {
    errorMsg.value = 'Introduce un correo electrónico válido.'
    emailError.value = true
    await triggerShake()
    return
  }

  // 3) Longitud mínima de contraseña
  if (password.value.length < 8) {
    errorMsg.value = 'La contraseña debe tener al menos 8 caracteres.'
    passwordError.value = true
    passwordConfirmError.value = true
    await triggerShake()
    return
  }

  // 4) Coincidencia de contraseñas
  if (password.value !== passwordConfirm.value) {
    errorMsg.value = 'Las contraseñas no coinciden.'
    passwordError.value = true
    passwordConfirmError.value = true
    await triggerShake()
    return
  }

  try {
    await store.register({
      name: name.value,
      email: correo.value,
      password: password.value,
    })

    router.push('/profile')
  } catch (err) {
    // Aquí ya es PocketBase (email duplicado, reglas, etc.)
    errorMsg.value = err.message || 'No se pudo crear la cuenta.'

    const msg = (errorMsg.value || '').toLowerCase()
    if (msg.includes('email') || msg.includes('correo')) {
      emailError.value = true
    }
    if (msg.includes('password') || msg.includes('contraseña')) {
      passwordError.value = true
      passwordConfirmError.value = true
    }

    await triggerShake()
  }
}
</script>

<template>
  <div class="signup">
    <section
      class="signup-card"
      :class="{ 'signup-card--shake': shakeSignup }"
    >
      <h2 class="signup-card__title">Crear cuenta</h2>

      <div class="signup-card__row">
        <button class="signup-card__btn signup-card__btn--google" type="button">
          <i class="signup-card__icon fa-brands fa-google"></i>
          Continúa con Google
        </button>
      </div>

      <div class="signup-card__separator">o</div>

      <form id="formRegistro" @submit.prevent="handleSubmit">
        <div
          class="signup-card__row signup-card__input-icon"
          :class="{ 'signup-card__row--error': nameError }"
        >
          <label for="name" class="signup-card__label">Nombre de Usuario</label>
          <i class="signup-card__icon fa-solid fa-user"></i>
          <input
            id="name"
            class="signup-card__input"
            placeholder="Tu Nombre"
            type="text"
            required
            v-model="name"
          />
        </div>

        <div
          class="signup-card__row signup-card__input-icon"
          :class="{ 'signup-card__row--error': emailError }"
        >
          <label for="correo" class="signup-card__label">Correo electrónico</label>
          <i class="signup-card__icon fa-solid fa-envelope"></i>
          <input
            id="correo"
            class="signup-card__input"
            placeholder="ejemplo@gmail.com"
            type="email"
            required
            v-model="correo"
          />
        </div>

        <div
          class="signup-card__row signup-card__input-icon"
          :class="{ 'signup-card__row--error': passwordError }"
        >
          <label for="password" class="signup-card__label">Contraseña</label>

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
            v-model="password"
          />
        </div>

        <div
          class="signup-card__row signup-card__input-icon"
          :class="{ 'signup-card__row--error': passwordConfirmError }"
        >
          <label for="passwordConfirm" class="signup-card__label">Confirmar Contraseña</label>

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
            v-model="passwordConfirm"
          />
        </div>

        <div class="signup-card__row">
          <button
            id="btnCrearCuenta"
            type="submit"
            class="signup-card__btn"
            :disabled="cargando"
          >
            {{ cargando ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>
        </div>

        <Transition name="fade-slide">
          <p v-if="errorMsg" class="signup-card__error">
            {{ errorMsg }}
          </p>
        </Transition>
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
        font-weight: 700;
    }

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

    .signup-card__row button {
        display: block;
        margin: 16px auto 0;
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

    .signup-card__btn[disabled] {
        opacity: 0.7;
        cursor: default;
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
        margin: 24px 0;
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

    /* Mensaje de error */
    .signup-card__error {
    color: #e63946;
    font-size: 14px;
    margin: 0;
    text-align: left;
    }

    /* Resaltado de campos con error */
    .signup-card__row--error .signup-card__input {
    border-color: #e63946;
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.15);
    }

    .signup-card__row--error .signup-card__icon,
    .signup-card__row--error .signup-card__icon--lock {
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

    /* Shake del registro */
    @keyframes signup-shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
    100% { transform: translateX(0); }
    }

    .signup-card--shake {
    animation: signup-shake 0.3s;
    }
</style>
