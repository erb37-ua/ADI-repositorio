# 🍳 **Recetarizada**

## 🎯 Objetivo del proyecto

Esta aplicación es un recetario online pensado como “mi rincón culinario” en formato web.  
El objetivo no es solo practicar con Vue y Pinia, sino tener un sitio donde:

- Reunir y organizar **recetas propias**, muchas de ellas inspiradas en platos de otros países (especialmente Asia y Latinoamérica).
- Permitir que cualquier persona pueda **explorar las recetas**, ver ingredientes y pasos de preparación de forma clara y cómoda.
- Dar la opción a los usuarios registrados de **interactuar con las recetas**: dejar comentarios, valorar qué tal les ha salido la receta y marcar sus favoritas con un like.
- Ofrecer a la persona administradora una forma sencilla de **añadir, editar y gestionar recetas** sin tocar código, solo desde la propia web.

---

## 💡 ¿Qué permite hacer la aplicación?

Como usuario anónimo:

- Ver el **listado de recetas** en la página de inicio.
- Buscar recetas por **texto** (barra de búsqueda).
- Filtrar recetas por **categoría** (Desayuno, Comida, Cena, Salado, Dulce).
- Acceder al **detalle de una receta** y ver sus:
  - Ingredientes estructurados por secciones.
  - Pasos de preparación formateados.

Como usuario registrado:

- **Registrarse** e **iniciar sesión**.
- Dar y quitar **like** a recetas.
- Dejar **comentarios** en las recetas:
  - Escribir un comentario.
  - Asignar una valoración (estrellas).
  - Ver los comentarios de otros usuarios.

Como administrador (usuario con email configurado como admin):

- Acceder a la **vista de gestión de recetas**.
- **Crear** nuevas recetas.
- **Editar** recetas existentes.
- **Eliminar** recetas.
- Subir imagen de la receta y gestionar:
  - Ingredientes (JSON estructurado por secciones).
  - Pasos de preparación.
  - Categorías de la receta.

---

## 🧱 Arquitectura y tecnologías

- **Frontend**: Vue 3 (Composition API, `<script setup>`).
- **Gestor de estado**: Pinia (`useMainStore`).
- **Enrutado**: Vue Router.
- **Backend / BBDD**: PocketBase (colecciones: `usuarios`, `recetas`, `likes`, `comentarios`).
- **Estilos**: CSS propio + fuentes personalizadas + algunos iconos (Font Awesome / imágenes locales).

---

## 🧬 Estado global con Pinia

Todo el estado importante se centraliza en un único store (`useMainStore`):

- **Autenticación**
  - `user`, `authLoading`, `authError`
  - Acciones: `login`, `register`, `logout`, `updateProfile`, `deleteAccount`
- **Recetas**
  - `recipes`, `recipesLoading`, `recipesError`
  - `homeRecipes` (recetas de portada con likes del usuario)
  - Acciones: `loadRecipes`, `fetchRecipeById`, `createRecipe`, `updateRecipe`, `deleteRecipe`, `loadHomeRecipes`, `toggleLikeReceta`
- **Comentarios**
  - `myComments`, `myCommentsLoading`, `myCommentsError`
  - `recipeComments`, `recipeCommentsLoading`, `recipeCommentsError`
  - Acciones: `loadMyComments`, `updateMyComment`, `deleteMyComment`, `loadCommentsForRecipe`, `createCommentForRecipe`

---

## ✅ Requisitos adicionales

1. Uso de Vue Router para gestionar la navegación. (0.5 puntos)

2. Búsqueda y paginación de datos  (0.5 puntos)

3. Listado de otro recurso (Comentarios) con ver detalles / editar / eliminar (hasta 0.5 puntos)
4. Introducir transiciones propias de Vue (hasta 0.5 puntos): 

- Botón que tiembla al introducir datos incorrectos.
- Resalto en rojo del campo con datos incorrectos.
- Transiciones/animaciones cuando aparecen y desaparecen elementos de la página (menú de filtros y menú de usuario en el header).


---

## ⚙️ Ejecución del projecto

```bash
# Instalar dependencias
npm install

# Ejecución del frontend
cd ADI-repositorio/vue-project
npm run dev


# Ejecución del backend
cd ADI-repositorio/pocketbase
pocketbase.exe serve
```

## 👤 Usuario administrador

El usuario administrador, tanto de la **base de datos** como de la **aplicación**, es:

- Usuario: `fmpp3@alu.ua.es`
    
- Contraseña: `pocketbase`
