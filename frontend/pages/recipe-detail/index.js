import { obtenerReceta } from "/frontend/services/recetasService.js";

function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]));
}

async function renderDetail() {
  let id = getQueryParam("id");
  if (!id) id = localStorage.getItem("receta_id");

  if (!id) {
    document.querySelector("main").innerHTML = "<p>Receta no encontrada (id faltante).</p>";
    return;
  }

  try {
    const r = await obtenerReceta(id);
    document.title = r.titulo || "Receta";

    // --- Título, imagen y descripción ---
    document.querySelector(".recipe-detail__title").textContent = r.titulo || "";
    document.querySelector(".recipe-detail__image").src = r.imagenUrl || "";
    document.querySelector(".recipe-detail__description").textContent = r.descripcion || "";

    // --- Ingredientes con secciones ---
    const ingContainer = document.querySelector(".recipe-detail__ingredients");
    if (ingContainer) ingContainer.innerHTML = renderIngredientsHtml(r.ingredientes);

    // --- Pasos ---
    const pasosContainer = document.querySelector(".recipe-detail__steps");
    if (pasosContainer) pasosContainer.innerHTML = renderStepsHtml(r.pasos);

    localStorage.removeItem("receta_id");
  } catch (err) {
    console.error("renderDetail error:", err);
    document.querySelector("main").innerHTML = "<p>Error cargando la receta.</p>";
  }
}

function renderIngredientsHtml(ings) {
  if (!ings || ings.length === 0) return "<p>No hay ingredientes.</p>";

  // Si vienen en texto plano, parseamos
  try {
    if (typeof ings === "string") ings = JSON.parse(ings);
  } catch {}

  // Si son objetos con secciones (lo que hace tu create-edit)
  if (Array.isArray(ings) && ings[0]?.section && ings[0]?.items) {
    return ings
      .map(sectionObj => {
        const sectionName = escapeHtml(sectionObj.section);
        const itemsList = sectionObj.items
          .map(i => `<li>${escapeHtml(i.amount)} ${escapeHtml(i.name)}</li>`)
          .join("");
        return `
          <h4 class="recipe-detail__section">${sectionName}</h4>
          <ul class="recipe-detail__list">${itemsList}</ul>
        `;
      })
      .join("");
  }

  // Si no hay secciones (array plano)
  const items = ings.map(i => {
    if (typeof i === "object") return escapeHtml(Object.values(i).join(" "));
    return escapeHtml(i);
  });

  return "<ul class='recipe-detail__list'>" + items.map(i => `<li>${i}</li>`).join("") + "</ul>";
}

function renderStepsHtml(pasos) {
  if (!pasos || pasos.length === 0) return "<p>No hay pasos.</p>";

  try {
    if (typeof pasos === "string") pasos = JSON.parse(pasos);
  } catch {}

  const items = pasos.map(p => {
    if (typeof p === "object") {
      let instr = p.instruction || "";

      // reemplaza **texto** por <strong>texto</strong>
      instr = instr.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      return `<li>${instr}</li>`; // ya no usamos escapeHtml aquí
    }
    return `<li>${escapeHtml(p)}</li>`;
  });

  return "<ol class='recipe-detail__steps'>" + items.join("") + "</ol>";
}


document.addEventListener("DOMContentLoaded", renderDetail);