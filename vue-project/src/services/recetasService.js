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

// --- HOME & SOCIAL ---

export async function obtenerRecetasInicio() {
    try {
        // 1. Obtener recetas
        const records = await pb.collection("recetas").getFullList({
            sort: "-created",
        });

        // 2. Obtener likes del usuario actual (si está logueado)
        let misLikes = [];
        if (pb.authStore.isValid) {
            try {
                misLikes = await pb.collection("likes").getFullList({
                    filter: `usuario = "${pb.authStore.model.id}"`,
                });
            } catch (e) { /* Ignorar error si no hay likes */ }
        }

        // 3. Mapear datos para el Home
        return records.map(r => {
            const likeRecord = misLikes.find(l => l.receta === r.id);
            
            return {
                id: r.id,
                titulo: r.titulo,
                imagen: r.imagen ? pb.files.getURL(r, r.imagen) : '/receta-ramen.jpg',
                categoria: parseJSONField(r.categoria),
                comentarios: 0, 
                liked: !!likeRecord,
                likeId: likeRecord ? likeRecord.id : null
            };
        });

    } catch (err) {
        console.error("Error cargando inicio:", err);
        return [];
    }
}

export async function toggleLike(receta) {
    if (!pb.authStore.isValid) {
        alert("Debes iniciar sesión para dar like.");
        return null; 
    }

    try {
        // Si ya tiene like, lo borramos
        if (receta.liked && receta.likeId) {
            await pb.collection("likes").delete(receta.likeId);
            return { liked: false, likeId: null };
        } 
        // Si no tiene like, lo creamos
        else {
            const data = {
                usuario: pb.authStore.model.id,
                receta: receta.id
            };
            const record = await pb.collection("likes").create(data);
            return { liked: true, likeId: record.id };
        }
    } catch (err) {
        console.error("Error en toggleLike:", err);
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