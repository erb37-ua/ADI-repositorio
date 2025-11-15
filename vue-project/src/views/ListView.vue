<script setup>
    import { ref, computed } from 'vue'
    import { RouterLink, useRouter } from 'vue-router'

    const router = useRouter()

    // Datos simulados
    const recipes = ref([
        {
            id: 1,
            title: 'Tostadas francesas con miel',
            description: 'Pan empapado en huevo, dorado a la plancha y servido con miel y fruta fresca.',
            category: 'Desayuno',
            image: '/receta1.jpg',
            showDetails: false
        },
        {
            id: 2,
            title: 'Ensalada de quinoa y aguacate',
            description: 'Quinoa, verduras frescas y aguacate con aliño de limón y aceite de oliva.',
            category: 'Comida',
            image: '/receta2.jpg',
            showDetails: false
        },
        {
            id: 3,
            title: 'Crema de calabaza asada',
            description: 'Calabaza asada, cebolla y zanahoria trituradas con caldo suave y un toque de nata.',
            category: 'Cena',
            image: '/receta3.jpg',
            showDetails: false
        },
        {
            id: 4,
            title: 'Brownie de chocolate',
            description: 'Bizcocho denso de chocolate con nueces, perfecto para los amantes del dulce.',
            category: 'Dulce',
            image: '/receta4.jpg',
            showDetails: false
        },
        {
            id: 5,
            title: 'Empanadillas de atún al horno',
            description: 'Masa crujiente rellena de atún, tomate y huevo duro, horneada hasta dorar.',
            category: 'Salado',
            image: '/receta5.jpg',
            showDetails: false
        },
        {
            id: 6,
            title: 'Yogur con granola y fruta',
            description: 'Vaso de yogur natural con granola casera y frutas de temporada.',
            category: 'Desayuno',
            image: '/receta6.jpg',
            showDetails: false
        }
    ])

    const filterCategory = ref('')
    const currentPage = ref(1)
    const pageSize = 4

    const filteredRecipes = computed(() =>
        filterCategory.value
            ? recipes.value.filter(r => r.category === filterCategory.value)
            : recipes.value
    )

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(filteredRecipes.value.length / pageSize))
    )

    const paginatedRecipes = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return filteredRecipes.value.slice(start, start + pageSize)
    })

    const changeFilter = (event) => {
        filterCategory.value = event.target.value
        currentPage.value = 1
    }

    const setPage = (page) => {
        if (page < 1 || page > totalPages.value) return
        currentPage.value = page
    }

    const handleDelete = (id) => {
        recipes.value = recipes.value.filter(r => r.id !== id)
        if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
    }

    const handleEdit = (id) => {
        // En el futuro podrías pasar el id por query/params
        console.log('Editar receta con id:', id)
        router.push('/create-edit')
    }

    const toggleDetails = (recipe) => {
        recipe.showDetails = !recipe.showDetails
    }
</script>

<template>
    <div class="recipes">
        <div class="recipes__controls">
            <select class="recipes__filter" :value="filterCategory" @change="changeFilter">
            <option value="">Todo</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Comida">Comida</option>
            <option value="Cena">Cena</option>
            <option value="Salado">Salado</option>
            <option value="Dulce">Dulce</option>
            </select>

            <RouterLink to="/create-edit" class="recipes__button">Añadir receta</RouterLink>
        </div>

        <div class="recipes__list">
            <article v-for="recipe in paginatedRecipes" :key="recipe.id" class="recipes__card">
            <img :src="recipe.image" :alt="recipe.title" class="recipes__card-image" />
            <div class="recipes__card-info">
                <h3 class="recipes__card-title">{{ recipe.title }}</h3>
                <p class="recipes__card-category"><strong>Categoría:</strong> {{ recipe.category }}</p>
                <p v-if="recipe.showDetails" class="recipes__card-description">{{ recipe.description }}</p>
            </div>
            <div class="recipes__card-actions">
                <button type="button" class="recipes__card-button" @click="toggleDetails(recipe)">
                {{ recipe.showDetails ? 'Ocultar detalles' : 'Ver detalles' }}
                </button>
                <button type="button" class="recipes__card-button" @click="handleEdit(recipe.id)">Editar</button>
                <button type="button" class="recipes__card-button" @click="handleDelete(recipe.id)">Eliminar</button>
            </div>
            </article>
        </div>

        <nav class="recipes__pagination" aria-label="Paginación">
            <button type="button" class="recipes__page-link" @click="setPage(currentPage - 1)">«</button>
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
            <button type="button" class="recipes__page-link" @click="setPage(currentPage + 1)">»</button>
        </nav>
    </div>
</template>

<style scoped>
    .recipes{
        max-width:75vw;
        width:100%;
        margin:0 auto;
        padding:40px 20px 40px;
        margin-top:20px;
    }

    .recipes__controls{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:10px;
    }

    .recipes__filter{
        padding:10px 18px;
        border-radius:20px;
        background:var(--dark);
        color:#fff;
        border:none;
        font-size:16px;
        cursor:pointer;
        font-family: 'Itim', sans-serif;
    }
    
    .recipes__button{
        display:inline-block;
        padding:10px 18px;
        border-radius:20px;
        background:var(--dark);
        color:#fff;
        border:none;
        cursor:pointer;
        font-size:16px;
        text-decoration:none;
        font-family: 'Itim', sans-serif;
    }
    
    .recipes__list{
        display:flex;
        flex-direction:column;
        gap:15px;
    }
    
    .recipes__card{
        display:flex;
        gap:25px;
        align-items:center;
        background:var(--card);
        border-radius:var(--radius);
        padding:var(--pad);
        border:2px solid var(--dark);
        width:100%;
    }

    .recipes__card-image{
        width:90px;
        height:90px;
        object-fit:cover;
        border-radius:10px;
    }

    .recipes__card-info{
        flex:1;
    }

    .recipes__card-title{
        font-size:18px;
    }

    .recipes__card-description{
        font-size:17px;
        color:#666;
        background-color:#a2a2a220;
        margin-top:10px;
        margin-right:0;
        border-radius:5px;
        padding:6px 8px;
    }

    .recipes__card-category{
        margin-top:4px;
        font-size:15px;
    }

    .recipes__card-actions{
        display:flex;
        gap:10px;
        align-self:center;
    }

    .recipes__card-button{
        display:inline-block;
        padding:10px 18px;
        border-radius:20px;
        background:var(--dark);
        color:#fff;
        border:none;
        cursor:pointer;
        text-decoration:none;
        font-size:16px;
        font-family: 'Itim', sans-serif;
    }

    .recipes__pagination{
        display:flex;
        justify-content:flex-end;
        gap:16px;
        margin-top:20px;
        margin-bottom:80px;
    }

    .recipes__page-link{
        background:none;
        border:none;
        color:var(--dark);
        font-size:16px;
        cursor:pointer;
        font-family: 'Itim', sans-serif;
    }

    .recipes__page-link:hover{
        color:var(--accent);
    }

    .recipes__page-link--active{
        color:var(--accent);
        font-weight:bold;
    }
</style>