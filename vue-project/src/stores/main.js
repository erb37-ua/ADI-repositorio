import { defineStore } from 'pinia'
import { listarRecetas,
    eliminarReceta as eliminarRecetaService,
    createReceta as createRecetaService,
    actualizarReceta as actualizarRecetaService,
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
        // USUARIO
        user: getCurrentUser(), 
        authLoading: false,
        authError: null,

        // RECETAS
        recipes: [],
        recipesLoading: false,
        recipesError: null,
    }),

    getters: {
        isLogged: (state) => !!state.user,
    },

    actions: {

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

        // ============ RECETAS ============

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

        async deleteRecipe(id) {
        await eliminarRecetaService(id)
        this.recipes = this.recipes.filter((r) => r.id !== id)
        },

        async createRecipe(data) {
        const created = await createRecetaService(data)
        await this.loadRecipes()
        return created
        },

        async updateRecipe(id, data) {
        const updated = await actualizarRecetaService(id, data)
        this.recipes = this.recipes.map((r) =>
            r.id === id ? { ...r, ...data } : r
        )
        return updated
        },
    },
})
