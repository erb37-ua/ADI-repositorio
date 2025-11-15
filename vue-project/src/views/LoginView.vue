<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'

    const correo = ref('')
    const password = ref('')
    const remember = ref(false)

    const handleSubmit = () => {
        // Simulación de login (sin backend)
        console.log('Login simulado', { correo: correo.value, password: password.value, remember: remember.value })
        alert('Login simulado (sin backend todavía).')
    }
</script>

<template>
    <div class="login">
        <section class="login-card">
            <h2 class="login-card__title">Iniciar sesión</h2>

            <form id="formLogin" @submit.prevent="handleSubmit">
            <!-- Correo -->
            <div class="login-card__form-row login-card__form-row--icon">
                <label for="correo" class="login-card__label">Correo electrónico</label>
                <!-- Icono de correo (ya estaba correcto) -->
                <i class="login-card__icon fa-solid fa-envelope"></i>
                <input id="correo" name="correo" class="login-card__input" placeholder="ejemplo@gmail.com" type="email" required v-model="correo" />
            </div>

            <!-- Contraseña -->
            <div class="login-card__form-row login-card__form-row--icon">
                <label for="password" class="login-card__label">Contraseña</label>
                <!-- Icono de contraseña (ya estaba correcto) -->
                <i class="login-card__icon fa-solid fa-lock"></i>
                <input id="password" name="password" class="login-card__input" placeholder="**********************" type="password" required v-model="password" />
            </div>

            <!-- Contraseña olvidada -->
            <!-- CAMBIO 3 (BONUS): Añadida clase para ajustar espaciado -->
            <div class="login-card__form-row form-row--compact-link">
                <a href="#" class="login-card__link login-card__link--forgot">¿Contraseña olvidada?</a>
            </div>

            <!-- Botón iniciar -->
            <div class="login-card__form-row">
                <!-- CAMBIO 1: Eliminado el icono <i> de dentro del botón -->
                <button type="submit" id="btnLogin" class="login-card__button">Iniciar sesión</button>
            </div>

            <!-- Enlace de Registro -->
            <!-- CAMBIO 3 (BONUS): Añadida clase para ajustar espaciado -->
            <div class="login-card__form-row login-card__form-row--register form-row--compact-link">
                 <RouterLink to="/register" class="login-card__link login-card__link--register">¿No tienes cuenta? Regístrate</RouterLink>
            </div>

            <!-- Recuérdame -->
            <div class="login-card__form-row">
                <label class="login-card__remember"><input type="checkbox" id="recordarme" v-model="remember" /> Recuérdame</label>
            </div>

            <!-- Separador -->
            <div class="login-card__separator">o</div>

            <!-- Botón Google -->
            <div class="login-card__form-row">
                <button type="button" class="login-card__button login-card__button--google"><i class="fa-brands fa-google"></i> Continúa con Google</button>
            </div>
            </form>
        </section>
    </div>
</template>

<style scoped>
    .login{
        margin:0 auto;
        padding:40px 20px 120px;
        display:flex;
        justify-content:center;
    }

    .login-card{
        background:var(--card);
        border-radius:var(--radius);
        padding:var(--pad);
        border:2px solid rgba(43,91,91,0.12);
        max-width: 450px;
        width:100%;
        margin:0 auto;
        border-color:#2b5b5b;
        text-align:center;
    }

    .login-card__title{
        font-size:28px;
        margin-bottom:28px;
        font-weight: bold;
    }

    .login-card__form-row{
        margin-bottom:18px;
        position:relative;
        text-align:left;
    }
    
    /* CAMBIO 3 (BONUS): Nueva clase para las filas de enlaces */
    .form-row--compact-link {
        margin-top: -10px;  /* Sube la fila entera */
        margin-bottom: 10px; /* Reduce el espacio de abajo */
    }

    .login-card__form-row--register {
        text-align: center;
    }

    .login-card__form-row--icon .login-card__input{
        padding-left:40px;
    }

    .login-card__label{
        display:block;
        font-size:16px;
        font-weight:bold;
        margin-bottom:8px;
        color:#333;
    }

    .login-card__input{
        width:100%;
        padding:10px 11px;
        border-radius:10px;
        border:1px solid #2b5b5b;
        font-family: 'Itim', sans-serif;
    }

    .login-card__icon{
        position:absolute;
        left:12px;
        top:70%;
        transform:translateY(-50%);
        color:#666;
    }

    .login-card__link{
        font-size:14px;
        text-decoration:underline;
        display:inline-block;
        /* CAMBIO 3 (BONUS): Quitado el margin-top negativo de aquí */
        /* margin-top: -30px; */
        font-weight:bold;
    }

    .login-card__link--forgot{
        color:#2b5b5b;
    }

    .login-card__link--register{
        color:#2b5b5b;
    }

    .login-card__button{
        display:block;
        margin:0 auto;
        padding:12px 52px;
        border-radius:12px;
        background:var(--dark);
        color:#fff;
        border:none;
        cursor:pointer;
        font-size:15px;
        font-family: 'Itim', sans-serif;
    }
    
    .login-card__button--google{
        background:#fff;
        color:var(--dark);
        border:1px solid var(--dark);
        margin-bottom:20px;
    }
    
    .login-card__remember{
        font-size:14px;
        color:#333;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:6px;
    }

    .login-card__separator{
        display:flex;
        align-items:center;
        text-align:center;
        color:#666;
        margin:20px 0;
    }

    .login-card__separator::before,.login-card__separator::after{
        content:"";
        flex:1;
        border-bottom:1px solid #ccc;
    }

    .login-card__separator:not(:empty)::before{
        margin-right:.75em;
    }

    .login-card__separator:not(:empty)::after{
        margin-left:.75em;
    }
</style>