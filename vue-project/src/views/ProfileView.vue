<script setup>
    import { ref, onMounted, computed, nextTick } from 'vue'
    import { useRouter } from 'vue-router'
    import { useMainStore } from '@/stores/main'

    const router = useRouter()
    const store = useMainStore()

    const nombre = ref('')
    const correo = ref('')
    const passOld = ref('')
    const pass = ref('')
    const pass2 = ref('')

    const errorMsg = ref('')
    const infoMsg = ref('')

    const cargando = computed(() => store.authLoading)

    // Estado visual
    const shakeForm = ref(false)
    const passwordError = ref(false)
    const currentPassError = ref(false)

    const triggerShake = async () => {
    // reinicia la animación para poder dispararla varias veces seguidas
        shakeForm.value = false
        await nextTick()
        shakeForm.value = true
        setTimeout(() => {
            shakeForm.value = false
        }, 400)
    }

    onMounted(() => {
        if (!store.isLogged) {
            router.push('/login')
            return
        }

    const user = store.user
    nombre.value = user?.name || ''
    correo.value = user?.email || ''
    })

    const handleSave = async () => {
        // Validación de contraseñas
        if (pass.value && pass.value !== pass2.value) {
            errorMsg.value = 'Las contraseñas no coinciden.'
            infoMsg.value = ''
            passwordError.value = true
            currentPassError.value = false
            await triggerShake()
            return
        }

        errorMsg.value = ''
        infoMsg.value = ''
        passwordError.value = false
        currentPassError.value = false

        try {
            await store.updateProfile({
            name: nombre.value,
            email: correo.value,
            password: pass.value || undefined,
            passwordConfirm: pass2.value || undefined,
            oldPassword: passOld.value || undefined,
            })

            infoMsg.value = 'Perfil actualizado correctamente.'
            pass.value = ''
            pass2.value = ''
            passOld.value = ''
        } catch (error) {
            console.error('updateProfile error', error)
            errorMsg.value = error.message || 'No se pudo actualizar el perfil.'

            const msg = errorMsg.value.toLowerCase()
            // Si el backend dice que la contraseña actual es incorrecta, marcamos ese campo
            if (msg.includes('contraseña actual') || msg.includes('current password')) {
            currentPassError.value = true
            }

            await triggerShake()
        }
    }

    const handleLogout = () => {
        store.logout()
        router.push('/login')
    }

    const handleDelete = async () => {
        if (!confirm('¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            return
        }

        try {
            await store.deleteAccount()
            router.push('/')
        } catch (error) {
            errorMsg.value = error.message || 'No se pudo eliminar la cuenta.'
            await triggerShake()
        }
    }
</script>

<template>
    <div class="profile">
        <section
        class="profile-card"
        :class="{ 'profile-card--shake': shakeForm }"
        >
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

            <!-- Contraseña actual -->
            <div
                class="profile-card__row"
                :class="{ 'profile-card__row--error': currentPassError }"
                >
                <label for="passOld" class="profile-card__label">
                    Contraseña actual
                </label>
                <div class="profile-card__input-icon">
                    <svg
                    class="profile-card__icon profile-card__icon--lock"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    >
                    <rect x="5" y="10" width="14" height="10" rx="2" ry="2" />
                    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
                    <circle cx="12" cy="15" r="1.3" />
                    </svg>

                    <input
                    id="passOld"
                    class="profile-card__input"
                    type="password"
                    placeholder="Contraseña actual"
                    v-model="passOld"
                    />
                </div>
            </div>

            <!-- Nueva contraseña -->
            <div
                class="profile-card__row"
                :class="{ 'profile-card__row--error': passwordError }"
                >
                <label for="pass" class="profile-card__label">
                    Contraseña
                </label>
                <div class="profile-card__input-icon">
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
                    id="pass"
                    class="profile-card__input"
                    type="password"
                    placeholder="**********************"
                    v-model="pass"
                    />
                </div>
            </div>

            <!-- Repetir contraseña -->
            <div
                class="profile-card__row"
                :class="{ 'profile-card__row--error': passwordError }"
                >
                <label for="pass2" class="profile-card__label">
                    Repetir contraseña
                </label>
                <div class="profile-card__input-icon">
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

                    <input id="pass2"
                    class="profile-card__input"
                    type="password"
                    placeholder="**********************"
                    v-model="pass2"
                    />
                </div>
            </div>

            <!-- MENSAJES -->
            <Transition name="fade-slide">
            <div
                class="profile-card__row"
                v-if="errorMsg || infoMsg"
            >
                <p v-if="errorMsg" class="profile-card__error">
                    {{ errorMsg }}
                </p>
                <p v-if="infoMsg" class="profile-card__info">
                    {{ infoMsg }}
                </p>
            </div>
            </Transition>

            <!-- Botones -->
            <div class="profile-card__row profile-card__buttons">
            <button type="submit" class="profile-card__btn" :disabled="cargando">
                {{ cargando ? 'Guardando...' : 'Guardar cambios' }}
            </button>
            <button type="button" class="profile-card__btn" id="btnCerrarSesion" @click="handleLogout">
                Cerrar sesión
            </button>
            </div>
        </form>

        <div class="profile-card__row profile-card__delete">
            <button type="button" class="profile-card__btn profile-card__btn--danger" @click="handleDelete">
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

    /* Candado SVG */
    .profile-card__icon--lock {
        width: 22px;
        height: 22px;
        stroke: #666;
        stroke-width: 1.6;
        fill: transparent;
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
        font-weight: 400;
        font-family: 'Itim', sans-serif;
    }

    .profile-card__btn[disabled] {
        opacity: 0.7;
        cursor: default;
    }

    .profile-card__btn--danger {
        background: var(--accent);
        color: #fff;
        border-radius: 12px;
        padding: 12px 25px;
        border: none;
        cursor: pointer;
        font-weight: 400;
        font-family: 'Itim', sans-serif;
    }

    .profile-card__delete {
        text-align: center;
        margin-top: 12px;
    }

    /* Mensajes */
    .profile-card__error {
        color: #e63946;
        font-size: 14px;
        margin: 0;
    }

    .profile-card__info {
        color: #2b9348;
        font-size: 14px;
        margin: 0;
    }

    /* Resaltado de campos con error */
    .profile-card__row--error .profile-card__input {
        border-color: #e63946;
        box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.15);
    }

    .profile-card__row--error .profile-card__icon,
    .profile-card__row--error .profile-card__icon--lock {
        color: #e63946;
        stroke: #e63946;
    }

    /* Transición de aparición/desaparición del mensaje */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: opacity 0.22s ease-out, transform 0.22s ease-out;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-6px);
    }

    /* Shake del formulario (cuando hay error) */
    @keyframes profile-shake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
        100% { transform: translateX(0); }
    }

    .profile-card--shake {
        animation: profile-shake 0.3s;
    }
</style>
