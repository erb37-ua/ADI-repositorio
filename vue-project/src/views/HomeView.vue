<script setup>
  import { computed, onMounted } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { useMainStore } from '@/stores/main'

  const route = useRoute()
  const store = useMainStore()

  onMounted(() => {
    // Cargamos las recetas de inicio desde el store
    store.loadHomeRecipes()
  })

  // Lista filtrada en función de la query (search + category)
  const recetasFiltradas = computed(() => {
    const recetas = store.homeRecipes
    let resultado = recetas

    // 1. Filtro por búsqueda
    if (route.query.search) {
      const busqueda = String(route.query.search).toLowerCase()
      resultado = resultado.filter((r) =>
        r.titulo.toLowerCase().includes(busqueda)
      )
    }

    // 2. Filtro por categoría
    if (route.query.category) {
      const categoriaFiltro = route.query.category
      resultado = resultado.filter((r) => {
        if (Array.isArray(r.categoria)) {
          return r.categoria.includes(categoriaFiltro)
        }
        return r.categoria === categoriaFiltro
      })
    }

    return resultado
  })

  const handleLikeChange = async (receta) => {
    try {
      await store.toggleLikeReceta(receta.id)
    } catch (error) {
      alert('Error al actualizar el like')
    }
  }
</script>

<template>
  <div class="container">
    <div v-if="store.homeLoading" style="text-align: center; padding: 40px;">
      Cargando...
    </div>

    <div
      v-else-if="recetasFiltradas.length === 0"
      style="text-align: center; padding: 40px;"
    >
      <p>No se encontraron recetas con esos criterios 😢</p>
      <RouterLink
        to="/"
        style="color: var(--accent); font-weight: bold;"
      >
        Ver todas
      </RouterLink>
    </div>

    <div v-else id="gridRecetas" class="grid">
      <article
        v-for="receta in recetasFiltradas"
        :key="receta.id"
        class="card"
      >
        <RouterLink
          :to="{ name: 'recipe-detail', params: { id: receta.id } }"
          class="card__link"
        >
          <img
            class="card__image"
            :src="receta.imagen || '/receta-ramen.jpg'"
            :alt="receta.titulo"
            @error="$event.target.src = '/receta-ramen.jpg'"
          />
        </RouterLink>

        <div class="card__title-row">
          <RouterLink
            :to="{ name: 'recipe-detail', params: { id: receta.id } }"
            class="card__link"
          >
            <h2 class="card__title">{{ receta.titulo }}</h2>
          </RouterLink>

          <div>
            <input
              class="card__like-check"
              type="checkbox"
              :checked="receta.liked"
              :id="'like-' + receta.id"
              @change="() => handleLikeChange(receta)"
            />
            <label
              class="card__like-label"
              :class="{ 'card__like-label--liked': receta.liked }"
              :for="'like-' + receta.id"
            >
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

    <div class="add-card" v-if="store.isAdmin">
      <RouterLink
        to="/create-edit"
        class="add-card__button"
        title="Añadir receta"
      />
    </div>
  </div>
</template>

<style scoped>
/* (igual que el tuyo, lo dejo tal cual) */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 120px;
  margin-top: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
  align-items: start;
}

.card {
  background: var(--card, #fff);
  border-radius: var(--radius, 12px);
  padding: var(--pad, 16px);
  border: 2px solid rgba(43, 91, 91, 0.12);
}

.card__image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: opacity 0.2s;
}
.card__image:hover {
  opacity: 0.9;
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
  font-weight: bold;
  color: inherit;
}

.card__comments {
  font-size: 16px;
  color: #666;
}

.card__link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.card__link:hover .card__title {
  color: var(--accent, #e63946);
}

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

.heart-svg {
  width: 28px;
  height: 28px;
  fill: transparent;
  stroke: #9ca3af;
  stroke-width: 1.8px;
  transition: all 0.2s;
}

.card__like-label--liked .heart-svg {
  fill: var(--accent, #e63946);
  stroke: var(--accent, #e63946);
  transform: scale(1.05);
}

.add-card {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.add-card__button {
  position: relative;
  border: none;
  cursor: pointer;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--accent, #e63946);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.add-card__button::before,
.add-card__button::after {
  content: '';
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
</style>
