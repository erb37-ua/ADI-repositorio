import  {listarRecetas}  from "/frontend/services/recetasService.js"; // usa ruta absoluta o relativa según tu proyecto

const grid = document.getElementById("gridRecetas");

async function renderHome() {
  try {
    const recetas = await listarRecetas();
    grid.innerHTML = recetas.map(rec => tarjetaHTML(rec)).join("\n");
    attachCardListeners();
  } catch (err) {
    console.error("Error renderHome:", err);
    grid.innerHTML = "<p>Error cargando recetas.</p>";
  }
}

function tarjetaHTML(rec) {
  // Asegúrate de que el id está siendo inyectado correctamente
  // El ID debe ser una propiedad válida de cada objeto 'rec'
  return `
  <article class="card" data-id="${rec.id}">
    <a href="/frontend/pages/recipe-detail/index.html?id=${rec.id}"> 
      <img src="${rec.imagenUrl}" alt="${escapeHtml(rec.titulo)}" class="card__image">
    </a>
    <div class="card__title-row">
      <a href="/frontend/pages/recipe-detail/index.html?id=${rec.id}" class="card__link">
        <h4 class="card__title">${escapeHtml(rec.titulo)}</h4>
      </a>
          </div>
    <p class="card__comments">—</p>
  </article>`;
}

function attachCardListeners() {
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    card.addEventListener("click", () => {
      // Guardamos el ID de la receta antes de ir a la página de detalle
      localStorage.setItem("receta_id", id);
      window.location.href = "/frontend/pages/recipe-detail/index.html";
    });
  });
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]));
}

document.addEventListener("DOMContentLoaded", renderHome);