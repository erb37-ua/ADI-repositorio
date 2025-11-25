<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { useMainStore } from '@/stores/main'

    const router = useRouter()
    const store = useMainStore()

    // Variables de estado
    const filterCategory = ref('')
    const searchQuery = ref('') // Variable para el buscador
    const currentPage = ref(1)
    const pageSize = 4

    // --- CARGAR DATOS ---
    const loadRecipes = async () => {
        try {
            await store.loadRecipes()
        } catch (error) {
            console.error('Error cargando recetas:', error)
            alert('Hubo un error al cargar las recetas.')
        }
    }

    onMounted(() => {
        loadRecipes()
    })

    // --- COMPUTED ---
    const filteredRecipes = computed(() => {
        let recipes = store.recipes

        // 1. Filtro por Categoría
        if (filterCategory.value) {
            recipes = recipes.filter((r) => r.category.includes(filterCategory.value))
        }

        // 2. Filtro por Buscador (Texto)
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            recipes = recipes.filter((r) => 
                r.title.toLowerCase().includes(query)
            )
        }

        return recipes
    })

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(filteredRecipes.value.length / pageSize)),
    )

    const paginatedRecipes = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return filteredRecipes.value.slice(start, start + pageSize)
    })

    // --- FUNCIONES ---
    const changeFilter = (event) => {
        filterCategory.value = event.target.value
        currentPage.value = 1
    }

    // Resetear a página 1 cuando se busca
    const handleSearch = () => {
        currentPage.value = 1
    }

    const setPage = (page) => {
        if (page < 1 || page > totalPages.value) return
        currentPage.value = page
    }

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta receta?')) return

        try {
            await store.deleteRecipe(id)
            // Ajustar paginación si nos quedamos en una página vacía
            if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
        } catch (error) {
            console.error('Error eliminando:', error)
            alert('No se pudo eliminar la receta.')
        }
    }

    const handleEdit = (id) => {
        router.push(`/create-edit/${id}`)
    }
</script>

<template>
    <div class="recipes">
        <div class="recipes__controls">
            <div class="recipes__filters-group">
                <select class="recipes__filter" :value="filterCategory" @change="changeFilter">
                    <option value="">Todo</option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Comida">Comida</option>
                    <option value="Cena">Cena</option>
                    <option value="Salado">Salado</option>
                    <option value="Dulce">Dulce</option>
                </select>

                <div class="recipes__search">
                    <img src="/lupa.png" alt="Buscar" class="recipes__search-icon" draggable="false"/>
                    <input 
                        type="text" 
                        class="recipes__search-input" 
                        placeholder="Buscar receta..." 
                        v-model="searchQuery"
                        @input="handleSearch"
                    />
                </div>
            </div>

            <RouterLink to="/create-edit" class="recipes__button">
                Añadir receta
            </RouterLink>
        </div>

        <div v-if="store.recipesLoading" style="text-align:center; padding: 20px;">
            Cargando recetas...
        </div>
        
        <div v-else-if="filteredRecipes.length === 0" style="text-align:center; padding: 20px;">
            No se encontraron recetas.
        </div>

        <div v-else class="recipes__list">
            <article
                v-for="recipe in paginatedRecipes"
                :key="recipe.id"
                class="recipes__card"
            >
                <RouterLink
                    :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
                    class="card__link card__link--image"
                >
                    <img
                        :src="recipe.image || '/placeholder.jpg'"
                        :alt="recipe.title"
                        class="recipes__card-image"
                        @error="$event.target.src = '/placeholder.jpg'"
                    />
                </RouterLink>
                
                <div class="recipes__card-info">
                    <RouterLink
                        :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
                        class="card__link card__link--title"
                    >
                        <h3 class="recipes__card-title">{{ recipe.title }}</h3>
                    </RouterLink>

                    <p class="recipes__card-description">
                        {{ recipe.description }}
                    </p>
                </div>

                <div class="recipes__card-actions">
                    <button
                        type="button"
                        class="recipes__card-button"
                        @click="handleEdit(recipe.id)"
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="recipes__card-button"
                        @click="handleDelete(recipe.id)"
                    >
                        Eliminar
                    </button>
                </div>
            </article>
        </div>

        <nav
            v-if="filteredRecipes.length > 0"
            class="recipes__pagination"
            aria-label="Paginación"
        >
            <button
                type="button"
                class="recipes__page-link"
                @click="setPage(currentPage - 1)"
            >
                «
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                type="button"
                class="recipes__page-link"
                :class="{ 'recipes__page-link--active': page === currentPage }"
                @click="setPage(page)"
            >
                {{ page }}
            </button>
            <button
                type="button"
                class="recipes__page-link"
                @click="setPage(currentPage + 1)"
            >
                »
            </button>
        </nav>
    </div>
</template>

<style scoped>
    .recipes {
        max-width: 75vw;
        width: 100%;
        margin: 0 auto;
        padding: 40px 20px 40px;
        margin-top: 20px;
    }

    .recipes__controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 15px;
    }

    .recipes__filters-group {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap; /* Para que se adapte en móviles */
    }

    .recipes__filter {
        padding: 10px 18px;
        border-radius: 20px;
        background: var(--dark);
        color: #fff;
        border: none;
        font-size: 16px;
        cursor: pointer;
        font-family: 'Itim', sans-serif;
    }

    /* ESTILOS DEL BUSCADOR */
    .recipes__search {
        display: flex;
        align-items: center;
        background: #fff;
        border: 2px solid var(--dark);
        border-radius: 20px;
        padding: 5px 12px;
        height: 40px; 
        width: 250px;
        box-sizing: border-box;
    }

    .recipes__search-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        opacity: 0.6;
        user-select: none;
    }

    .recipes__search-input {
        border: none;
        background: transparent;
        width: 100%;
        font-family: 'Itim', sans-serif;
        font-size: 16px;
        outline: none;
    }
    
    .recipes__button {
        display: inline-block;
        padding: 10px 18px;
        border-radius: 20px;
        background: var(--dark);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 16px;
        text-decoration: none;
        font-family: 'Itim', sans-serif;
    }
    
    .recipes__list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .recipes__card {
        display: flex;
        gap: 25px;
        align-items: center;
        background: var(--card);
        border-radius: var(--radius);
        padding: var(--pad);
        border: 2px solid var(--dark);
        width: 100%;
    }

    .recipes__card-image {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 10px;
        flex-shrink: 0; 
        display: block;
        transition: opacity 0.2s;
    }

    .recipes__card-info {
        flex: 1;
        min-width: 0; 
    }

    .recipes__card-title {
        font-size: 18px;
        font-weight: bold;
        color: inherit;
        margin-bottom: 4px; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: text-decoration 0.2s;
    }

    .recipes__card-description {
        font-size: 17px;
        color: #666;
        margin-top: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .recipes__card-actions {
        display: flex;
        gap: 10px;
        align-self: center;
        flex-shrink: 0;
    }

    .recipes__card-button {
        display: inline-block;
        padding: 10px 18px;
        border-radius: 20px;
        background: var(--dark);
        color: #fff;
        border: none;
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        font-family: 'Itim', sans-serif;
    }

    .recipes__pagination {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 20px;
        margin-bottom: 80px;
    }

    .recipes__page-link {
        background: none;
        border: none;
        color: var(--dark);
        font-size: 16px;
        cursor: pointer;
        font-family: 'Itim', sans-serif;
    }

    .recipes__page-link:hover {
        color: var(--accent);
    }

    .recipes__page-link--active {
        color: var(--accent);
        font-weight: bold;
    }

    /* --- ESTILOS DE LINKS --- */
    .card__link {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        display: block;
        background-color: transparent !important;
    }
    .card__link:hover {
        background-color: transparent !important;
    }
    .card__link--image:hover .recipes__card-image {
        opacity: 0.85;
    }
    .card__link--title:hover .recipes__card-title {
        text-decoration: underline;
        text-decoration-color: #000;
        text-underline-offset: 3px;
    }
</style>