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
            <input
              class="card__like-check"
              type="checkbox"
              v-model="receta.liked"
              :id="'like-' + receta.id"
            />

            <label
              class="card__like-label"
              :class="{ 'card__like-label--liked': receta.liked }"
              :for="'like-' + receta.id"
            >
              <!-- Corazón sencillo con viewBox estándar -->
              <svg class="heart-svg" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                      2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                      C13.09 3.81 14.76 3 16.5 3
                      19.58 3 22 5.42 22 8.5
                      c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z"
                />
              </svg>
            </label>
          </div>
        </div>

        <p class="card__comments">{{ receta.comentarios }} comentarios</p>
      </article>
    </div>

    <div class="add-card">
      <RouterLink
        to="/recipes/create"
        class="add-card__button"
        title="Añadir receta"
      />
    </div>
  </div>
</template>

<style scoped>
/* Container y grid */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 120px;
  margin-top: 144px; /* para compensar el header fijo */
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  align-items: start;
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
  padding-right: 8px;
}

.card__title {
  font-size: 1rem;
}

.card__comments {
  font-size: 16px;
  color: #666;
}

/* Like */
.card__like-check {
  display: none;
}

.card__like-label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

/* Corazón por defecto:*/
.heart-svg {
  width: 28px;
  height: 28px;
  fill: transparent;         
  stroke: #9ca3af;          
  stroke-width: 1.8px;
  transition: fill 0.2s, stroke 0.2s, transform 0.1s;
}

.card__like-label--liked .heart-svg {
  fill: var(--accent);        
  stroke: var(--accent);
  transform: scale(1.05);
}

/* Add card */
.add-card {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

/* Botón circular con + dibujado por CSS */
.add-card__button {
  position: relative;
  border: none;
  cursor: pointer;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* Barras del + */
.add-card__button::before,
.add-card__button::after {
  content: "";
  position: absolute;
  width: 26px;
  height: 4px;
  background: #fff;
  border-radius: 999px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.add-card__button::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.card__link {
  text-decoration: none;
  color: inherit;
}
</style>
