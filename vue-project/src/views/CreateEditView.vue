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
    <div>
        <!-- Header -->
        <header class="header">
        <div class="header__inner">
            <div class="header__left">
            <RouterLink to="/"><img src="/logo.png" alt="Logo" class="header__logo" /></RouterLink>
            </div>
            <nav class="header__nav">
            <RouterLink to="/list" class="header__nav-item">RECETAS</RouterLink>
            <input type="checkbox" id="toggle-filtros" class="header__toggle-filtros" />
            <label for="toggle-filtros" class="header__nav-item header__nav-item--filtros">FILTROS</label>
            <RouterLink to="/contact" class="header__nav-item">CONTACTO</RouterLink>
            <RouterLink to="/about" class="header__nav-item">SOBRE MÍ</RouterLink>
            </nav>
            <div class="header__search">
            <img src="/lupa.png" alt="Buscar" class="header__search-icon" />
            <input type="text" class="header__search-input" placeholder="   Buscar..." />
            </div>
            <div class="header__right">
            <span><img src="/icono-perfil.png" alt="Perfil" class="header__profile-icon" /></span>
            </div>
        </div>
        </header>

        <!-- Main -->
        <main class="container">
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
        </main>

        <!-- Footer -->
        <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__left">&copy; 2025 Recetarizada</div>
            <nav class="site-footer__center" aria-label="Enlaces legales">
            <RouterLink to="/legal/aviso-legal">Aviso Legal</RouterLink>
            <RouterLink to="/legal/politica-privacidad">Política de Privacidad</RouterLink>
            <RouterLink to="/legal/politica-cookies">Política de Cookies</RouterLink>
            </nav>
            <div class="site-footer__right" aria-label="Redes sociales">
            <a class="site-footer__social-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img class="site-footer__social-icon" src="/youtube.png" alt="YouTube" /></a>
            <a class="site-footer__social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img class="site-footer__social-icon" src="/instagram.png" alt="Instagram" /></a>
            <a class="site-footer__social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img class="site-footer__social-icon" src="/tiktok.png" alt="TikTok" /></a>
            <a class="site-footer__social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img class="site-footer__social-icon" src="/twitter.png" alt="Twitter" /></a>
            <a class="site-footer__social-link" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><img class="site-footer__social-icon" src="/pinterest.png" alt="Pinterest" /></a>
            <a class="site-footer__social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img class="site-footer__social-icon" src="/facebook.png" alt="Facebook" /></a>
            </div>
        </div>
        </footer>
    </div>
</template>

<style>
:root {
    --accent: #c65a48;
    --blue: #2b5b5b;
    --bg: #fbf8f6;
    --card: #fff;
    --radius: 20px;
    --pad: 24px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body { background: var(--bg); color: #111; line-height: 1.5; padding-top: 72px; font-family: "Itim", cursive; }

main { flex: 1; }

/* ==================== Header ==================== */
html, body { margin: 0; padding: 0; }

.header { width: 100%; height: 134px; padding: 8px; background: #d2694c; border: 1px solid #c9a66b; box-sizing: border-box; }

.header__inner { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding: 0 16px; box-sizing: border-box; }

.header__left { display: flex; align-items: center; }

.header__logo { width: 77px; height: 77px; }

.header__nav { display: flex; gap: 40px; margin-left: 0; white-space: nowrap; }

.header__nav-item { width: auto; height: 36px; color: #000000; font-family: "Itim"; font-weight: 400; font-size: 26px; text-align: left; text-decoration: none; }

.header__nav-item--filtros { cursor: pointer; width: 98px; }

.header__search { display: flex; align-items: center; background: #c9a66b; border: 1px solid #000000; border-radius: 32px; padding: 0 12px; height: 40px; width: 400px; }

.header__search-input { border: none; background: transparent; width: 100%; font-family: "Itim"; font-size: 18px; margin-left: 8px; }

.header__search-icon { width: 20px; height: 20px; }

.header__right { display: flex; align-items: center; }

.header__profile-icon { width: 57px; height: 57px; }

/* Dropdown global */
.header__toggle-filtros { position: absolute; left: -9999px; }

/* ==================== Footer ==================== */
.site-footer { background: #d2694c; color: #000000; padding: 16px 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 14px; margin-top: auto; width: 100%; }

.site-footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; width: 100%; padding: 0 24px; box-sizing: border-box; }

.site-footer__left { text-align: left; }

.site-footer__center { flex: 1; text-align: center; }

.site-footer__center a { margin: 0 12px; color: inherit; text-decoration: none; white-space: nowrap; }

.site-footer__center a:hover, .site-footer__center a:focus { text-decoration: underline; }

.site-footer__right { display: flex; gap: 10px; align-items: center; }

.site-footer__social-link { display: inline-block; width: 28px; height: 28px; }

.site-footer__social-icon { width: 100%; height: 100%; object-fit: contain; display: block; }

/* ==================== Footer Responsive ==================== */
@media (max-width: 600px) {
    .site-footer__inner { flex-direction: column; align-items: center; }
    .site-footer__left, .site-footer__center, .site-footer__right { width: 100%; text-align: center; margin-top: 8px; }
}

/* Contenedor */
.container { max-width: 1000px; margin: 0 auto; padding: 40px 20px 120px; display: flex; justify-content: center; align-items: center; }

/* Form card */
.form-card { background: var(--card); border-radius: var(--radius); padding: var(--pad); border: 2px solid var(--blue); max-width: 1000px; width: 100%; text-align: center; }

.form-card__title { margin-bottom: 28px; }

.form-card__body { display: flex; gap: 40px; align-items: flex-start; justify-content: center; }

.form-card__image { text-align: center; display: flex; flex-direction: column; align-items: center; }

.form-card__image img { width: 280px; height: 280px; object-fit: cover; border-radius: 20px; margin-top: 0; margin-bottom: 10px; border: 1px solid #ccc; }

.form-card__content { flex: 1; text-align: left; }

.form-card__label { display: block; margin-bottom: 6px; font-weight: bold; }

.form-card__input { width: 100%; padding: 10px 18px; border-radius: 10px; border: 2px solid var(--blue); margin-bottom: 20px; font-family: "Itim"; font-size: 1.1rem; }

.form-card__actions { display: flex; gap: 60px; margin-top: 20px; justify-content: center; }

.form-card__button { padding: 10px 18px; border-radius: 20px; cursor: pointer; border: none; font-size: 19px; }

.form-card__button--primary { background: var(--blue); color: #fff; }

.form-card__input--autosize { min-height: 120px; resize: vertical; }

.categoria-seleccionadas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }

.categoria-tag { background-color: #ffd966; color: #333; padding: 5px 10px; border-radius: 15px; font-size: 0.9rem; cursor: pointer; }

.categoria-tag:hover { background-color: #f1c232; }
</style>
