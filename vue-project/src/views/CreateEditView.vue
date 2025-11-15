<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// Datos simulados de receta
const titulo = ref('Tarta de chocolate clásica')
const descripcion = ref('Bizcocho esponjoso de chocolate con cobertura suave y cobertura de cacao.')
const ingredientes = ref('Harina\nHuevos\nLeche\nChocolate en polvo\nAzúcar\nMantequilla')
const pasos = ref('Precalienta el horno a 180ºC.\nMezcla los ingredientes secos.\nAñade los ingredientes líquidos y bate.\nVierte en un molde engrasado.\nHornea durante 30-35 minutos.')
const categoriaSelect = ref('Dulce')
const categoriasSeleccionadas = ref(['Dulce'])
const imagenPreview = ref('/subir.png') // placeholder

const handleImagenChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
        imagenPreview.value = e.target?.result || '/subir.png'
    }
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
    categoriasSeleccionadas.value = categoriasSeleccionadas.value.filter(c => c !== cat)
}

const handleCancelar = () => {
    // Simula volver al listado de recetas
    router.push('/list')
}

const handleCrear = () => {
    const recetaSimulada = {
        titulo: titulo.value,
        descripcion: descripcion.value,
        ingredientes: ingredientes.value.split('\n').filter(l => l.trim() !== ''),
        pasos: pasos.value.split('\n').filter(l => l.trim() !== ''),
        categorias: categoriasSeleccionadas.value,
        imagen: imagenPreview.value
    }
    console.log('Receta simulada creada:', recetaSimulada)
    alert('Receta creada (simulación). Mira la consola para ver los datos.')
}
</script>

<template>
    <div class="container">
        <section class="form-card">
            <h2 class="form-card__title">Añadir receta</h2>
            <div class="form-card__body">
            <div class="form-card__image">
                <img :src="imagenPreview" alt="Imagen receta" />
                <input type="file" id="imagenInput" accept="image/*" @change="handleImagenChange" />
            </div>

            <div class="form-card__content">
                <label class="form-card__label" for="tituloInput">Título:</label>
                <input id="tituloInput" class="form-card__input" placeholder="Escribe aqui.." v-model="titulo" />

                <label class="form-card__label" for="descripcionInput">Descripción:</label>
                <textarea id="descripcionInput" class="form-card__input form-card__input--autosize" placeholder="Escribe aqui..." v-model="descripcion"></textarea>

                <label class="form-card__label" for="ingredientesInput">Ingredientes (uno por línea):</label>
                <textarea id="ingredientesInput" class="form-card__input form-card__input--autosize" placeholder="Ej: Harina&#10;Huevos&#10;Leche" v-model="ingredientes"></textarea>

                <label class="form-card__label" for="pasosInput">Pasos (uno por línea):</label>
                <textarea id="pasosInput" class="form-card__input form-card__input--autosize" placeholder="Paso 1...&#10;Paso 2..." v-model="pasos"></textarea>

                <label class="form-card__label" for="categoriaSelect">Categoría:</label>
                <div class="form-card__categoria">
                <select id="categoriaSelect" class="form-card__input" v-model="categoriaSelect" @change="handleCategoriaAdd">
                    <option value="">-- Selecciona una categoría --</option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Comida">Comida</option>
                    <option value="Cena">Cena</option>
                    <option value="Salado">Salado</option>
                    <option value="Dulce">Dulce</option>
                </select>

                <div id="categoriaSeleccionadas" class="categoria-seleccionadas">
                    <span v-for="cat in categoriasSeleccionadas" :key="cat" class="categoria-tag" @click="removeCategoria(cat)">{{ cat }} ✕</span>
                </div>
                </div>
            </div>
            </div>

            <div class="form-card__actions">
            <button class="form-card__button form-card__button--primary" type="button" @click="handleCancelar">Cancelar</button>
            <button class="form-card__button form-card__button--primary" type="button" @click="handleCrear">Crear</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
    /* Contenedor */
    .container { 
        max-width: 1000px; 
        margin: 0 auto; 
        padding: 40px 20px 120px; 
        display: flex; 
        justify-content: 
        center; align-items: center; 
    }

    /* Form card */
    .form-card { 
        background: var(--card); 
        border-radius: var(--radius); 
        padding: var(--pad); 
        border: 2px solid var(--blue); 
        max-width: 1000px; 
        width: 100%; 
        text-align: center; 
    }

    .form-card__title { 
        margin-bottom: 28px; 
    }

    .form-card__body { 
        display: flex; 
        gap: 40px; 
        align-items: flex-start; 
        justify-content: center; 
    }

    .form-card__image { 
        text-align: center; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
    }

    .form-card__image img { 
        width: 280px; 
        height: 280px; 
        object-fit: cover; 
        border-radius: 20px; 
        margin-top: 0; 
        margin-bottom: 10px; 
        border: 1px solid #ccc; 
    }

    .form-card__content { 
        flex: 1; 
        text-align: left; 
    }

    .form-card__label { 
        display: block; 
        margin-bottom: 6px; 
        font-weight: bold; 
    }

    .form-card__input { 
        width: 100%; 
        padding: 10px 18px; 
        border-radius: 10px; 
        border: 2px solid var(--blue); 
        margin-bottom: 20px; 
        font-family: "Itim"; 
        font-size: 1.1rem; 
    }

    .form-card__actions { 
        display: flex; 
        gap: 60px; 
        margin-top: 20px; 
        justify-content: center; 
    }

    .form-card__button { 
        padding: 10px 18px; 
        border-radius: 20px; 
        cursor: pointer; 
        border: none; 
        font-size: 19px; 
    }

    .form-card__button--primary { 
        background: var(--blue); 
        color: #fff; 
    }

    .form-card__input--autosize { 
        min-height: 120px; 
        resize: vertical; 
    }

    .categoria-seleccionadas { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 8px; 
        margin-top: 8px; 
    }

    .categoria-tag { 
        background-color: #ffd966; 
        color: #333; 
        padding: 5px 10px; 
        border-radius: 15px; 
        font-size: 0.9rem; 
        cursor: pointer; 
    }

    .categoria-tag:hover { 
        background-color: #f1c232; 
    }
</style>