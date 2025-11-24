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

// Estructuras de datos para el JSON
// Inicializamos ingredientes con una sección por defecto si está vacío
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
            
            // Cargar Categorías
            categoriasSeleccionadas.value = Array.isArray(receta.categoria) ? receta.categoria : []
            
            // Cargar Ingredientes (JSON Estructurado)
            if (receta.ingredientes && Array.isArray(receta.ingredientes) && receta.ingredientes.length > 0) {
                ingredientes.value = receta.ingredientes
            }

            // Cargar Pasos (JSON Estructurado)
            if (receta.pasos && Array.isArray(receta.pasos) && receta.pasos.length > 0) {
                pasos.value = receta.pasos
            }
            
            if (receta.imagenUrl) {
                imagenPreview.value = receta.imagenUrl
            }
        } catch (error) {
            console.error("Error cargando receta:", error)
            alert("Error al cargar la receta.")
            router.push('/list')
        }
    }
})

// --- LÓGICA DE INGREDIENTES ---
const addIngredientSection = () => {
    ingredientes.value.push({ section: 'Nueva Sección', items: [{ amount: '', name: '' }] })
}
const removeIngredientSection = (index) => {
    ingredientes.value.splice(index, 1)
}
const addIngredientItem = (sectionIndex) => {
    ingredientes.value[sectionIndex].items.push({ amount: '', name: '' })
}
const removeIngredientItem = (sectionIndex, itemIndex) => {
    ingredientes.value[sectionIndex].items.splice(itemIndex, 1)
}

// --- LÓGICA DE PASOS ---
const addStep = () => {
    pasos.value.push({ number: pasos.value.length + 1, instruction: '' })
}
const removeStep = (index) => {
    pasos.value.splice(index, 1)
    // Recalcular números de paso
    pasos.value.forEach((step, i) => step.number = i + 1)
}

// --- MANEJO DE IMAGEN ---
const handleImagenChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    imagenFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => imagenPreview.value = e.target?.result || '/subir.png'
    reader.readAsDataURL(file)
}

// --- CATEGORÍAS ---
const handleCategoriaAdd = () => {
    const value = categoriaSelect.value
    if (!value) return
    if (!categoriasSeleccionadas.value.includes(value)) {
        categoriasSeleccionadas.value.push(value)
    }
    categoriaSelect.value = ''
}
const removeCategoria = (cat) => {
    categoriasSeleccionadas.value = categoriasSeleccionadas.value.filter(c => c !== cat)
}

// --- GUARDAR / CREAR ---
const handleSubmit = async () => {
    if (!titulo.value || categoriasSeleccionadas.value.length === 0) {
        alert("Debes añadir al menos el título y una categoría.")
        return
    }

    const formData = new FormData()
    formData.append("titulo", titulo.value)
    formData.append("descripcion", descripcion.value)
    
    // Enviamos los objetos JSON tal cual
    formData.append("ingredientes", JSON.stringify(ingredientes.value))
    formData.append("pasos", JSON.stringify(pasos.value))
    formData.append("categoria", JSON.stringify(categoriasSeleccionadas.value))
    
    if (imagenFile.value) {
        formData.append("imagen", imagenFile.value)
    }

    try {
        if (isEditMode.value) {
            await store.updateRecipe(recipeId, formData)
            alert("¡Receta actualizada correctamente!")
        } else {
            await store.createRecipe(formData)
            alert("¡Receta creada correctamente!")
        }
        router.push('/list')
    } catch (error) {
        console.error("Error guardando:", error)
        alert("Hubo un error: " + error.message)
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
                <div class="form-card__image">
                    <img :src="imagenPreview" alt="Imagen receta" @error="imagenPreview = '/subir.png'" />
                    <label class="custom-file-upload">
                        <input type="file" id="imagenInput" accept="image/*" @change="handleImagenChange" />
                        Cambiar imagen
                    </label>
                </div>

                <div class="form-card__content">
                    <label class="form-card__label">Título:</label>
                    <input class="form-card__input" placeholder="Ej. Espaguetis a la Carbonara" v-model="titulo" />

                    <label class="form-card__label">Descripción:</label>
                    <textarea class="form-card__input" placeholder="Breve descripción..." v-model="descripcion"></textarea>

                    <label class="form-card__label">Ingredientes:</label>
                    <div class="dynamic-list">
                        <div v-for="(section, sIndex) in ingredientes" :key="sIndex" class="ingredient-section">
                            <div class="section-header">
                                <input v-model="section.section" placeholder="Nombre de sección (ej. Para la salsa)" class="input-subtle">
                                <button type="button" class="btn-icon-delete" @click="removeIngredientSection(sIndex)" v-if="ingredientes.length > 1">✕</button>
                            </div>
                            
                            <div v-for="(item, iIndex) in section.items" :key="iIndex" class="ingredient-row">
                                <input v-model="item.amount" placeholder="Cant. (320g)" class="input-small">
                                <input v-model="item.name" placeholder="Ingrediente" class="input-flex">
                                <button type="button" class="btn-icon-delete" @click="removeIngredientItem(sIndex, iIndex)">-</button>
                            </div>
                            <button type="button" class="btn-text-add" @click="addIngredientItem(sIndex)">+ Añadir ingrediente</button>
                        </div>
                        <button type="button" class="btn-secondary-small" @click="addIngredientSection">Añadir nueva sección</button>
                    </div>

                    <label class="form-card__label mt-4">Pasos de preparación:</label>
                    <div class="dynamic-list">
                        <div v-for="(step, index) in pasos" :key="index" class="step-row">
                            <span class="step-number">{{ step.number }}</span>
                            <textarea v-model="step.instruction" placeholder="Describe el paso..." class="input-flex step-input"></textarea>
                            <button type="button" class="btn-icon-delete" @click="removeStep(index)">✕</button>
                        </div>
                        <button type="button" class="btn-secondary-small" @click="addStep">+ Añadir paso</button>
                    </div>

                    <label class="form-card__label mt-4">Categoría:</label>
                    <div class="form-card__categoria">
                        <select id="categoriaSelect" class="form-card__input" v-model="categoriaSelect" @change="handleCategoriaAdd">
                            <option value=""> Selecciona </option>
                            <option value="Desayuno">Desayuno</option>
                            <option value="Comida">Comida</option>
                            <option value="Cena">Cena</option>
                            <option value="Salado">Salado</option>
                            <option value="Dulce">Dulce</option>
                        </select>
                        <div class="categoria-seleccionadas">
                            <span v-for="cat in categoriasSeleccionadas" :key="cat" class="categoria-tag" @click="removeCategoria(cat)">
                                {{ cat }} ✕
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-card__actions">
                <button class="form-card__button form-card__button--secondary" type="button" @click="handleCancelar">Cancelar</button>
                <button class="form-card__button form-card__button--primary" type="button" @click="handleSubmit">
                    {{ isEditMode ? 'Guardar' : 'Crear' }}
                </button>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .container { 
        max-width: 1000px; margin: 0 auto; padding: 40px 20px 120px; 
        display: flex; justify-content: center; 
    }
    .form-card { 
        background: var(--card); border-radius: var(--radius); padding: var(--pad); 
        border: 2px solid var(--dark); /* Fallback por si no existe var */
        width: 100%; text-align: center; 
    }
    .form-card__title { 
        margin-bottom: 28px;
        font-weight: bold; 
    }
    .form-card__body { 
        display: flex; gap: 40px; align-items: flex-start; 
    }
    
    @media (max-width: 768px) {
        .form-card__body { 
            flex-direction: column; 
            align-items: center; 
        }
    }

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
    
    .form-card__content { 
        flex: 1; text-align: left; 
        width: 100%; 
    }

    .form-card__label { 
        display: block; 
        margin-bottom: 6px; 
        font-weight: bold; 
    }

    .mt-4 { 
        margin-top: 20px; 
    }

    /* Estilos de Inputs Generales */
    .form-card__input { 
        width: 100%; padding: 10px; border-radius: 10px; 
        border: 2px solid var(--dark); margin-bottom: 15px; 
        font-family: "Itim"; font-size: 1rem; box-sizing: border-box;
    }

    /* Estilos Listas Dinámicas (Ingredientes/Pasos) */
    .dynamic-list { 
        background: #f9f9f9; 
        padding: 15px; border-radius: 10px; 
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

    .input-subtle { 
        border: none; 
        background: transparent; 
        font-weight: bold; 
        color: #555; 
        width: 100%;
    }
    
    .ingredient-row, .step-row { 
        display: flex; 
        gap: 10px; 
        margin-bottom: 8px; 
        align-items: center; 
    }

    .input-small { 
        width: 120px; 
        padding: 8px; 
        border: 1px solid #ccc; 
        border-radius: 5px; 
    }

    .input-flex { 
        flex: 1; 
        padding: 8px; 
        border: 1px solid #ccc; 
        border-radius: 5px; 
    }

    .step-input { 
        min-height: 60px; 
        resize: vertical; 
    }

    .step-number { 
        font-weight: bold; 
        background: #ddd; 
        width: 25px; 
        height: 25px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 0.9rem; 
    }

    /* Botones pequeños dentro del formulario */
    .btn-icon-delete { 
        background: #ff4d4d; 
        color: white; 
        border: none; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        cursor: pointer; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 12px; 
    }

    .btn-text-add { 
        background: none; 
        border: none; 
        color: var(--dark); 
        cursor: pointer; 
        font-size: 0.9rem; 
        margin-top: 5px; 
    }

    .btn-secondary-small { 
        background: #e2e6ea; 
        border: none; 
        padding: 8px 15px; 
        border-radius: 15px; 
        cursor: pointer; 
        font-size: 0.9rem; 
        margin-top: 10px; 
    }

    .btn-secondary-small:hover { 
        background: #dbe0e5; 
    }

    /* Categorías */
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
        font-size: 0.9rem; 
        cursor: pointer; 
    }

    /* Botones Principales (Fix Transparencia) */
    .form-card__actions { 
        display: flex; 
        gap: 40px; 
        margin-top: 30px; 
        justify-content: center; 
    }

    .form-card__button { 
        padding: 12px 35px; 
        border-radius: 25px; 
        cursor: pointer; 
        border: none; 
        font-size: 18px; 
        font-family: 'Itim'; 
    }
    
    .form-card__button--primary { 
        background-color: var(--dark);
        color: #fff; 
    }

    .form-card__button--primary:hover { 
        background-color: var(--dark-hover); 
    }

    .form-card__button--secondary { 
        background: #ccc; 
        color: #333; 
    }

    .form-card__button--secondary:hover { 
        background: #bbb; 
    }
</style>