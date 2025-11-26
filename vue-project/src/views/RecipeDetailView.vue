<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'

const route = useRoute()
const router = useRouter()
const store = useMainStore()

const receta = ref(null)
const loading = ref(true)

// --- estado comentarios ---
const commentText = ref('')
const commentRating = ref(5)   // 1–5
const submittingComment = ref(false)

const comments = computed(() => store.recipeComments || [])
const commentsLoading = computed(() => store.recipeCommentsLoading)
const commentsError = computed(() => store.recipeCommentsError)

onMounted(async () => {
    const id = route.params.id
    if (!id) {
        router.push('/list')
        return
    }

    try {
        receta.value = await store.fetchRecipeById(id)
        await store.loadCommentsForRecipe(id)
    } catch (error) {
        console.error("Error cargando receta/comentarios:", error)
        alert("No se pudo cargar la receta.")
        router.push('/')
    } finally {
        loading.value = false
    }
})

// Función para convertir **Texto** en <strong>Texto</strong>
const formatInstruction = (text) => {
    if (!text) return ''
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

// Formatear fecha bonita
const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// Enviar comentario nuevo
const handleSubmitComment = async () => {
    if (!store.isLogged) {
        alert('Debes iniciar sesión para comentar.')
        router.push('/login')
        return
    }

    if (!commentText.value.trim()) {
        alert('El comentario no puede estar vacío.')
        return
    }

    if (!receta.value?.id) {
        alert('No se ha podido identificar la receta.')
        return
    }

    submittingComment.value = true
    try {
        await store.createCommentForRecipe({
            recetaId: receta.value.id,
            texto: commentText.value.trim(),
            rating: commentRating.value,   // ya es número
        })
        // limpiar formulario
        commentText.value = ''
        commentRating.value = 5
    } catch (err) {
        console.error('Error creando comentario:', err)
        alert('No se pudo enviar el comentario.')
    } finally {
        submittingComment.value = false
    }
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
                <div
                    v-if="Array.isArray(receta.ingredientes) && receta.ingredientes.length > 0 && receta.ingredientes[0].section"
                >
                    <div
                        v-for="(seccion, index) in receta.ingredientes"
                        :key="index"
                        class="ingredient-group"
                    >
                        <h4
                            v-if="seccion.section"
                            class="recipe-detail__subsection-title"
                        >
                            {{ seccion.section }}
                        </h4>
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
                <ol
                    v-if="Array.isArray(receta.pasos) && receta.pasos.length > 0 && receta.pasos[0].instruction"
                    class="recipe-detail__steps"
                >
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

                <form class="recipe-comments__form" @submit.prevent="handleSubmitComment">
                    <div class="recipe-comments__row">
                        <label for="rating">Valoración:</label><br />
                        <div
                            id="rating"
                            class="recipe-comments__rating-stars"
                            aria-label="Valoración"
                        >
                            <button
                                v-for="star in 5"
                                :key="star"
                                type="button"
                                class="recipe-comments__star"
                                :class="{ 'recipe-comments__star--active': star <= commentRating }"
                                @click="commentRating = star"
                                :aria-label="`${star} estrellas`"
                            >
                                ★
                            </button>
                        </div>
                    </div>

                    <div class="recipe-comments__row">
                        <label for="comment">Comentario:</label><br />
                        <textarea
                            id="comment"
                            class="recipe-comments__input"
                            rows="4"
                            placeholder="Escribe aquí..."
                            v-model="commentText"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        class="recipe-comments__btn"
                        :disabled="submittingComment"
                    >
                        {{ submittingComment ? 'Enviando...' : 'Enviar' }}
                    </button>
                </form>
            </div>

            <div class="recipe-comments__list">
                <h3 class="recipe-comments__title"><strong>Comentarios anteriores</strong></h3>

                <p v-if="commentsLoading" class="recipe-comments__meta">
                    Cargando comentarios...
                </p>

                <p v-else-if="commentsError" class="recipe-comments__meta">
                    Error al cargar comentarios.
                </p>

                <p
                    v-else-if="comments.length === 0"
                    class="recipe-comments__meta"
                >
                    Todavía no hay comentarios.
                </p>

                <div v-else>
                    <div
                        v-for="comment in comments"
                        :key="comment.id"
                        class="recipe-comments__item"
                    >
                        <p class="recipe-comments__author">
                            <strong>
                                {{ comment.usuario?.nombre || comment.usuario?.email || 'Usuario' }}
                            </strong>
                        </p>
                        <p class="recipe-comments__meta">
                            {{ formatDate(comment.created) }}
                        </p>
                        <p
                            v-if="comment.rating != null"
                            class="recipe-comments__stars"
                        >
                            {{ '⭐'.repeat(comment.rating) }}
                        </p>
                        <p class="recipe-comments__text">
                            {{ comment.texto }}
                        </p>
                        <hr class="recipe-comments__divider" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .recipe-detail {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 60px;
        margin-top: 30px;
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
        list-style: none;
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
        padding-left: 20px;
    }

    .recipe-detail__steps li {
        margin-bottom: 15px;
        line-height: 1.6;
        font-size: 1.05rem;
        padding-left: 10px;
    }

    .recipe-comments {
        max-width: 800px;
        margin: 0 auto 120px;
        padding: 0 20px;
    }

    .recipe-comments__box,
    .recipe-comments__list {
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

    /* Estrellas de valoración (formulario) */
    .recipe-comments__rating-stars {
        display: flex;
        gap: 6px;
        margin-top: 6px;
    }

    .recipe-comments__star {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 26px;
        padding: 0;
        line-height: 1;
        color: #d1d5db; /* gris claro */
        transition: transform 0.1s ease, color 0.1s ease;
    }

    .recipe-comments__star--active {
        color: #fbbf24; /* amarillo */
    }

    .recipe-comments__star:hover {
        transform: scale(1.1);
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

    :deep(strong),
    :deep(b) {
        font-weight: 700 !important;
        color: var(--dark);
    }

    .recipe-detail__steps li :deep(strong) {
        font-weight: 800;
    }
</style>
