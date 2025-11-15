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
    <div>
        <!-- Header -->
        <header class="header">
        <div class="header__inner">
            <div class="header__left">
            <RouterLink to="/"><img src="/logo.png" alt="Logo" class="header__logo" /></RouterLink>
            </div>
        </div>
        </header>

        <!-- Main -->
        <main class="login">
        <section class="login-card">
            <h2 class="login-card__title">Iniciar sesión</h2>

            <form id="formLogin" @submit.prevent="handleSubmit">
            <!-- Correo -->
            <div class="login-card__form-row login-card__form-row--icon">
                <label for="correo" class="login-card__label">Correo electrónico</label>
                <i class="login-card__icon fa-solid fa-envelope"></i>
                <input id="correo" name="correo" class="login-card__input" placeholder="ejemplo@gmail.com" type="email" required v-model="correo" />
            </div>

            <!-- Contraseña -->
            <div class="login-card__form-row login-card__form-row--icon">
                <label for="password" class="login-card__label">Contraseña</label>
                <i class="login-card__icon fa-solid fa-lock"></i>
                <input id="password" name="password" class="login-card__input" placeholder="**********************" type="password" required v-model="password" />
            </div>

            <!-- Contraseña olvidada -->
            <div class="login-card__form-row">
                <a href="#" class="login-card__link login-card__link--forgot">¿Contraseña olvidada?</a>
            </div>

            <!-- Botón iniciar -->
            <div class="login-card__form-row">
                <button type="submit" id="btnLogin" class="login-card__button"><i class="fa-solid fa-right-to-bracket"></i> Iniciar sesión</button>
            </div>

            <!-- Recuérdame -->
            <div class="login-card__form-row">
                <label class="login-card__remember"><input type="checkbox" id="recordarme" v-model="remember" /> Recuérdame</label>
            </div>

            <!-- Separador -->
            <div class="login-card__separator">o</div>

            <!-- Botón Google y registro -->
            <div class="login-card__form-row">
                <button type="button" class="login-card__button login-card__button--google"><i class="fa-brands fa-google"></i> Continúa con Google</button>
                <RouterLink to="/register" class="login-card__link login-card__link--register">¿No tienes cuenta? Regístrate</RouterLink>
            </div>
            </form>
        </section>
        </main>

        <!-- Footer -->
        <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__left">&copy; 2025 Recetarizada</div>
            <nav class="site-footer__center" aria-label="Enlaces legales">
            <RouterLink to="/legal/aviso-legal">Aviso Legal</RouterLink>
            <RouterLink to="/legal/politica-privacidad">Política de Privacidad</RouterLink>
            <RouterLink to="/legal/politica-cookies">Política de Cookies</RouterLink>
            </nav>
            <div class="site-footer__right" aria-label="Redes sociales">
            <a class="site-footer__social-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img class="site-footer__social-icon" src="/youtube.png" alt="YouTube" /></a>
            <a class="site-footer__social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img class="site-footer__social-icon" src="/instagram.png" alt="Instagram" /></a>
            <a class="site-footer__social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img class="site-footer__social-icon" src="/tiktok.png" alt="TikTok" /></a>
            <a class="site-footer__social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img class="site-footer__social-icon" src="/twitter.png" alt="Twitter" /></a>
            <a class="site-footer__social-link" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><img class="site-footer__social-icon" src="/pinterest.png" alt="Pinterest" /></a>
            <a class="site-footer__social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img class="site-footer__social-icon" src="/facebook.png" alt="Facebook" /></a>
            </div>
        </div>
        </footer>
    </div>
</template>

<style>
:root{--accent:#c65a48;--dark:#2b5b5b;--bg:#fbf8f6;--card:#fff;--radius:14px;--maxw:400px;--pad:24px;--footer-h:56px;}
*{box-sizing:border-box;margin:0;padding:0;font-family:'Itim';}
body{background:var(--bg);color:#111;line-height:1.4;padding-top:72px;}
main{flex:1;}
html,body{margin:0;padding:0;}
.header{width:100%;height:134px;padding:8px;background:#D2694C;border:1px solid #C9A66B;box-sizing:border-box;}
.header__inner{display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;padding:0 16px;box-sizing:border-box;}
.header__left{display:flex;align-items:center;}
.header__logo{width:77px;height:77px;}
.site-footer{background:#D2694C;color:#000000;padding:16px 0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;font-size:14px;margin-top:auto;width:100%;}
.site-footer__inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;width:100%;padding:0 24px;box-sizing:border-box;}
.site-footer__left{text-align:left;}
.site-footer__center{flex:1;text-align:center;}
.site-footer__center a{margin:0 12px;color:inherit;text-decoration:none;white-space:nowrap;}
.site-footer__center a:hover,.site-footer__center a:focus{text-decoration:underline;}
.site-footer__right{display:flex;gap:10px;align-items:center;}
.site-footer__social-link{display:inline-block;width:28px;height:28px;}
.site-footer__social-icon{width:100%;height:100%;object-fit:contain;display:block;}
@media(max-width:600px){
    .site-footer__inner{flex-direction:column;align-items:center;}
    .site-footer__left,.site-footer__center,.site-footer__right{width:100%;text-align:center;margin-top:8px;}
}
.login{margin:0 auto;padding:40px 20px 120px;display:flex;justify-content:center;}
.login-card{background:var(--card);border-radius:var(--radius);padding:var(--pad);border:2px solid rgba(43,91,91,0.12);max-width:var(--maxw);width:100%;margin:0 auto;border-color:#2b5b5b;text-align:center;}
.login-card__title{font-size:28px;margin-bottom:28px;}
.login-card__form-row{margin-bottom:18px;position:relative;text-align:left;}
.login-card__form-row--icon .login-card__input{padding-left:40px;}
.login-card__label{display:block;font-size:16px;font-weight:bold;margin-bottom:8px;color:#333;}
.login-card__input{width:100%;padding:10px 11px;border-radius:10px;border:1px solid #2b5b5b;}
.login-card__icon{position:absolute;left:12px;top:70%;transform:translateY(-50%);color:#666;}
.login-card__link{font-size:14px;text-decoration:underline;display:inline-block;margin-top:-8px;font-weight:bold;}
.login-card__link--forgot{color:#2b5b5b;}
.login-card__link--register{margin-left:10px;color:#2b5b5b;}
.login-card__button{display:block;margin:0 auto;padding:12px 52px;border-radius:12px;background:var(--dark);color:#fff;border:none;cursor:pointer;font-size:15px;}
.login-card__button--google{background:#fff;color:var(--dark);border:1px solid var(--dark);margin-bottom:20px;}
.login-card__remember{font-size:14px;color:#333;display:flex;align-items:center;justify-content:center;gap:6px;}
.login-card__separator{display:flex;align-items:center;text-align:center;color:#666;margin:20px 0;}
.login-card__separator::before,.login-card__separator::after{content:"";flex:1;border-bottom:1px solid #ccc;}
.login-card__separator:not(:empty)::before{margin-right:.75em;}
.login-card__separator:not(:empty)::after{margin-left:.75em;}
.login-card__button i{margin-right:8px;vertical-align:middle;}
</style>
