import { pb } from './pb.js'

export async function listarComentariosUsuario(userId) {
    try {
        const records = await pb.collection('comentarios').getFullList({
        sort: '-created',
        filter: `usuario = "${userId}"`,
        expand: 'receta',
        })

        return records.map((r) => ({
        id: r.id,
        // Campos reales de PB: comentario, valoracion
        texto: r.comentario ?? '',
        rating: r.valoracion ?? null,
        created: r.created,
        updated: r.updated,
        receta: r.expand?.receta
            ? {
                id: r.expand.receta.id,
                titulo: r.expand.receta.titulo,
                imagenUrl: r.expand.receta.imagen
                ? pb.files.getURL(r.expand.receta, r.expand.receta.imagen)
                : null,
            }
            : null,
        }))
    } catch (err) {
        console.error('Error en listarComentariosUsuario:', err)
        throw err
    }
}

// LISTAR COMENTARIOS DE UNA RECETA
export async function listarComentariosPorReceta(recetaId) {
    try {
        const records = await pb.collection('comentarios').getFullList({
        sort: '-created',
        filter: `receta = "${recetaId}"`,
        expand: 'usuario',
        })

        return records.map((r) => ({
        id: r.id,
        texto: r.comentario ?? '',
        rating: r.valoracion ?? null,
        created: r.created,
        usuario: r.expand?.usuario
            ? {
                id: r.expand.usuario.id,
                nombre:
                r.expand.usuario.name ||
                r.expand.usuario.username ||
                r.expand.usuario.email,
                email: r.expand.usuario.email,
            }
            : null,
        }))
    } catch (err) {
        console.error('Error en listarComentariosPorReceta:', err)
        throw err
    }
}

// CREAR COMENTARIO
export async function crearComentario({ recetaId, userId, texto, rating }) {
    const payload = {
        comentario: texto,
        valoracion: rating,
        receta: recetaId,
        usuario: userId,
    }

    try {
        return await pb.collection('comentarios').create(payload)
    } catch (err) {
        console.error('Error creando comentario:', err)
        if (err?.data) console.error('Detalles PocketBase:', err.data)
        throw err
    }
}

// ACTUALIZAR COMENTARIO
export async function actualizarComentario(id, texto, rating) {
    if (!id) throw new Error('ID de comentario no proporcionado')

    const payload = {
        comentario: texto,       // campo real en PB
    }

    if (rating !== null && rating !== undefined) {
        payload.valoracion = rating  // campo real en PB
    }

    try {
        console.log('[actualizarComentario] payload que se envía a PB:', payload)
        return await pb.collection('comentarios').update(id, payload)
    } catch (err) {
        console.error(`Error actualizando comentario ${id}:`, err)
        if (err?.data) console.error('Detalles PocketBase:', err.data)
        throw err
    }
}

// ELIMINAR COMENTARIO
export async function eliminarComentario(id) {
    if (!id) throw new Error('ID de comentario no proporcionado')
    try {
        await pb.collection('comentarios').delete(id)
    } catch (err) {
        console.error(`Error eliminando comentario ${id}:`, err)
        throw err
    }
}
