<template>
    <div>
        <!-- Header -->
        <header class="header">
        <div class="header__inner">
            <div class="header__left">
            <RouterLink to="/">
                <img class="header__logo" src="/logo.png" alt="Logo" />
            </RouterLink>
            </div>

            <nav class="header__nav">
            <RouterLink to="/list" class="header__nav-item">RECETAS</RouterLink>

            <!-- checkbox antes del label -->
            <input type="checkbox" id="toggle-filtros" class="header__toggle-filtros" />
            <label for="toggle-filtros" class="header__nav-item header__nav-item--filtros">
                FILTROS
            </label>

            <RouterLink to="/contact" class="header__nav-item">CONTACTO</RouterLink>
            <RouterLink to="/about" class="header__nav-item">SOBRE MÍ</RouterLink>
            </nav>

            <div class="header__search">
            <img class="header__search-icon" src="/lupa.png" alt="Buscar" />
            <input class="header__search-input" type="text" placeholder="   Buscar..." />
            </div>

            <div class="header__right">
            <RouterLink to="/profile">
                <img class="header__profile-icon" src="/icono-perfil.png" alt="Perfil" />
            </RouterLink>
            </div>
        </div>
        </header>

        <!-- Main -->
        <main class="recipe-detail">

        <h2 class="recipe-detail__title"> 
            <strong>Cinnamon Rolls caseros</strong></h2>

        <img class="recipe-detail__image" src="/cinnamonrolls.jpeg" alt="Cinnamon Rolls caseros" />

        <p class="recipe-detail__description">
            Estos cinnamon rolls esponjosos están rellenos de canela y azúcar moreno y cubiertos con un glaseado suave. Perfectos para un desayuno especial o una merienda dulce.
        </p>

        <h3 class="recipe-detail__section-title">
            <strong>INGREDIENTES</strong>
        </h3>
        <div class="recipe-detail__ingredients">
            <ul class="recipe-detail__list">
            <li>500 g de harina de trigo</li>
            <li>250 ml de leche templada</li>
            <li>75 g de azúcar blanco</li>
            <li>1 sobre de levadura seca de panadería</li>
            <li>75 g de mantequilla derretida</li>
            <li>1 huevo</li>
            <li>Relleno: mantequilla, azúcar moreno y canela al gusto</li>
            </ul>
        </div>

        <h3 class="recipe-detail__section-title">
            <strong>PASOS</strong>
        </h3>
        <ol class="recipe-detail__steps">
            <li>Añade la leche templada, la levadura y el azúcar blanco. Deja reposar unos minutos.</li>
            <li>Mezcla con la harina, el huevo y la mantequilla derretida. Amasa hasta obtener una masa suave.</li>
            <li>Deja levar la masa en un bol tapado hasta que doble su tamaño.</li>
            <li>Estira la masa en un rectángulo, unta mantequilla, espolvorea azúcar moreno y canela.</li>
            <li>Enrolla, corta en porciones y colócalas en una bandeja de horno.</li>
            <li>Deja levar de nuevo y hornea hasta que estén dorados.</li>
            <li>Si quieres, cúbrelos con un glaseado de azúcar glas y leche.</li>
        </ol>
        </main>

        <!-- Sección de comentarios -->
        <section class="recipe-comments">
        <!-- Escribir un comentario -->
        <div class="recipe-comments__box">
            <h3 class="recipe-comments__title">
            <strong>Deja tu comentario</strong>
            </h3>
            <form class="recipe-comments__form" @submit.prevent>
            <div class="recipe-comments__row">
                <label for="rating">Valoración:</label><br />
                <select id="rating" name="rating" class="recipe-comments__input">
                <option value="0">0 estrellas</option>
                <option value="1">1 estrella</option>
                <option value="2">2 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="5">5 estrellas</option>
                </select>
            </div>

            <div class="recipe-comments__row">
                <label for="comment">Comentario:</label><br />
                <textarea
                id="comment"
                name="comment"
                class="recipe-comments__input"
                rows="4"
                placeholder="Escribe aquí tu comentario..."
                ></textarea>
            </div>

            <button type="submit" class="recipe-comments__btn">Enviar</button>
            </form>
        </div>

        <!-- Lista de comentarios -->
        <div class="recipe-comments__list">
            <h3 class="recipe-comments__title"><strong>Comentarios anteriores</strong></h3>

            <div class="recipe-comments__item">
            <p class="recipe-comments__author">
                <strong>Ana</strong>
            </p>
            <p class="recipe-comments__meta">28/09/2025 18:30</p>
            <p class="recipe-comments__stars">⭐⭐⭐⭐⭐</p>
            <p class="recipe-comments__text">Me encantó la receta, me salió riquísima 😍</p>
            <hr class="recipe-comments__divider" />
            </div>

            <div class="recipe-comments__item">
            <p class="recipe-comments__author">
                <strong>Pedro</strong>
            </p>
            <p class="recipe-comments__meta">28/09/2025 19:10</p>
            <p class="recipe-comments__stars">⭐⭐⭐⭐</p>
            <p class="recipe-comments__text">Probé a ponerle un poco menos de azúcar y quedó genial 👌</p>
            <hr class="recipe-comments__divider" />
            </div>
        </div>
        </section>

        <!-- Footer -->
        <footer class="site-footer">
        <div class="site-footer__inner">
            <!-- Izquierda -->
            <div class="site-footer__left">&copy; 2025 Recetarizada</div>

            <!-- Centro -->
            <nav class="site-footer__center" aria-label="Enlaces legales">
            <RouterLink to="/legal/aviso-legal">Aviso Legal</RouterLink>
            <RouterLink to="/legal/politica-privacidad">Política de Privacidad</RouterLink>
            <RouterLink to="/legal/politica-cookies">Política de Cookies</RouterLink>
            </nav>

            <!-- Derecha: iconos de redes sociales -->
            <div class="site-footer__right" aria-label="Redes sociales">
            <a
                class="site-footer__social-link"
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
            >
                <img class="site-footer__social-icon" src="/youtube.png" alt="YouTube" />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
            >
                <img class="site-footer__social-icon" src="/instagram.png" alt="Instagram" />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
            >
                <img class="site-footer__social-icon" src="/tiktok.png" alt="TikTok" />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
            >
                <img class="site-footer__social-icon" src="/twitter.png" alt="Twitter" />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
            >
                <img class="site-footer__social-icon" src="/pinterest.png" alt="Pinterest" />
            </a>
            <a
                class="site-footer__social-link"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
            >
                <img class="site-footer__social-icon" src="/facebook.png" alt="Facebook" />
            </a>
            </div>
        </div>
        </footer>
    </div>
    </template>

<style>

body {
    background: var(--bg);
    color: #111;
    line-height: 1.4;
    padding-top: 72px;
    font-size: 18px;
}

main {
    flex: 1;
}

html,
body {
    margin: 0;
    padding: 0;
}

.header {
    width: 100%;
    height: 134px;
    padding: 8px;
    background: #D2694C;
    border: 1px solid #C9A66B;
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
    font-family: 'Itim';
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
    background: #C9A66B;
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

.site-footer {
background: #D2694C;
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

/* Recipe detail */
.recipe-detail {
max-width: 66%;
margin: 0 auto;
text-align: center;
padding-bottom: 120px;
}

.recipe-detail__title {
font-size: 2rem;
margin-bottom: 20px;
margin-top: 40px;
}

.recipe-detail__image {
    display: block;
    margin: 0 auto 20px;
    max-width: 520px;
    width: 100%;
    border-radius: 12px;
}

.recipe-detail__description {
    margin-bottom: 24px;
    line-height: 1.6;
    text-align: justify;
}

.recipe-detail__section-title {
    margin: 24px 0 12px;
}

.recipe-detail__subsection-title {
    margin: 16px 0 8px;
}

.recipe-detail__ingredients,
.recipe-detail__list,
.recipe-detail__steps {
    text-align: left;
    margin: 0 auto 28px;
    display: inline-block;
}

/* Comments */
.recipe-comments {
    max-width: 800px;
    margin: 40px auto 120px;
    font-family: inherit;
}

.recipe-comments__box {
    background: #fff;
    border-radius: var(--radius);
    border: 2px solid rgba(43, 91, 91, 0.12);
    padding: 20px;
    margin-bottom: 30px;
}

.recipe-comments__title {
    text-align: center;
    margin-bottom: 16px;
}

.recipe-comments__form .recipe-comments__row {
    margin-bottom: 14px;
}

.recipe-comments__input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(43, 91, 91, 0.12);
}

.recipe-comments__btn {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 12px;
    background: var(--dark);
    color: #fff;
    text-decoration: none;
    border: none;
    cursor: pointer;
}

.recipe-comments__list {
    background: #fff;
    border-radius: var(--radius);
    border: 2px solid rgba(43, 91, 91, 0.12);
    padding: 20px;
}

.recipe-comments__item {
    margin-bottom: 20px;
}

.recipe-comments__author {
    font-size: 1.1rem;
}

.recipe-comments__meta {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 4px;
}

.recipe-comments__stars {
    color: var(--accent);
    margin-bottom: 6px;
}

.recipe-comments__text {
    margin-bottom: 10px;
    line-height: 1.4;
}

.recipe-comments__divider {
    border: none;
    border-top: 1px solid rgba(43, 91, 91, 0.2);
}

.recipe-detail__title strong,
.recipe-detail__section-title strong,
.recipe-comments__title strong,
.recipe-comments__author strong {
    font-weight: 700;
}
</style>
