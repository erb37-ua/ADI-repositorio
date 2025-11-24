import { defineStore } from 'pinia'
import { listarRecetas,
    eliminarReceta as eliminarRecetaService,
    createReceta as createRecetaService,
    actualizarReceta as actualizarRecetaService,
    obtenerReceta,
    obtenerRecetasInicio,
    toggleLike as toggleLikeService,
} from '@/services/recetasService'

import {
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getCurrentUser,
    logoutUser,
} from '@/services/usuarioService'

export const useMainStore = defineStore('main', {
    state: () => ({
        // ==== USUARIO ====
        user: getCurrentUser(), 
        authLoading: false,
        authError: null,

        // ==== RECETAS ====
        recipes: [],
        recipesLoading: false,
        recipesError: null,

        // ==== HOME (recetas + likes) ====
        homeRecipes: [],
        homeLoading: false,
        homeError: null,
    }),

    getters: {
        isLogged: (state) => !!state.user,
        isAdmin: (state) =>
            !!state.user && state.user.email === 'fmpp3@alu.ua.es',
    },

    actions: {

        // ==== USUARIO ====
        // LOGIN
        async login(email, password) {
            this.authLoading = true
            this.authError = null
            try {
                await loginUser(email, password)
                this.user = getCurrentUser()
            } catch (error) {
                this.user = null
                this.authError = error?.message || 'Error al hacer login'
                throw error
            } finally {
                this.authLoading = false
            }
        },

        // REGISTRO
        async register({ name, email, password }) {
            this.authLoading = true
            this.authError = null
            try {
                await registerUser({ name, email, password })
                await loginUser(email, password)
                this.user = getCurrentUser()
            } catch (error) {
                this.user = null
                this.authError = error?.message || 'Error registrando usuario'
                throw error
            } finally {
                this.authLoading = false
            }
        },

        // LOGOUT
        logout() {
            logoutUser()
            this.user = null
        },

        // ACTUALIZAR USUARIO
        async updateProfile({ name, email, password, passwordConfirm, oldPassword }) {
            if (!this.user) throw new Error('No hay usuario autenticado')

            const data = { name, email }
            const changingPassword = !!password

            if (changingPassword) {
                data.oldPassword = oldPassword
                data.password = password
                data.passwordConfirm = passwordConfirm ?? password
            }

            // Actualizar usuario en PocketBase
            const updated = await updateUser(this.user.id, data)

            // Si hemos cambiado la contraseña, re-autenticamos con la nueva
            if (changingPassword) {
                await loginUser(email, password)        // <- vuelve a hacer login
                this.user = getCurrentUser()            // <- usuario fresco desde authStore
            } else {
                this.user = updated                     // <- solo datos básicos
            }

            return updated
            },


        // BORRAR USUARIO
        async deleteAccount() {
            if (!this.user) throw new Error('No hay usuario autenticado')
            await deleteUser(this.user.id)
            this.logout()
        },

        // ==== RECETAS ====
        // CARGAR RECETAS
        async loadRecipes(filtroCategoria = '') {
            this.recipesLoading = true
            this.recipesError = null
            try {
                const data = await listarRecetas(filtroCategoria)
                this.recipes = data.map((r) => ({
                id: r.id,
                title: r.titulo,
                description: r.descripcion,
                category: r.categoria || [],
                image: r.imagenUrl,
                }))
            } catch (error) {
                console.error('Error cargando recetas:', error)
                this.recipesError = error?.message || 'Error cargando recetas'
                throw error
            } finally {
                this.recipesLoading = false
            }
        },

        // OBTENER RECETA
        async fetchRecipeById(id) {
            // Devuelve la receta con { id, titulo, descripcion, imagenUrl, ingredientes, pasos, categoria, raw }
            return await obtenerReceta(id)
        },

        // BORRAR LA RECETA
        async deleteRecipe(id) {
            await eliminarRecetaService(id)
            this.recipes = this.recipes.filter((r) => r.id !== id)
        },

        // CREAR RECETA
        async createRecipe(data) {
            const created = await createRecetaService(data)
            await this.loadRecipes()
            return created
        },

        //MODIFICAR RECETA
        async updateRecipe(id, data) {
            const updated = await actualizarRecetaService(id, data)
            this.recipes = this.recipes.map((r) =>
                r.id === id ? { ...r, ...data } : r
            )
            return updated
        },

        // ==== HOME (recetas + likes) ====
        async loadHomeRecipes() {
            this.homeLoading = true
            this.homeError = null
            try {
                const data = await obtenerRecetasInicio()
                // data ya viene con: id, titulo, imagen, categoria, comentarios, liked, likeId
                this.homeRecipes = data
            } catch (error) {
                console.error('Error cargando recetas de inicio:', error)
                this.homeError = error?.message || 'Error cargando recetas de inicio'
                throw error
            } finally {
                this.homeLoading = false
            }
        },

        async toggleLikeReceta(recetaId) {
            // buscamos la receta en el estado
            const receta = this.homeRecipes.find((r) => r.id === recetaId)
            if (!receta) return

            const originalLiked = receta.liked
            const originalLikeId = receta.likeId

            // optimista: cambiamos en local
            receta.liked = !receta.liked

            try {
                const resultado = await toggleLikeService({
                id: receta.id,
                liked: receta.liked,
                likeId: receta.likeId,
                })

                if (resultado) {
                receta.liked = resultado.liked
                receta.likeId = resultado.likeId
                } else {
                // si el servicio devolviese null, revertimos
                receta.liked = originalLiked
                receta.likeId = originalLikeId
                }
            } catch (error) {
                // en error, revertimos cambios
                receta.liked = originalLiked
                receta.likeId = originalLikeId
                throw error
            }
        },
    },
})
