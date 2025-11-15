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
  <div class="container">
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
  </div>
</template>

<style scoped>
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
