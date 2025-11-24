<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'

const router = useRouter()
const textoBusqueda = ref('')

// 👉 store con info del usuario
const store = useMainStore()

// Función para buscar al pulsar Enter o clic en la lupa
const realizarBusqueda = () => {
  router.push({ path: '/', query: { search: textoBusqueda.value } })
}
</script>


<template>
  <header class="header">
    <input type="checkbox" id="toggle-filtros" class="header__toggle-filtros" />

    <div class="header__inner">
      <div class="header__left">
        <RouterLink to="/" class="header-icon-link">
          <img src="/logo.png" alt="Logo" class="header__logo" draggable="false" />
        </RouterLink>
      </div>

      <nav class="header__nav">
        <RouterLink v-if="store.isAdmin" to="/list" class="header__nav-item">
          RECETAS
        </RouterLink>
        
        <label for="toggle-filtros" class="header__nav-item header__nav-item--filtros">
          FILTROS
        </label>
        <RouterLink to="/contact" class="header__nav-item">CONTACTO</RouterLink>
        <RouterLink to="/about" class="header__nav-item">SOBRE MÍ</RouterLink>
      </nav>

      <div class="header__search">
        <img 
            src="/lupa.png" 
            alt="Buscar" 
            class="header__search-icon" 
            @click="realizarBusqueda"
            style="cursor: pointer;"
            draggable="false"
        />
        <input 
            type="text" 
            class="header__search-input" 
            placeholder="   Buscar..." 
            v-model="textoBusqueda"
            @keyup.enter="realizarBusqueda"
        />
      </div>

      <div class="header__right">
        <RouterLink to="/profile" class="header-icon-link" draggable="false">
          <img 
            src="/icono-perfil.png" 
            alt="Perfil" 
            class="header__profile-icon" 
            draggable="false" 
          />
        </RouterLink>
      </div>
    </div>

    <div class="dropdown-menu">
      <div class="dropdown-menu__inner">
        
        <div class="dropdown-menu__column">
          <h3 class="dropdown-menu__title">GENERAL</h3>
          <div class="dropdown-menu__links-wrapper">
             <RouterLink to="/" class="dropdown-menu__link"><strong>Ver Todas</strong></RouterLink>
            <RouterLink to="/list?filter=guardados" class="dropdown-menu__link">Guardados</RouterLink>
          </div>
        </div>
        
        <div class="dropdown-menu__column">
          <h3 class="dropdown-menu__title">SABORES</h3>
          <div class="dropdown-menu__links-wrapper">
            <RouterLink :to="{ path: '/', query: { category: 'Salado' }}" class="dropdown-menu__link">Salado</RouterLink>
            <RouterLink :to="{ path: '/', query: { category: 'Dulce' }}" class="dropdown-menu__link">Dulce</RouterLink>
          </div>
        </div>

        <div class="dropdown-menu__column">
          <h3 class="dropdown-menu__title">HORA DE LA COMIDA</h3>
          <div class="dropdown-menu__links-wrapper">
            <RouterLink :to="{ path: '/', query: { category: 'Desayuno' }}" class="dropdown-menu__link">Desayunos</RouterLink>
            <RouterLink :to="{ path: '/', query: { category: 'Comida' }}" class="dropdown-menu__link">Comidas</RouterLink>
            <RouterLink :to="{ path: '/', query: { category: 'Cena' }}" class="dropdown-menu__link">Cenas</RouterLink>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
  /* ======================================== */
  /* ESTILOS DEL HEADER                       */
  /* ======================================== */
  /* Contenedor principal del header */
  .header {
    width: 100%;
    padding: 8px;
    background: #d2694c;
    border: 1px solid #c9a66b;
    box-sizing: border-box; /* Asegura que el padding no afecte al ancho total */
  }

  /* Contenedor interno para alinear elementos (logo, nav, búsqueda) */
  .header__inner {
    display: flex;
    align-items: center; /* Centra verticalmente */
    justify-content: space-between; /* Distribuye espacio entre elementos */
    width: 100%;
    height: 118px; 
    padding: 0 16px;
    box-sizing: border-box;
  }

  .header__left {
    display: flex;
    align-items: center;
  }

  .header__logo {
    width: 77px;
    height: 77px;
  }

  /* Contenedor de la navegación principal */
  .header__nav {
    display: flex;
    gap: 40px; /* Espacio entre enlaces */
    margin-left: 0;
    white-space: nowrap; /* Evita que los enlaces salten de línea */
  }

  /* Estilo para cada enlace de navegación (Recetas, Filtros, etc.) */
  .header__nav-item {
    width: auto;
    height: 36px;
    color: #000000;
    font-family: "Itim", sans-serif;
    font-weight: 400;
    font-size: 26px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    padding: 5px 15px;
    border-radius: 999px; 
    transition: background-color 0.2s ease;
    line-height: 36px; 
    height: auto; 
  }

  /* Hover personalizado para los botones de navegación */
  .header__nav-item:hover {
    background-color: rgba(255, 255, 255, 0.2); 
  }

  /* Estilo específico para el label "FILTROS" */
  .header__nav-item--filtros {
    cursor: pointer;
  }

  /* Anular el hover verde de 'main.css' en el logo y perfil */
  /* :deep() nos permite aplicar estilos a componentes hijos (RouterLink) */
  :deep(.header-icon-link:hover) {
    background-color: transparent;
  }

  /* Barra de búsqueda */
  .header__search {
    display: flex;
    align-items: center;
    background: #c9a66b;
    border: 1px solid #000000;
    border-radius: 32px;
    padding: 0 12px;
    height: 40px;
    width: 400px;
  }

  .header__search-input {
    border: none;
    background: transparent;
    width: 100%;
    font-family: "Itim", sans-serif;
    font-size: 18px;
    margin-left: 8px;
  }

  .header__search-icon {
    width: 20px;
    height: 20px;
  }

  .header__right {
    display: flex;
    align-items: center;
  }

  .header__profile-icon {
    width: 57px;
    height: 57px;
  }

  /* El checkbox que controla el menú. Oculto. */
  .header__toggle-filtros {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }


  /* ======================================== */
  /* ESTILOS DEL MENÚ DESPLEGABLE             */
  /* ======================================== */

  /* El contenedor del menú, oculto por defecto */
  .dropdown-menu {
    width: 100%;
    background: #d2694c; 
    border-top: 1px solid #c9a66b; 
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  /* Contenedor interno que centra las 3 columnas */
  .dropdown-menu__inner {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    max-width: 1100px; 
    margin: 0 auto;
    padding: 24px 16px;
    gap: 20px;
    align-items: flex-start;
  }

  /* Estilo para cada una de las 3 columnas (Favoritos, Sabores...) */
  .dropdown-menu__column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  /* Títulos (FAVORITOS, SABORES...) */
  .dropdown-menu__title {
    font-family: "Itim", sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
  }

  /* Contenedor de los enlaces (Guardados, Salado, Dulce...) */
  .dropdown-menu__links-wrapper {
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    flex-wrap: nowrap;
    gap: 32px; 
  }

  /* Estilo para cada enlace del desplegable */
  .dropdown-menu__link {
    font-family: "Itim", sans-serif;
    font-size: 20px;
    color: #000000;
    text-decoration: none;
    opacity: 0.8;
    padding: 5px 15px;
    border-radius: 999px;
    transition: background-color 0.2s ease, opacity 0.2s;
  }

  /* Hover para los enlaces del desplegable */
  .dropdown-menu__link:hover {
    opacity: 1;
    text-decoration: none; 
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* Cuando el checkbox está ':checked', mostramos el menú */
  /* El (~) selecciona un "hermano" que venga después */
  .header__toggle-filtros:checked ~ .dropdown-menu {
    max-height: 500px; 
    opacity: 1;
    visibility: visible;
  }


  /* ======================================== */
  /* ESTILOS RESPONSIVE (PANTALLAS PEQUEÑAS)  */
  /* ======================================== */
  @media (max-width: 900px) {
    .header__inner {
      height: 118px; 
    }
    .header__nav {
      gap: 20px; 
    }
    .header__nav-item {
      font-size: 22px; 
    }
    .header__search {
      width: 250px; 
    }
  }

  @media (max-width: 768px) {
    .header {
      height: auto; 
      padding: 15px;
    }

    .header__inner {
      height: auto; 
      flex-wrap: wrap; 
      gap: 15px;
      justify-content: center; 
    }

    .header__nav {
      order: 3; 
      width: 100%;
      justify-content: center;
      flex-wrap: wrap; 
      gap: 15px;
      white-space: normal;
    }

    .header__search {
      order: 2; 
      width: 100%; 
      max-width: 400px; 
    }

    .header__left {
      order: 1; 
    }

    .header__right {
      order: 1; 
    }

    .header__left {
      flex-grow: 1; 
    }

    .header__right {
      flex-grow: 1;
      justify-content: flex-end; 
    }

    .header__logo {
      width: 60px;
      height: 60px;
    }

    .header__profile-icon {
      width: 50px;
      height: 50px;
    }

    .dropdown-menu__inner {
      flex-direction: column; 
      align-items: center;
      gap: 20px;
      padding: 20px 0;
    }

    .dropdown-menu__column {
      width: 100%;
      text-align: center;
    }

    .dropdown-menu__links-wrapper {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .header img {
      user-select: none;
      -webkit-user-drag: none;
  }
</style>