<template>
<div>
    <!-- Header -->
    <header class="header">
    <div class="header__inner">
        <div class="header__left">
        <!-- Logo: navegación interna con RouterLink -->
        <RouterLink to="/"><img src="/logo.png" alt="Logo" class="header__logo" /></RouterLink>
        </div>
    </div>
    </header>

    <!-- Main -->
    <main class="signup">
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
        <!-- Antes: <a href="/frontend/pages/legal/politica-privacidad.html"> -->
        <RouterLink to="/privacidad" class="signup-card__terms-link">Política de Privacidad</RouterLink>
        de esta página.
        </div>
    </section>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
    <div class="site-footer__inner">
        <!-- Izquierda -->
        <div class="site-footer__left">&copy; 2025 Recetarizada</div>

        <!-- Centro: navegación interna con RouterLink -->
        <nav class="site-footer__center" aria-label="Enlaces legales">
        <RouterLink to="/legal/aviso-legal">Aviso Legal</RouterLink>
        <RouterLink to="/legal/politica-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/legal/politica-cookies">Política de Cookies</RouterLink>
        </nav>

        <!-- Derecha: iconos de redes sociales (externo => <a>) -->
        <div class="site-footer__right" aria-label="Redes sociales">
        <a class="site-footer__social-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img class="site-footer__social-icon" src="/youtube.png" alt="YouTube" />
        </a>
        <a class="site-footer__social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img class="site-footer__social-icon" src="/instagram.png" alt="Instagram" />
        </a>
        <a class="site-footer__social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img class="site-footer__social-icon" src="/tiktok.png" alt="TikTok" />
        </a>
        <a class="site-footer__social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img class="site-footer__social-icon" src="/twitter.png" alt="Twitter" />
        </a>
        <a class="site-footer__social-link" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <img class="site-footer__social-icon" src="/pinterest.png" alt="Pinterest" />
        </a>
        <a class="site-footer__social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img class="site-footer__social-icon" src="/facebook.png" alt="Facebook" />
        </a>
        </div>
    </div>
    </footer>
</div>
</template>

<style>
:root {
--accent: #c65a48;
--dark: #2b5b5b;
--bg: #fbf8f6;
--card: #fff;
--radius: 14px;
--maxw: 450px;
--pad: 24px;
--footer-h: 56px;
}

* {
box-sizing: border-box;
margin: 0;
padding: 0;
font-family: "Itim";
}

body {
background: var(--bg);
color: #111;
line-height: 1.4;
padding-top: 72px;
}

main {
flex: 1;
}

/* ==================== Header ==================== */
html,
body {
margin: 0;
padding: 0;
}

.header {
width: 100%;
height: 134px;
padding: 8px;
background: #d2694c;
border: 1px solid #c9a66b;
box-sizing: border-box;
}

.header__inner {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100%;
padding: 0 16px;
box-sizing: border-box;
}

.header__left {
display: flex;
align-items: center;
}

.header__logo {
width: 77px;
height: 77px;
}

/* ==================== Footer ==================== */
.site-footer {
background: #d2694c;
color: #000000;
padding: 16px 0;
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
font-size: 14px;
margin-top: auto;
width: 100%;
}

.site-footer__inner {
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
width: 100%;
padding: 0 24px;
box-sizing: border-box;
}

.site-footer__left {
text-align: left;
}

.site-footer__center {
flex: 1;
text-align: center;
}

.site-footer__center a {
margin: 0 12px;
color: inherit;
text-decoration: none;
white-space: nowrap;
}

.site-footer__center a:hover,
.site-footer__center a:focus {
text-decoration: underline;
}

.site-footer__right {
display: flex;
gap: 10px;
align-items: center;
}

.site-footer__social-link {
display: inline-block;
width: 28px;
height: 28px;
}

.site-footer__social-icon {
width: 100%;
height: 100%;
object-fit: contain;
display: block;
}

/* ==================== Footer Responsive ==================== */
@media (max-width: 600px) {
.site-footer__inner {
    flex-direction: column;
    align-items: center;
}

.site-footer__left,
.site-footer__center,
.site-footer__right {
    width: 100%;
    text-align: center;
    margin-top: 8px;
}
}

/* ==================== Signup ==================== */
.signup {
margin: 0 auto;
padding: 40px 20px 120px;
}

.signup-card {
background: var(--card);
border-radius: var(--radius);
padding: var(--pad);
border: 2px solid rgba(43, 91, 91, 0.12);
max-width: var(--maxw);
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
