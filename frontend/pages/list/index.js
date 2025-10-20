// frontend/pages/list/index.js
import { listarRecetas, eliminarReceta } from "/frontend/services/recetasService.js";

// El contenedor donde se inyectarán las recetas (del HTML: <div class="recipes__list">)
const listContainer = document.querySelector(".recipes__list");
const filterSelect = document.querySelector(".recipes__filter");

async function renderList(filterValue = "") {
    try {
        const recetas = await listarRecetas(filterValue);
        
        // Si no hay recetas, mostramos un mensaje
        if (recetas.length === 0) {
            listContainer.innerHTML = "<p>Aún no hay recetas para mostrar.</p>";
            return;
        }

        // Generamos el HTML de las tarjetas y lo inyectamos
        listContainer.innerHTML = recetas.map(rec => cardListHTML(rec)).join("\n");
        
        // Aquí podrías llamar a attachListCardListeners() si haces clic
        // Pero por ahora, los enlaces <a> ya manejan la navegación.
        attachListCardListeners();

    } catch (err) {
        console.error("Error renderList:", err);
        listContainer.innerHTML = "<p>Error al cargar el listado de recetas.</p>";
    }
}

/**
 * Función para adjuntar el listener de cambio al filtro
 */
function attachFilterListener() {
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            // Llamamos a renderList con la nueva categoría
            renderList(selectedCategory);
        });
    }
}

/**
 * Genera el HTML para la tarjeta de receta en el listado.
 */

function cardListHTML(rec) {
    const shortDescription = escapeHtml(rec.descripcion).substring(0, 80) + '...';

    return `
    <div class="recipes__card" data-id="${rec.id}">
        <a href="#" class="recipe-detail-link"> 
            <img src="${rec.imagenUrl}" alt="${escapeHtml(rec.titulo)}" class="recipes__card-image">
        </a>
        
        <div class="recipes__card-info">
            <h3 class="recipes__card-title"><a href="#" class="recipe-detail-link">${escapeHtml(rec.titulo)}</a></h3>
            <p class="recipes__card-description">${shortDescription}</p>
        </div>
        
        <div class="recipes__card-actions">
            <!-- 🔹 Agregamos la clase btn-editar aquí -->
            <a href="#" class="recipes__card-button btn-editar">Editar</a>
            <button class="recipes__card-button btn-eliminar">Eliminar</button>
        </div>
    </div>`;
}

/**
 * Función para escapar caracteres HTML peligrosos.
 */
function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, s => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
}


function attachListCardListeners() {
    listContainer.addEventListener("click", async (e) => {
        const card = e.target.closest(".recipes__card");
        if (!card) return;

        // --- ELIMINAR ---
        if (e.target.closest('.btn-eliminar')) {
            e.preventDefault();
            const id = card.dataset.id;
            if (confirm("¿Eliminar esta receta?")) {
                await eliminarReceta(id);
                card.remove();
            }
            return;
        }

        // --- DETALLE ---
        if (e.target.closest('.recipe-detail-link')) {
            e.preventDefault();
            const id = card.dataset.id;
            localStorage.setItem("receta_id", id);
            window.location.href = "/frontend/pages/recipe-detail/index.html";
            return;
        }

        // --- EDITAR ---
        if (e.target.closest('.btn-editar')) {
            e.preventDefault();
            const id = card.dataset.id;
            localStorage.setItem("receta_id", id);
            window.location.href = "/frontend/pages/create-edit/index.html";
        }
    });
}


// Iniciamos el renderizado cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    renderList(); // Renderiza la lista inicial (sin filtro)
    attachFilterListener(); // Adjunta el listener del filtro
})