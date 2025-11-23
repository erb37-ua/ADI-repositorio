<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerReceta } from '@/services/recetasService.js'

const route = useRoute()
const router = useRouter()

const receta = ref(null)
const loading = ref(true)

onMounted(async () => {
    const id = route.params.id
    if (!id) {
        router.push('/list')
        return
    }

    try {
        receta.value = await obtenerReceta(id)
    } catch (error) {
        console.error("Error cargando receta:", error)
        alert("No se pudo cargar la receta.")
        router.push('/')
    } finally {
        loading.value = false
    }
})

// Función para convertir **Texto** en <strong>Texto</strong>
const formatInstruction = (text) => {
    if (!text) return '';
    // Reemplaza los ** con etiquetas strong
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

</script>

<template>
    <div>
        <div v-if="loading" style="text-align: center; padding: 60px;">Cargando detalle...</div>

        <main v-else-if="receta" class="recipe-detail">
            <h2 class="recipe-detail__title"> 
                <strong>{{ receta.titulo }}</strong>
            </h2>

            <img 
                class="recipe-detail__image" 
                :src="receta.imagenUrl || '/placeholder.jpg'" 
                :alt="receta.titulo" 
                @error="$event.target.src = '/placeholder.jpg'"
            />

            <p class="recipe-detail__description">
                {{ receta.descripcion }}
            </p>

            <h3 class="recipe-detail__section-title">
                <strong>INGREDIENTES</strong>
            </h3>
            
            <div class="recipe-detail__ingredients">
                <div v-if="Array.isArray(receta.ingredientes) && receta.ingredientes.length > 0 && receta.ingredientes[0].section">
                    <div v-for="(seccion, index) in receta.ingredientes" :key="index" class="ingredient-group">
                        <h4 v-if="seccion.section" class="recipe-detail__subsection-title">{{ seccion.section }}</h4>
                        <ul class="recipe-detail__list">
                            <li v-for="(item, i) in seccion.items" :key="i">
                                <span v-if="item.amount" class="amount">{{ item.amount }}</span>
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <ul v-else class="recipe-detail__list">
                    <li v-for="(ing, index) in receta.ingredientes" :key="index">
                        {{ ing }}
                    </li>
                </ul>
            </div>

            <h3 class="recipe-detail__section-title">
                <strong>PASOS</strong>
            </h3>
            
            <div class="recipe-detail__steps-container">
                <ol v-if="Array.isArray(receta.pasos) && receta.pasos.length > 0 && receta.pasos[0].instruction" class="recipe-detail__steps">
                    <li v-for="(step, index) in receta.pasos" :key="index">
                        <span v-html="formatInstruction(step.instruction)"></span>
                    </li>
                </ol>

                <ol v-else class="recipe-detail__steps">
                    <li v-for="(step, index) in receta.pasos" :key="index">
                        {{ step }}
                    </li>
                </ol>
            </div>
        </main>

        <section class="recipe-comments">
            <div class="recipe-comments__box">
                <h3 class="recipe-comments__title"><strong>Deja tu comentario</strong></h3>
                <form class="recipe-comments__form" @submit.prevent>
                    <div class="recipe-comments__row">
                        <label for="rating">Valoración:</label><br />
                        <select id="rating" name="rating" class="recipe-comments__input">
                            <option value="5">5 estrellas</option>
                            <option value="4">4 estrellas</option>
                            <option value="3">3 estrellas</option>
                        </select>
                    </div>
                    <div class="recipe-comments__row">
                        <label for="comment">Comentario:</label><br />
                        <textarea id="comment" class="recipe-comments__input" rows="4" placeholder="Escribe aquí..."></textarea>
                    </div>
                    <button type="submit" class="recipe-comments__btn">Enviar</button>
                </form>
            </div>

            <div class="recipe-comments__list">
                <h3 class="recipe-comments__title"><strong>Comentarios anteriores</strong></h3>
                <div class="recipe-comments__item">
                    <p class="recipe-comments__author"><strong>Ana</strong></p>
                    <p class="recipe-comments__meta">28/09/2025 18:30</p>
                    <p class="recipe-comments__stars">⭐⭐⭐⭐⭐</p>
                    <p class="recipe-comments__text">Me encantó la receta, me salió riquísima 😍</p>
                    <hr class="recipe-comments__divider" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .recipe-detail {
        max-width: 800px; /* Un poco más ancho para leer mejor */
        margin: 0 auto;
        text-align: center;
        padding-bottom: 60px;
        margin-top: 30px; /* Compensar header */
        padding-left: 20px;
        padding-right: 20px;
    }

    .recipe-detail__title {
        font-size: 2.2rem;
        margin-bottom: 20px;
        margin-top: 20px;
        color: var(--dark);
    }

    .recipe-detail__image {
        display: block;
        margin: 0 auto 30px;
        width: 100%;
        max-width: 400px;
        max-height: 400px;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        object-fit: cover;
    }

    .recipe-detail__description {
        margin-bottom: 40px;
        line-height: 1.8;
        font-size: 1.1rem;
        color: #444;
        text-align: left;
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,0.05);
    }

    .recipe-detail__section-title {
        margin: 40px 0 20px;
        font-size: 1.5rem;
        color: var(--dark);
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 2px solid var(--accent);
        display: inline-block;
        padding-bottom: 5px;
    }

    .recipe-detail__subsection-title {
        margin: 20px 0 10px;
        font-size: 1.2rem;
        color: #666;
        font-style: italic;
        text-align: left;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
    }

    .recipe-detail__ingredients,
    .recipe-detail__steps-container {
        text-align: left;
        background: #fff;
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        margin-bottom: 40px;
    }

    .recipe-detail__list {
        list-style: none; /* Quitamos puntos por defecto */
        padding: 0;
    }

    .recipe-detail__list li {
        padding: 8px 0;
        border-bottom: 1px dashed #eee;
        font-size: 1.05rem;
    }

    .recipe-detail__list li .amount {
        font-weight: bold;
        color: var(--accent);
        margin-right: 6px;
    }

    .recipe-detail__steps {
        padding-left: 20px; /* Espacio para los números */
    }

    .recipe-detail__steps li {
        margin-bottom: 15px;
        line-height: 1.6;
        font-size: 1.05rem;
        padding-left: 10px;
    }

    /* Estilos de Comentarios (Mantenidos) */
    .recipe-comments {
        max-width: 800px;
        margin: 0 auto 120px;
        padding: 0 20px;
    }
    .recipe-comments__box, .recipe-comments__list {
        background: #fff;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,0.1);
        padding: 25px;
        margin-bottom: 30px;
    }

    .recipe-comments__title { 
        text-align: center; 
        margin-bottom: 20px; 
        color: var(--dark); 
    }

    .recipe-comments__row { 
        margin-bottom: 15px; 
    }

    .recipe-comments__input { 
        width: 100%; 
        padding: 12px; 
        border-radius: 8px; 
        border: 1px solid #ccc; 
        margin-top: 5px; 
        font-family: inherit; 
    }
    .recipe-comments__btn { 
        padding: 12px 24px; 
        border-radius: 8px; 
        background: var(--dark); 
        color: #fff; 
        border: none; 
        cursor: pointer; 
        font-size: 1rem; 
        width: 100%; 
    }

    .recipe-comments__btn:hover { 
        opacity: 0.9; 
    }

    .recipe-comments__item { 
        margin-bottom: 20px; 
    }

    .recipe-comments__meta { 
        font-size: 0.85rem; 
        color: #888; 
        margin-bottom: 5px; 
    }

    .recipe-comments__divider { 
        border: 0; 
        border-top: 1px solid #eee; 
        margin-top: 15px; 
    }

    :deep(strong), :deep(b) {
        font-weight: 700 !important;
        color: var(--dark); /* Opcional: para que resalte con el color principal */
    }
    
    /* Específico para los pasos si quieres asegurar más */
    .recipe-detail__steps li :deep(strong) {
        font-weight: 800;
    }
</style>