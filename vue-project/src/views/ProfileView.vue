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
        alert("Las contraseñas no coinciden.");
        return;
    }
    alert("Cambios de perfil guardados (demo, sin backend).");
};

const handleLogout = () => {
    alert("Cierre de sesión simulado.");
    router.push("/login");
};

const handleDelete = () => {
    if (confirm("¿Seguro que quieres eliminar la cuenta? (solo demo)")) {
        alert("Cuenta eliminada (simulación, sin backend).");
    }
};
</script>

<template>
    <div>
        <!-- Header -->
        <header class="header">
        <div class="header__inner">
            <div class="header__left">
            <RouterLink to="/">
                <img src="/logo.png" alt="Logo" class="header__logo" />
            </RouterLink>
            </div>

            <nav class="header__nav">
            <RouterLink to="/recipes" class="header__nav-item">
                RECETAS
            </RouterLink>

            <input type="checkbox" id="toggle-filtros" class="header__toggle-filtros"/>
            <label for="toggle-filtros" class="header__nav-item header__nav-item--filtros">
                FILTROS
            </label>

            <RouterLink to="/contact" class="header__nav-item">
                CONTACTO
            </RouterLink>
            <RouterLink to="/about" class="header__nav-item">
                SOBRE MÍ
            </RouterLink>
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
            <RouterLink to="/profile">
                <img
                src="/icono-perfil.png"
                alt="Perfil"
                class="header__profile-icon"
                />
            </RouterLink>
            </div>
        </div>
        </header>

        <!-- Main -->
        <main class="profile">
        <section class="profile-card">
            <h2 class="profile-card__title">Perfil</h2>

            <form id="formPerfil" novalidate @submit.prevent="handleSave">
            <div class="profile-card__row">
                <label for="nombre" class="profile-card__label">
                Nombre
                </label>
                <div class="profile-card__input-icon">
                    <i class="profile-card__icon fa-solid fa-user"></i>
                    <input id="nombre" class="profile-card__input" type="text" placeholder="Tu nombre" required v-model="nombre"/>
                </div>
            </div>

            <div class="profile-card__row">
                <label for="correo" class="profile-card__label">
                Correo electrónico
                </label>
                <div class="profile-card__input-icon">
                    <i class="profile-card__icon fa-solid fa-envelope"></i>
                <input id="correo" class="profile-card__input" type="email" placeholder="ejemplo@gmail.com" :value="correo" disabled />
                </div>
            </div>

            <div class="profile-card__row">
                <label for="pass" class="profile-card__label">
                Contraseña
                </label>
                <div class="profile-card__input-icon">
                    <i class="profile-card__icon fa-solid fa-lock"></i>
                    <input id="pass" class="profile-card__input" type="password" placeholder="********" v-model="pass"/>
                </div>
            </div>

            <div class="profile-card__row">
                <label for="pass2" class="profile-card__label">
                Repetir contraseña
                </label>
                <div class="profile-card__input-icon">
                    <i class="profile-card__icon fa-solid fa-lock"></i>
                    <input id="pass2" class="profile-card__input" type="password" placeholder="********"v-model="pass2"/>
                </div>
            </div>

            <div class="profile-card__row profile-card__buttons">
                <button type="submit" class="profile-card__btn">
                Guardar cambios
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
        </main>

        <!-- Footer -->
        <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__left">&copy; 2025 Recetarizada</div>

            <nav class="site-footer__center" aria-label="Enlaces legales">
            <RouterLink to="/legal/aviso-legal">
                Aviso Legal
            </RouterLink>
            <RouterLink to="/legal/politica-privacidad">
                Política de Privacidad
            </RouterLink>
            <RouterLink to="/legal/politica-cookies">
                Política de Cookies
            </RouterLink>
            </nav>

            <div class="site-footer__right" aria-label="Redes sociales">
            <a
                class="site-footer__social-link"
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
            >
                <img
                class="site-footer__social-icon"
                src="/youtube.png"
                alt="YouTube"
                />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
            >
                <img
                class="site-footer__social-icon"
                src="/instagram.png"
                alt="Instagram"
                />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
            >
                <img
                class="site-footer__social-icon"
                src="/tiktok.png"
                alt="TikTok"
                />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
            >
                <img
                class="site-footer__social-icon"
                src="/twitter.png"
                alt="Twitter"
                />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
            >
                <img
                class="site-footer__social-icon"
                src="/pinterest.png"
                alt="Pinterest"
                />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
            >
                <img
                class="site-footer__social-icon"
                src="/facebook.png"
                alt="Facebook"
                />
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
  --maxw: 420px;
  --pad: 24px;
  --footer-h: 56px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Itim", cursive;
}

html,
body {
  margin: 0;
  padding: 0;
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

/* Header */

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
    max-width: var(--maxw);
    margin: 0 auto;
}

.profile-card__title {
    font-size: 28px;
    margin-bottom: 28px;
    text-align: center;
    font-weight: 700;
}

.profile-card__row {
    margin-bottom: 18px;
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
    color: #666;
    font-size: 16px;
}

.profile-card__input-icon .profile-card__input {
    padding-left: 40px;
}

.profile-card__buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
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
    font-weight: 700;
}

.profile-card__btn--danger {
    background: var(--accent);
    color: #fff;
    border-radius: 12px;
    padding: 12px 25px;
    border: none;
    cursor: pointer;
    font-weight: 700;
}

.profile-card__delete {
    text-align: center;
    margin-top: 12px;
}
</style>
