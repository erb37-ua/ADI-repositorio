<template>
<div>
    <!-- Header -->
    <header class="header">
    <div class="header__inner">
        <div class="header__left">
        <!--
        <a href="/frontend/pages/home/index.html">
            <img src="/frontend/pages/imagenes/logo.png" alt="Logo" class="header__logo">
        </a>
        -->
        <img
            src="/logo.png"
            alt="Logo"
            class="header__logo"
        />
        </div>

        <nav class="header__nav">
        <!--
        <a href="/frontend/pages/list/index.html" class="header__nav-item">RECETAS</a>
        -->
        <span class="header__nav-item">RECETAS</span>

        <input
            type="checkbox"
            id="toggle-filtros"
            class="header__toggle-filtros"
        />
        <label
            for="toggle-filtros"
            class="header__nav-item header__nav-item--filtros"
        >
            FILTROS
        </label>

        <!--
        <a href="/frontend/pages/contact/index.html" class="header__nav-item">CONTACTO</a>
        <a href="/frontend/pages/about/index.html" class="header__nav-item">SOBRE MÍ</a>
        -->
        <span class="header__nav-item">CONTACTO</span>
        <span class="header__nav-item">SOBRE MÍ</span>
        </nav>

        <div class="header__search">
        <img
            src="/lupa.png"
            alt="Buscar"
            class="header__search-icon"
        />
        <input
            type="text"
            class="header__search-input"
            placeholder="   Buscar..."
        />
        </div>

        <div class="header__right">
        <!--
        <a href="/frontend/pages/profile/index.html">
            <img src="/frontend/pages/imagenes/icono-perfil.png" alt="Perfil" class="header__profile-icon">
        </a>
        -->
        <img
            src="/icono-perfil.png"
            alt="Perfil"
            class="header__profile-icon"
        />
        </div>
    </div>
    </header>

    <!-- Main -->
    <main class="main-container">
        <div class="about-section">
            <div class="about-section__text">
                <h1 class="about-section__title">Aviso Legal</h1>

                <p class="about-section__paragraph">
                    En cumplimiento con la legislación vigente, se informa a los usuarios que el sitio web
                    <strong>Recetarizada</strong> es gestionado por una persona particular.
                    El acceso a esta web implica la aceptación de los términos y condiciones descritos en este aviso.
                </p>

                <p class="about-section__paragraph">
                    Todos los contenidos publicados —incluyendo textos, imágenes, recetas y código— son propiedad de Recetarizada
                    o se utilizan con autorización de sus autores.
                    Queda prohibida la reproducción total o parcial sin consentimiento previo por escrito.
                </p>

                <p class="about-section__paragraph">
                    Recetarizada no se hace responsable del uso indebido de la información ni de posibles daños derivados del
                    acceso o utilización de los contenidos del sitio web.
                </p>

                <p class="about-section__paragraph">
                    Para cualquier duda o comunicación relacionada con esta web, puedes contactar a través del formulario
                    de contacto disponible en la sección
                    <RouterLink to="/contact">Contacto</RouterLink>.
                </p>
            </div>

            <div class="about-section__image">
                <img src="/legal.png" alt="Aviso Legal" class="about-section__img"/>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
    <div class="site-footer__inner">
        <!-- Izquierda -->
        <div class="site-footer__left">
        &copy; 2025 Recetarizada
        </div>

        <!-- Centro -->
        <nav class="site-footer__center" aria-label="Enlaces legales">
        <!--
        <a href="/frontend/pages/legal/aviso-legal.html">Aviso Legal</a>
        <a href="/frontend/pages/legal/politica-privacidad.html">Política de Privacidad</a>
        <a href="/frontend/pages/legal/politica-cookies.html">Política de Cookies</a>
        -->
        <span>Aviso Legal</span>
        <span>Política de Privacidad</span>
        <span>Política de Cookies</span>
        </nav>

        <!-- Derecha: iconos de redes sociales -->
        <div class="site-footer__right" aria-label="Redes sociales">
        <!--
        <a class="site-footer__social-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/youtube.png" alt="YouTube">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/youtube.png"
            alt="YouTube"
            />
        </div>

        <!--
        <a class="site-footer__social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/instagram.png" alt="Instagram">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/instagram.png"
            alt="Instagram"
            />
        </div>

        <!--
        <a class="site-footer__social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/tiktok.png" alt="TikTok">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/tiktok.png"
            alt="TikTok"
            />
        </div>

        <!--
        <a class="site-footer__social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/twitter.png" alt="Twitter">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/twitter.png"
            alt="Twitter"
            />
        </div>

        <!--
        <a class="site-footer__social-link" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/pinterest.png" alt="Pinterest">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/pinterest.png"
            alt="Pinterest"
            />
        </div>

        <!--
        <a class="site-footer__social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img class="site-footer__social-icon" src="/frontend/pages/imagenes/facebook.png" alt="Facebook">
        </a>
        -->
        <div class="site-footer__social-link">
            <img
            class="site-footer__social-icon"
            src="/facebook.png"
            alt="Facebook"
            />
        </div>
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
--maxw: 720px;
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
display: flex;
flex-direction: column;
min-height: 100vh;
}

main {
flex: 1;
}

/* Header */
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

.header__nav {
display: flex;
gap: 40px;
margin-left: 0;
white-space: nowrap;
}

.header__nav-item {
width: auto;
height: 36px;
color: #000000;
font-family: "Itim";
font-weight: 400;
font-size: 26px;
text-align: left;
text-decoration: none;
}

.header__nav-item--filtros {
cursor: pointer;
width: 98px;
}

.header__search {
display: flex;
align-items: center;
background: #c9a66b;
border: 1px solid #000000;
border-radius: 32px;
padding: 0 12px;
height: 40px;
width: 400px;
}

.header__search-input {
border: none;
background: transparent;
width: 100%;
font-family: "Itim";
font-size: 18px;
margin-left: 8px;
}

.header__search-icon {
width: 20px;
height: 20px;
}

.header__right {
display: flex;
align-items: center;
}

.header__profile-icon {
width: 57px;
height: 57px;
}

.header__toggle-filtros {
position: absolute;
left: -9999px;
}

/* Footer */
.site-footer {
background: #d2694c;
color: #000000;
padding: 16px 0;
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
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

.site-footer__center a,
.site-footer__center span {
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

/* Contenido principal tipo "about" */
.main-container {
max-width: 1100px;
margin: 0 auto;
padding: 40px 20px 120px;
}

.about-section {
display: flex;
align-items: flex-start;
gap: 150px;
}

.about-section__text {
flex: 2;
text-align: justify;
}

.about-section__title {
font-size: 32px;
margin-bottom: 20px;
}

.about-section__paragraph {
margin-bottom: 15px;
}

.about-section__image {
flex: 1;
}

.about-section__img {
max-width: 250px;
border-radius: 6%;
object-fit: cover;
}
</style>
