// Ruta: /frontend/services/recetasService.js

import {pb}  from "./pb.js"; // Importa la instancia de pb

// Devuelve la lista completa de recetas (mapeadas)
export async function listarRecetas(filtroCategoria = "") {
    try {
        let options = {
            sort: "-created" // opcional: más recientes primero
        };

        if (filtroCategoria) {
            options.filter = `categoria ~ "${filtroCategoria}"`;
        }

        const records = await pb.collection("recetas").getFullList(options);

        // mapear y construir URL de imagen si existe
        return records.map(r => ({
            id: r.id,
            titulo: r.titulo,
            descripcion: r.descripcion,
            imagenUrl: r.imagen ? pb.files.getURL(r, r.imagen) : "/frontend/pages/imagenes/comida-placeholder.jpg",
            ingredientes: parseJSONField(r.ingredientes),
            pasos: parseJSONField(r.pasos),
            categoria: parseJSONField(r.categoria),
            raw: r // por si necesitas más
        }));
    } catch (err) {
        console.error("listarRecetas error:", err);
        throw err;
    }
}

export async function obtenerReceta(id) {
    try {
        const r = await pb.collection("recetas").getOne(id);
        return {
            id: r.id,
            titulo: r.titulo,
            descripcion: r.descripcion,
            imagenUrl: r.imagen ? pb.files.getURL(r, r.imagen) : "/frontend/pages/imagenes/comida-placeholder.jpg",
            ingredientes: parseJSONField(r.ingredientes),
            pasos: parseJSONField(r.pasos),
            categoria: parseJSONField(r.categoria),
            raw: r
        };
    } catch (err) {
        console.error("obtenerReceta error:", err);
        throw err;
    }
}

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

export async function eliminarReceta(id) {
    if (!id) {
        throw new Error("ID de receta no proporcionado para la eliminación.");
    }
    try {
        await pb.collection("recetas").delete(id);
    } catch (err) {
        console.error(`Error al intentar eliminar la receta con ID ${id}:`, err);
        throw err;
    }
}

export async function actualizarReceta(id, data) {
    if (!id) {
        throw new Error("ID de receta no proporcionado para la actualización.");
    }
    try {
        const recetaActualizada = await pb.collection("recetas").update(id, data);
        return recetaActualizada;
    } catch (err) {
        console.error(`Error al intentar actualizar la receta con ID ${id}:`, err);
        throw err;
    }
}

export async function createReceta(data) {
    try {
        const receta = await pb.collection("recetas").create(data);
        return receta;
    } catch (error) {
        console.error("Error al crear receta:", error);
        throw error;
    }
}