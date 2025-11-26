<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useMainStore } from '@/stores/main'

    const router = useRouter()
    const route = useRoute()
    const store = useMainStore()

    // Variables principales
    const titulo = ref('')
    const descripcion = ref('')
    const categoriaSelect = ref('')
    const categoriasSeleccionadas = ref([])
    const imagenPreview = ref('/subir.png')
    const imagenFile = ref(null)
    const isDefaultImage = ref(true)
    const isShaking = ref(false)

    // flags de error por campo
    const invalidTitle = ref(false)
    const invalidCategory = ref(false)
    const invalidImage = ref(false)

    // Estructuras de datos
    const ingredientes = ref([
    { section: 'Ingredientes Principales', items: [{ amount: '', name: '' }] }
    ])
    const pasos = ref([{ number: 1, instruction: '' }])

    const isEditMode = computed(() => !!route.params.id)
    const recipeId = route.params.id

    // --- AL MONTAR LA PÁGINA ---
    onMounted(async () => {
    if (isEditMode.value) {
        try {
        const receta = await store.fetchRecipeById(recipeId)

        titulo.value = receta.titulo
        descripcion.value = receta.descripcion
        categoriasSeleccionadas.value = Array.isArray(receta.categoria) ? receta.categoria : []

        if (receta.ingredientes && Array.isArray(receta.ingredientes) && receta.ingredientes.length > 0) {
            ingredientes.value = receta.ingredientes
        }
        if (receta.pasos && Array.isArray(receta.pasos) && receta.pasos.length > 0) {
            pasos.value = receta.pasos
        }

        if (receta.imagenUrl) {
            imagenPreview.value = receta.imagenUrl
            isDefaultImage.value = false
        }
        } catch (error) {
        console.error('Error cargando receta:', error)
        alert('Error al cargar la receta.')
        router.push('/list')
        }
    }
    })

    // --- LÓGICA AUXILIAR (igual que antes) ---
    const addIngredientSection = () =>
    ingredientes.value.push({ section: 'Nueva Sección', items: [{ amount: '', name: '' }] })

    const removeIngredientSection = (index) => ingredientes.value.splice(index, 1)

    const addIngredientItem = (sectionIndex) =>
    ingredientes.value[sectionIndex].items.push({ amount: '', name: '' })

    const removeIngredientItem = (sectionIndex, itemIndex) =>
    ingredientes.value[sectionIndex].items.splice(itemIndex, 1)

    const addStep = () => pasos.value.push({ number: pasos.value.length + 1, instruction: '' })

    const removeStep = (index) => {
    pasos.value.splice(index, 1)
    pasos.value.forEach((step, i) => (step.number = i + 1))
    }

    const handleImagenChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    imagenFile.value = file
    isDefaultImage.value = false
    const reader = new FileReader()
    reader.onload = (e) => (imagenPreview.value = e.target?.result || '/subir.png')
    reader.readAsDataURL(file)
    }

    const handleCategoriaAdd = () => {
    const value = categoriaSelect.value
    if (!value) return
    if (!categoriasSeleccionadas.value.includes(value)) {
        categoriasSeleccionadas.value.push(value)
    }
    categoriaSelect.value = ''
    }

    const removeCategoria = (cat) => {
    categoriasSeleccionadas.value = categoriasSeleccionadas.value.filter((c) => c !== cat)
    }

    // Temblor del botón
    const triggerShake = () => {
    isShaking.value = false
    void document.body.offsetWidth  // reflow
    isShaking.value = true
    setTimeout(() => {
        isShaking.value = false
    }, 500)
    }

    // --- GUARDAR / CREAR ---
    const handleSubmit = async () => {
    // reset de errores visuales
    invalidTitle.value = false
    invalidCategory.value = false
    invalidImage.value = false

    const missingTitle = !titulo.value.trim()
    const missingCategory = categoriasSeleccionadas.value.length === 0
    const missingImage = isDefaultImage.value

    if (missingTitle || missingCategory || missingImage) {
        invalidTitle.value = missingTitle
        invalidCategory.value = missingCategory
        invalidImage.value = missingImage

        triggerShake()

        let message = ''
        if (missingTitle && missingCategory && missingImage) {
        message = 'Debes añadir al menos el título, una categoría y la imagen.'
        } else if (missingTitle && !missingCategory && !missingImage) {
        message = 'Debes añadir un título.'
        } else if (!missingTitle && missingCategory && !missingImage) {
        message = 'Debes añadir al menos una categoría.'
        } else if (!missingTitle && !missingCategory && missingImage) {
        message = 'Debes añadir una imagen.'
        } else {
        const partes = []
        if (missingTitle) partes.push('un título')
        if (missingCategory) partes.push('al menos una categoría')
        if (missingImage) partes.push('una imagen')
        message = 'Debes añadir ' + partes.join(' y ') + '.'
        }

        // pequeño retardo para que empiece la animación antes del alert
        setTimeout(() => alert(message), 80)
        return
    }

    const formData = new FormData()
    formData.append('titulo', titulo.value)
    formData.append('descripcion', descripcion.value)
    formData.append('ingredientes', JSON.stringify(ingredientes.value))
    formData.append('pasos', JSON.stringify(pasos.value))
    formData.append('categoria', JSON.stringify(categoriasSeleccionadas.value))
    if (imagenFile.value) formData.append('imagen', imagenFile.value)

    try {
        if (isEditMode.value) {
        await store.updateRecipe(recipeId, formData)
        alert('¡Receta actualizada correctamente!')
        } else {
        await store.createRecipe(formData)
        alert('¡Receta creada correctamente!')
        }
        router.push('/list')
    } catch (error) {
        console.error('Error guardando:', error)
        triggerShake()
        alert('Hubo un error al guardar: ' + (error.message || ''))
    }
    }

    const handleCancelar = () => router.push('/list')
</script>



<template>
    <div class="container">
        <section class="form-card">
        <h2 class="form-card__title">
            {{ isEditMode ? 'Editar Receta' : 'Añadir receta' }}
        </h2>

        <div class="form-card__body">
            <div class="form-card__image" :class="{ 'form-card__image--error': invalidImage }">
            <img :src="imagenPreview" alt="Imagen receta" @error="imagenPreview = '/subir.png'" />

            <input
                type="file"
                id="imagenInput"
                accept="image/*"
                @change="handleImagenChange"
                class="hidden-input"
            />

            <label for="imagenInput" class="upload-btn-container">
                <div class="upload-box-icon">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    ></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                </div>
                <span class="upload-text">
                {{ isDefaultImage ? 'Selecciona una imagen' : 'Cambiar imagen' }}
                </span>
            </label>
            </div>

            <div class="form-card__content">
            <label class="form-card__label">Título:</label>
            <input
                class="form-card__input"
                :class="{ 'form-card__input--error': invalidTitle }"
                placeholder="Ej. Espaguetis a la Carbonara"
                v-model="titulo"
            />

            <label class="form-card__label">Descripción:</label>
            <textarea
                class="form-card__input"
                placeholder="Breve descripción..."
                v-model="descripcion"
            ></textarea>

            <label class="form-card__label">Ingredientes:</label>
            <div class="dynamic-list">
                <div
                v-for="(section, sIndex) in ingredientes"
                :key="sIndex"
                class="ingredient-section"
                >
                <div class="section-header">
                    <input
                    v-model="section.section"
                    placeholder="Nombre de sección (ej. Para la salsa)"
                    class="input-section-title"
                    />
                    <button
                    type="button"
                    class="btn-icon-delete"
                    @click="removeIngredientSection(sIndex)"
                    v-if="ingredientes.length > 1"
                    >
                    ✕
                    </button>
                </div>

                <div
                    v-for="(item, iIndex) in section.items"
                    :key="iIndex"
                    class="ingredient-row"
                >
                    <input v-model="item.amount" placeholder="Cant. (320g)" class="input-small" />
                    <input v-model="item.name" placeholder="Ingrediente" class="input-flex" />
                    <button
                    type="button"
                    class="btn-icon-delete"
                    @click="removeIngredientItem(sIndex, iIndex)"
                    >
                    -
                    </button>
                </div>
                <button
                    type="button"
                    class="btn-text-add"
                    @click="addIngredientItem(sIndex)"
                >
                    + Añadir ingrediente
                </button>
                </div>
                <button
                type="button"
                class="btn-secondary-small"
                @click="addIngredientSection"
                >
                Añadir nueva sección
                </button>
            </div>

            <label class="form-card__label mt-4">Pasos de preparación:</label>
            <div class="dynamic-list">
                <div v-for="(step, index) in pasos" :key="index" class="step-row">
                <span class="step-number">{{ step.number }}</span>
                <textarea
                    v-model="step.instruction"
                    placeholder="Describe el paso..."
                    class="input-flex step-input"
                ></textarea>
                <button
                    type="button"
                    class="btn-icon-delete"
                    @click="removeStep(index)"
                >
                    ✕
                </button>
                </div>
                <button type="button" class="btn-secondary-small" @click="addStep">
                + Añadir paso
                </button>
            </div>

            <label class="form-card__label mt-4">Categoría:</label>
            <div class="form-card__categoria">
                <select
                id="categoriaSelect"
                :class="{ 'form-card__input--error': invalidCategory }"
                class="form-card__input"
                v-model="categoriaSelect"
                @change="handleCategoriaAdd"
                >
                <option value=""> Selecciona </option>
                <option value="Desayuno">Desayuno</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
                <option value="Salado">Salado</option>
                <option value="Dulce">Dulce</option>
                </select>
                <div class="categoria-seleccionadas">
                <span
                    v-for="cat in categoriasSeleccionadas"
                    :key="cat"
                    class="categoria-tag"
                    @click="removeCategoria(cat)"
                >
                    {{ cat }} ✕
                </span>
                </div>
            </div>
            </div>
        </div>

        <div class="form-card__actions">
            <button
            class="form-card__button form-card__button--secondary"
            type="button"
            @click="handleCancelar"
            >
            Cancelar
            </button>

            <button
            class="form-card__button form-card__button--primary"
            :class="{ shake: isShaking }"
            type="button"
            @click="handleSubmit"
            >
            {{ isEditMode ? 'Guardar' : 'Crear' }}
            </button>
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
    font-family: 'Itim', sans-serif;
    }

    .form-card {
    background: var(--card);
    border-radius: var(--radius);
    padding: var(--pad);
    border: 2px solid var(--dark);
    width: 100%;
    text-align: center;
    }

    .form-card__title {
    margin-bottom: 28px;
    font-weight: bold;
    font-size: 2.2rem;
    color: var(--dark);
    }

    .form-card__body {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    }

    @media (max-width: 768px) {
    .form-card__body {
        flex-direction: column;
        align-items: center;
    }
    }

    /* IMAGEN */
    .form-card__image {
    width: 280px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .form-card__image img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    background: #f0f0f0;
    }

    .hidden-input {
    display: none;
    }

    .upload-btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    margin-top: 5px;
    }

    /* ICONO CUADRADO GRIS */
    .upload-box-icon {
    width: 45px;
    height: 45px;
    background-color: #e9e9e9;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    border: 1px solid #ccc;
    transition: background-color 0.2s;
    }

    .upload-box-icon:hover {
    background-color: #d6d6d6;
    }

    .upload-text {
    font-size: 1rem;
    color: var(--dark);
    font-weight: bold;
    text-decoration: underline;
    }

    /* FORMULARIO DERECHA */
    .form-card__content {
    flex: 1;
    text-align: left;
    width: 100%;
    }

    .form-card__label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 1.3rem;
    color: #333;
    }

    .mt-4 {
    margin-top: 25px;
    }

    .form-card__input {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 2px solid var(--dark);
    margin-bottom: 15px;
    font-family: 'Itim', sans-serif;
    font-size: 1.1rem;
    box-sizing: border-box;
    }

    /* LISTAS DINÁMICAS */
    .dynamic-list {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #eee;
    }

    .ingredient-section {
    margin-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 10px;
    }

    .section-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    }

    /* INPUT TÍTULO SECCIÓN */
    .input-section-title {
    border: 1px solid #ccc;
    background: #fff;
    font-weight: bold;
    color: #333;
    width: 100%;
    font-size: 1.1rem;
    font-family: 'Itim', sans-serif;
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .ingredient-row,
    .step-row {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    align-items: center;
    }

    .input-small {
    width: 100px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Itim', sans-serif;
    }

    .input-flex {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Itim', sans-serif;
    }

    .step-input {
    min-height: 60px;
    resize: vertical;
    }

    .step-number {
    font-weight: bold;
    background: #ddd;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    }

    /* BOTONES PEQUEÑOS */
    .btn-icon-delete {
    background: #ff4d4d;
    color: white;
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    }

    .btn-text-add {
    background: none;
    border: none;
    color: var(--dark);
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 5px;
    font-family: 'Itim', sans-serif;
    }

    .btn-text-add:hover {
    text-decoration: underline;
    }

    .btn-secondary-small {
    background: #e2e6ea;
    border: none;
    padding: 8px 15px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.95rem;
    margin-top: 10px;
    font-family: 'Itim', sans-serif;
    }

    .btn-secondary-small:hover {
    background: #dbe0e5;
    }

    .categoria-seleccionadas {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: -5px;
    margin-bottom: 20px;
    }

    .categoria-tag {
    background-color: #ffd966;
    color: #333;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 1rem;
    cursor: pointer;
    }

    /* BOTONES PRINCIPALES */
    .form-card__actions {
    display: flex;
    gap: 40px;
    margin-top: 40px;
    justify-content: center;
    }

    .form-card__button {
    padding: 12px 40px;
    border-radius: 25px;
    cursor: pointer;
    border: none;
    font-size: 1.2rem;
    font-family: 'Itim', sans-serif;
    transition: background-color 0.2s, opacity 0.2s;
    }

    .form-card__button--primary {
    background-color: var(--dark);
    color: #fff;
    }

    .form-card__button--primary:hover {
    background-color: var(--dark);
    opacity: 0.9;
    }

    .form-card__button--secondary {
    background: #ccc;
    color: #333;
    }

    .form-card__button--secondary:hover {
    background: #bbb;
    }

    .form-card__error {
    margin-top: 15px;
    color: #d9534f;
    font-weight: bold;
    font-size: 1rem;
    }

    /* ANIMACIÓN DE TEMBLOR */
    @keyframes button-shake {
    0% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-4px);
    }
    40% {
        transform: translateX(4px);
    }
    60% {
        transform: translateX(-4px);
    }
    80% {
        transform: translateX(4px);
    }
    100% {
        transform: translateX(0);
    }
    }

    .form-card__button--primary.shake {
    animation: button-shake 0.4s ease;
    }

    .form-card__input--error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }

    /* para remarcar el bloque de imagen */
    .form-card__image--error img {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }

</style>
