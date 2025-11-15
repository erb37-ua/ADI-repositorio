<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const recetas = ref([
  {
    id: 1,
    titulo: 'Ramen picante de pollo',
    imagen: '/receta-ramen.jpg',
    comentarios: 8,
    liked: false
  },
  {
    id: 2,
    titulo: 'Tarta de queso al horno',
    imagen: '/receta-tarta-queso.jpg',
    comentarios: 15,
    liked: true
  },
  {
    id: 3,
    titulo: 'Tacos al pastor',
    imagen: '/receta-tacos.jpg',
    comentarios: 5,
    liked: false
  },
  {
    id: 4,
    titulo: 'Curry de garbanzos',
    imagen: '/receta-curry.jpg',
    comentarios: 3,
    liked: false
  },
  {
    id: 5,
    titulo: 'Gyozas de verduras',
    imagen: '/receta-gyozas.jpg',
    comentarios: 11,
    liked: true
  },
  {
    id: 6,
    titulo: 'Brownies de chocolate',
    imagen: '/receta-brownies.jpg',
    comentarios: 22,
    liked: false
  }
])
</script>

<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="header__inner">
        <div class="header__left">
          <RouterLink to="/"><img class="header__logo" src="/logo.png" alt="Logo" /></RouterLink>
        </div>
        <nav class="header__nav">
          <RouterLink to="/recipes" class="header__nav-item">RECETAS</RouterLink>
          <input class="header__toggle-filtros" id="toggle-filtros" type="checkbox" />
          <label class="header__nav-item header__nav-item--filtros" for="toggle-filtros">FILTROS</label>
          <RouterLink to="/contact" class="header__nav-item">CONTACTO</RouterLink>
          <RouterLink to="/about" class="header__nav-item">SOBRE MÍ</RouterLink>
        </nav>
        <div class="header__search">
          <img class="header__search-icon" src="/lupa.png" alt="Buscar" />
          <input class="header__search-input" type="text" placeholder="   Buscar..." />
        </div>
        <div class="header__right">
          <RouterLink to="/profile"><img class="header__profile-icon" src="/icono-perfil.png" alt="Perfil" /></RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <div id="gridRecetas" class="grid">
        <article v-for="receta in recetas" :key="receta.id" class="card">
          <img class="card__image" :src="receta.imagen" :alt="receta.titulo" />
          <div class="card__title-row">
            <h2 class="card__title">{{ receta.titulo }}</h2>
            <div>
              <input class="card__like-check" type="checkbox" v-model="receta.liked" :id="'like-' + receta.id" />
              <label class="card__like-label" :for="'like-' + receta.id">
                <i class="fa-regular fa-heart"></i>
              </label>
            </div>
          </div>
          <p class="card__comments">{{ receta.comentarios }} comentarios</p>
        </article>
      </div>

      <div class="add-card">
        <RouterLink to="/recipes/create" class="add-card__button" title="Añadir receta">
          <i class="fa-solid fa-circle-plus"></i>
        </RouterLink>
      </div>
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
:root {
  --accent: #c65a48;
  --dark: #2b5b5b;
  --bg: #fbf8f6;
  --card: #fff;
  --radius: 14px;
  --pad: 20px;
  --footer-h: 56px;
  font-size: 18px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: #111;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  flex: 1;
}


/* Card */
.card {
  background: var(--card);
  border-radius: var(--radius);
  padding: var(--pad);
  border: 2px solid rgba(43, 91, 91, 0.12);
}

.card__image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.card__title {
  font-size: 1rem;
}

.card__comments {
  font-size: 16px;
  color: #666;
}

/* Like system */
.card__like-check {
  display: none;
}

.card__like-label {
  cursor: pointer;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.6);
}

.card__like-check:checked + .card__like-label i {
  color: var(--accent);
}

/* Add card */
.add-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-card__button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 53px;
  line-height: 4;
  color: var(--accent);
}

.add-card__button i {
  background: var(--accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--accent);
}

.add-card__button i::before {
  color: #fff;
  text-shadow: 0 0 0 var(--accent);
}

.card__link {
  text-decoration: none;
  color: inherit;
}
</style>
