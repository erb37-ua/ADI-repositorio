import { pb } from "./pb.js";

// --- LEER ---

// Devuelve la lista completa de recetas
export async function listarRecetas(filtroCategoria = "") {
    try {
        let options = {
            sort: "-created" // Recientes primero
        };

        if (filtroCategoria) {
            options.filter = `categoria ~ "${filtroCategoria}"`;
        }

        const records = await pb.collection("recetas").getFullList(options);

        // Mapear datos
        return records.map(r => ({
            id: r.id,
            titulo: r.titulo,
            descripcion: r.descripcion,
            // Genera la URL absoluta de la imagen
            imagenUrl: r.imagen ? pb.files.getURL(r, r.imagen) : null,
            ingredientes: parseJSONField(r.ingredientes),
            pasos: parseJSONField(r.pasos),
            categoria: parseJSONField(r.categoria),
            raw: r
        }));
    } catch (err) {
        console.error("Error en listarRecetas:", err);
        return [];
    }
}

// Obtener una sola receta por ID (Para editar)
export async function obtenerReceta(id) {
    try {
        const r = await pb.collection("recetas").getOne(id);
        return {
            id: r.id,
            titulo: r.titulo,
            descripcion: r.descripcion,
            imagenUrl: r.imagen ? pb.files.getURL(r, r.imagen) : null,
            ingredientes: parseJSONField(r.ingredientes),
            pasos: parseJSONField(r.pasos),
            categoria: parseJSONField(r.categoria),
            raw: r
        };
    } catch (err) {
        console.error("Error en obtenerReceta:", err);
        throw err;
    }
}

// --- ESCRIBIR ---

// Crear nueva receta
export async function createReceta(data) {
    try {
        return await pb.collection("recetas").create(data);
    } catch (error) {
        console.error("Error al crear receta:", error);
        throw error;
    }
}

// Actualizar receta existente
export async function actualizarReceta(id, data) {
    if (!id) throw new Error("ID no proporcionado para actualizar");
    try {
        return await pb.collection("recetas").update(id, data);
    } catch (err) {
        console.error(`Error actualizando receta ${id}:`, err);
        throw err;
    }
}

// Eliminar receta
export async function eliminarReceta(id) {
    if (!id) throw new Error("ID no proporcionado");
    try {
        await pb.collection("recetas").delete(id);
    } catch (err) {
        console.error(`Error borrando receta ${id}:`, err);
        throw err;
    }
}

// --- UTILIDADES ---

// Función auxiliar para manejar campos que pueden venir como JSON o texto
function parseJSONField(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
        return JSON.parse(value);
    } catch {
        if (typeof value === "string") {
            return value.split("\n").map(s => s.trim()).filter(Boolean);
        }
        return [];
    }
}