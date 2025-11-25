import { pb } from "./pb.js";

// --- LEER ---

// Devuelve la lista completa de recetas
export async function listarRecetas(filtroCategoria = "") {
    try {
        let options = {
            sort: "-created"
        };

        if (filtroCategoria) {
            options.filter = `categoria ~ "${filtroCategoria}"`;
        }

        const records = await pb.collection("recetas").getFullList(options);

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

// Obtener una sola receta por ID
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

export async function createReceta(data) {
    try {
        return await pb.collection("recetas").create(data);
    } catch (error) {
        console.error("Error al crear receta:", error);
        throw error;
    }
}

export async function actualizarReceta(id, data) {
    if (!id) throw new Error("ID no proporcionado para actualizar");
    try {
        return await pb.collection("recetas").update(id, data);
    } catch (err) {
        console.error(`Error actualizando receta ${id}:`, err);
        throw err;
    }
}

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
        // 1. Obtener todas las recetas
        const records = await pb.collection("recetas").getFullList({
            sort: "-created",
        });

        // 2. Obtener TODOS los comentarios (solo necesitamos saber a qué receta pertenecen)
        // Pedimos solo el campo 'receta' para que la carga sea ligera
        let todosLosComentarios = [];
        try {
            todosLosComentarios = await pb.collection("comentarios").getFullList({
                fields: "receta", 
            });
        } catch (e) {
            console.log("No se pudieron cargar comentarios (o no hay):", e);
        }

        // 3. Obtener likes del usuario actual
        let misLikes = [];
        if (pb.authStore.isValid) {
            try {
                misLikes = await pb.collection("likes").getFullList({
                    filter: `usuario = "${pb.authStore.model.id}"`,
                });
            } catch (e) { }
        }

        // 4. Mapear datos combinando todo
        return records.map(r => {
            const likeRecord = misLikes.find(l => l.receta === r.id);
            
            // CONTAR COMENTARIOS: Filtramos la lista total buscando coincidencias
            const numComentarios = todosLosComentarios.filter(c => c.receta === r.id).length;
            
            return {
                id: r.id,
                titulo: r.titulo,
                imagen: r.imagen ? pb.files.getURL(r, r.imagen) : '/receta-ramen.jpg', 
                categoria: parseJSONField(r.categoria),
                
                // AQUÍ ASIGNAMOS EL VALOR REAL
                comentarios: numComentarios, 
                
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
        // CORRECCIÓN CLAVE: Solo miramos si tiene un ID de like.
        // Si Pinia ya puso liked=false, no importa, lo que importa es que EXISTE un registro que borrar.
        if (receta.likeId) {
            await pb.collection("likes").delete(receta.likeId);
            return { liked: false, likeId: null };
        } 
        // Si no tiene ID, creamos el like
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