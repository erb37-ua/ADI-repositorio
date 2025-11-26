<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRouter, RouterLink } from 'vue-router'
    import { useMainStore } from '@/stores/main'

    const router = useRouter()
    const store = useMainStore()

    // Edición
    const editingId = ref(null)
    const editTexto = ref('')
    const editRating = ref(5)

    // Paginación
    const currentPage = ref(1)
    const pageSize = 4 // igual que en ListView

    onMounted(async () => {
        if (!store.isLogged) {
            router.push('/login')
            return
        }

        try {
            await store.loadMyComments()
        } catch (err) {}
    })

    const hasComments = computed(() => store.myComments.length > 0)

    const totalPages = computed(() =>
    Math.max(1, Math.ceil(store.myComments.length / pageSize)),
    )

    const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return store.myComments.slice(start, start + pageSize)
    })

    const setPage = (page) => {
        if (page < 1 || page > totalPages.value) return
        currentPage.value = page
    }

    // Iniciar edición de un comentario
    const startEdit = (comment) => {
        editingId.value = comment.id
        editTexto.value = comment.texto || ''
        editRating.value = comment.rating != null ? String(comment.rating) : 5
    }

    // Cancelar edición
    const cancelEdit = () => {
        editingId.value = null
        editTexto.value = ''
        editRating.value = 5
    }

    // Guardar comentario
    const saveEdit = async () => {
        if (!editingId.value) return
        if (!editTexto.value.trim()) {
            alert('El comentario no puede estar vacío.')
            return
        }

        try {
            await store.updateMyComment(editingId.value, {
            texto: editTexto.value.trim(),
            rating: Number(editRating.value),
            })
            cancelEdit()
            alert('Comentario actualizado correctamente.')
        } catch (err) {
            console.error('Error actualizando comentario (vista):', err)
            alert('No se pudo actualizar el comentario.')
        }
    }


    // ELIMINAR COMENTARIO
    const handleDelete = async (id) => {
        if (!confirm('¿Seguro que quieres eliminar este comentario?')) return
        try {
            await store.deleteMyComment(id)
            // ajustar página si se queda fuera de rango
            if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value
            }
        } catch (err) {
            console.error('Error eliminando comentario:', err)
            alert('No se pudo eliminar el comentario.')
        }
    }

    // Fecha
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
</script>

<template>
    <div class="container">
        <section class="my-comments-card">
        <h2 class="my-comments__title"><strong>Mis comentarios</strong></h2>

        <p v-if="store.myCommentsLoading" class="my-comments__status">
            Cargando tus comentarios...
        </p>

        <p v-else-if="!hasComments" class="my-comments__status">
            Aún no has dejado ningún comentario.
            <RouterLink to="/" class="my-comments__link">
            Ve a una receta y deja el primero 😊
            </RouterLink>
        </p>

        <p v-if="store.myCommentsError" class="my-comments__error">
            {{ store.myCommentsError }}
        </p>

        <div v-else-if="hasComments" class="my-comments__list">
            <article
            v-for="comment in paginatedComments"
            :key="comment.id"
            class="my-comments__item"
            >
            <div class="my-comments__recipe">
                <img
                class="my-comments__recipe-image"
                :src="comment.receta?.imagenUrl || '/placeholder.jpg'"
                :alt="comment.receta?.titulo || 'Receta'"
                @error="$event.target.src = '/placeholder.jpg'"
                />
                <div class="my-comments__recipe-info">
                <RouterLink
                    v-if="comment.receta"
                    :to="{ name: 'recipe-detail', params: { id: comment.receta.id } }"
                    class="my-comments__recipe-title"
                >
                    {{ comment.receta.titulo }}
                </RouterLink>
                <p v-else class="my-comments__recipe-title">
                    Receta eliminada
                </p>
                <p class="my-comments__meta">
                    Creado: {{ formatDate(comment.created) }}
                    <span v-if="comment.updated && comment.updated !== comment.created">
                    · Editado: {{ formatDate(comment.updated) }}
                    </span>
                </p>
                <p class="my-comments__rating" v-if="comment.rating != null">
                    Valoración:
                    <span class="my-comments__stars">
                    {{ '⭐'.repeat(comment.rating) }}
                    </span>
                    <span class="my-comments__rating-number">
                    ({{ comment.rating }}/5)
                    </span>
                </p>
                </div>
            </div>

            <div class="my-comments__content">
                <!-- Modo lectura -->
                <p v-if="editingId !== comment.id" class="my-comments__text">
                {{ comment.texto }}
                </p>

                <!-- Modo edición -->
                <div v-else class="my-comments__edit">
                <label class="my-comments__label">Comentario:</label>
                <textarea
                    v-model="editTexto"
                    rows="3"
                    class="my-comments__textarea"
                ></textarea>

                <label class="my-comments__label">Valoración:</label>
                <select v-model.number="editRating" class="my-comments__select">
                    <option :value="5">{{ '⭐'.repeat(5) }}</option>
                    <option :value="4">{{ '⭐'.repeat(4) }}</option>
                    <option :value="3">{{ '⭐'.repeat(3) }}</option>
                    <option :value="2">{{ '⭐'.repeat(2) }}</option>
                    <option :value="1">{{ '⭐'.repeat(1) }}</option>
                </select>


                <div class="my-comments__edit-actions">
                    <button
                    type="button"
                    class="my-comments__btn my-comments__btn--secondary"
                    @click="cancelEdit"
                    >
                    Cancelar
                    </button>
                    <button
                    type="button"
                    class="my-comments__btn my-comments__btn--primary"
                    @click="saveEdit"
                    >
                    Guardar cambios
                    </button>
                </div>
                </div>

                <!-- Acciones -->
                <div v-if="editingId !== comment.id" class="my-comments__actions">
                <button
                    type="button"
                    class="my-comments__chip my-comments__chip--edit"
                    @click="startEdit(comment)"
                >
                    Editar
                </button>
                <button
                    type="button"
                    class="my-comments__chip my-comments__chip--delete"
                    @click="handleDelete(comment.id)"
                >
                    Eliminar
                </button>
                </div>
            </div>
            </article>

            <!-- Paginación -->
            <nav
            v-if="store.myComments.length > 0"
            class="my-comments__pagination"
            aria-label="Paginación"
            >
            <button
                type="button"
                class="my-comments__page-link"
                @click="setPage(currentPage - 1)"
            >
                «
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                type="button"
                class="my-comments__page-link"
                :class="{ 'my-comments__page-link--active': page === currentPage }"
                @click="setPage(page)"
            >
                {{ page }}
            </button>
            <button
                type="button"
                class="my-comments__page-link"
                @click="setPage(currentPage + 1)"
            >
                »
            </button>
            </nav>
        </div>
        </section>
    </div>
</template>

<style scoped>

    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 40px 20px 120px;
        display: flex;
        justify-content: center;
    }

    .my-comments-card {
        background: var(--card);
        border-radius: var(--radius);
        padding: var(--pad);
        border: 2px solid var(--dark);
        width: 100%;
    }

    .my-comments__title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.8rem;
    }

    .my-comments__status {
        text-align: center;
        margin-top: 10px;
    }

    .my-comments__link {
        color: var(--accent);
        text-decoration: none;
        font-weight: bold;
        margin-left: 5px;
    }

    .my-comments__error {
        color: #b91c1c;
        text-align: center;
        margin-top: 10px;
    }

    /* Lista */
    .my-comments__list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 20px;
    }

    .my-comments__item {
        background: #fff;
        border-radius: 14px;
        padding: 14px 16px;
        border: 2px solid rgba(46, 125, 50, 0.35);
    }

    /* Parte receta */
    .my-comments__recipe {
        display: flex;
        gap: 14px;
        align-items: center;
    }

    .my-comments__recipe-image {
        width: 72px;
        height: 72px;
        border-radius: 12px;
        object-fit: cover;
        flex-shrink: 0;
    }

    .my-comments__recipe-info {
        flex: 1;
        min-width: 0;
    }

    .my-comments__recipe-title {
        font-weight: bold;
        font-size: 1.05rem;
        margin-bottom: 4px;
        color: inherit;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .my-comments__recipe-title:hover {
        color: var(--accent);
    }

    .my-comments__meta {
        font-size: 0.85rem;
        color: #666;
    }

    .my-comments__rating {
        margin-top: 4px;
        font-size: 0.9rem;
    }

    .my-comments__stars {
        margin-left: 4px;
    }

    .my-comments__rating-number {
    margin-left: 4px;
        color: #666;
    }

    /* Contenido del comentario */
    .my-comments__content {
        margin-top: 10px;
    }

    .my-comments__text {
        margin-bottom: 8px;
        line-height: 1.4;
    }

    /* Edición */
    .my-comments__edit {
        margin-top: 4px;
    }

    .my-comments__label {
        display: block;
        font-weight: bold;
        margin-bottom: 4px;
    }

    .my-comments__textarea {
        width: 100%;
        padding: 8px;
        border-radius: 10px;
        border: 1px solid #ccc;
        font-family: inherit;
        margin-bottom: 8px;
        resize: vertical;
    }

    .my-comments__select {
        width: 150px;
        padding: 6px 8px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }

    /* Botones */
    .my-comments__edit-actions {
        display: flex;
        gap: 10px;
        margin-top: 6px;
    }

    .my-comments__btn {
        padding: 8px 16px;
        border-radius: 18px;
        border: none;
        cursor: pointer;
        font-family: 'Itim', sans-serif;
        font-size: 0.95rem;
    }

    .my-comments__btn--primary {
        background: var(--dark);
        color: #fff;
    }

    .my-comments__btn--secondary {
        background: #e5e7eb;
        color: #111827;
    }

    .my-comments__actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }

    .my-comments__chip {
        border-radius: 999px;
        padding: 6px 14px;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
        font-family: 'Itim', sans-serif;
    }

    .my-comments__chip--edit {
        background: #e0f2fe;
        color: #0f172a;
    }

    .my-comments__chip--delete {
        background: #fee2e2;
        color: #991b1b;
    }

    .my-comments__pagination {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 20px;
    }

    .my-comments__page-link {
        background: none;
        border: none;
        color: var(--dark);
        font-size: 16px;
        cursor: pointer;
        font-family: 'Itim', sans-serif;
    }

    .my-comments__page-link:hover {
        color: var(--accent);
    }

    .my-comments__page-link--active {
        color: var(--accent);
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .my-comments__recipe {
            flex-direction: row;
            align-items: flex-start;
        }

        .my-comments__recipe-image {
            width: 64px;
            height: 64px;
        }
    }
</style>
