import { createReceta } from "/frontend/services/createReceta.js";

export function initCrearReceta() {
  const botonCrear = document.querySelector("#crearRecetaBtn");
  const imagenInput = document.querySelector("#imagenInput");
  const preview = document.querySelector("#previewImagen");
  const categoriaSelect = document.querySelector("#categoriaSelect");
  const contenedorCategorias = document.querySelector("#categoriaSeleccionadas");
  const categoriasSeleccionadas = [];

  // --- Vista previa imagen ---
  imagenInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) preview.src = URL.createObjectURL(file);
  });

  // --- Selección múltiple de categorías ---
  categoriaSelect.addEventListener("change", () => {
    const seleccion = categoriaSelect.value;
    if (seleccion && !categoriasSeleccionadas.includes(seleccion)) {
      categoriasSeleccionadas.push(seleccion);
      actualizarCategoriasUI();
    }
    categoriaSelect.value = "";
  });

  function actualizarCategoriasUI() {
    contenedorCategorias.innerHTML = "";
    categoriasSeleccionadas.forEach((cat, index) => {
      const tag = document.createElement("div");
      tag.classList.add("categoria-tag");
      tag.textContent = cat;
      tag.addEventListener("click", () => {
        categoriasSeleccionadas.splice(index, 1);
        actualizarCategoriasUI();
      });
      contenedorCategorias.appendChild(tag);
    });
  }

  // --- Botón Crear ---
  botonCrear.addEventListener("click", async (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#tituloInput").value;
    const descripcion = document.querySelector("#descripcionInput").value;
    const ingredientesTexto = document.querySelector("#ingredientesInput").value;
    const pasosTexto = document.querySelector("#pasosInput").value;
    const imagenFile = imagenInput.files[0];

    const ingredientes = ingredientesTexto.split("\n").filter((i) => i.trim() !== "");
    const pasos = pasosTexto.split("\n").filter((p) => p.trim() !== "");

    if (!titulo || !imagenFile || categoriasSeleccionadas.length === 0) {
      alert("Debes añadir el título, una imagen y, al menos, una categoría.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("ingredientes", JSON.stringify(ingredientes));
    formData.append("pasos", JSON.stringify(pasos));
    formData.append("categoria", JSON.stringify(categoriasSeleccionadas));
    formData.append("imagen", imagenFile);

    try {
      await createReceta(formData);
      alert("✅ Receta creada correctamente");
      window.location.href = "/frontend/pages/list/index.html";
    } catch (err) {
      alert("❌ Error creando receta: " + err.message);
    }
  });
}

// Si la página se carga directamente, lo inicializa automáticamente:
if (document.readyState !== "loading") {
  initCrearReceta();
} else {
  document.addEventListener("DOMContentLoaded", initCrearReceta);
}
