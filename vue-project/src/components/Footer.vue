<template>
  <footer class="site-footer">
    <!-- Contenedor principal que centra el contenido -->
    <div class="site-footer__inner">
      <!-- Sección Izquierda: Copyright -->
      <div class="site-footer__left">
        &copy; 2025 Recetarizada
      </div>

      <!-- Sección Central: Enlaces legales (Aviso, Privacidad...) -->
      <nav class="site-footer__center" aria-label="Enlaces legales">
        <!-- Usamos router-link para la navegación interna de Vue -->
        <router-link to="/legal">Aviso Legal</router-link>
        <router-link to="/privacidad">Política de Privacidad</router-link>
        <router-link to="/cookies">Política de Cookies</router-link>
      </nav>

      <!-- Sección Derecha: Iconos de Redes Sociales -->
      <div class="site-footer__right" aria-label="Redes sociales">
        <!-- Enlaces externos (<a>) con target="_blank" para abrir en pestaña nueva -->
        <a class="site-footer__social-link" href="https://www.youtube.com" target="_blank">
          <img class="site-footer__social-icon" src="/youtube.png" alt="YouTube" />
        </a>

        <a class="site-footer__social-link" href="https://www.instagram.com" target="_blank">
          <img class="site-footer__social-icon" src="/instagram.png" alt="Instagram" />
        </a>

        <a class="site-footer__social-link" href="https://www.tiktok.com" target="_blank">
          <img class="site-footer__social-icon" src="/tiktok.png" alt="TikTok" />
        </a>

        <a class="site-footer__social-link" href="https://www.twitter.com" target="_blank">
          <img class="site-footer__social-icon" src="/twitter.png" alt="Twitter" />
        </a>

        <a class="site-footer__social-link" href="https://www.pinterest.com" target="_blank">
          <img class="site-footer__social-icon" src="/pinterest.png" alt="Pinterest" />
        </a>

        <a class="site-footer__social-link" href="https://www.facebook.com" target="_blank">
          <img class="site-footer__social-icon" src="/facebook.png" alt="Facebook" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  /* 'scoped' significa que estos estilos SOLO se aplican a este componente */

  .site-footer {
    background: #d2694c;
    color: #000000;
    padding: 16px 0;
    /* Unificamos la fuente con el resto de la web */
    font-family: 'Itim', sans-serif; 
    font-size: 14px;
    /* 'margin-top: auto' es la clave para el "Sticky Footer". 
      Empuja el footer al fondo de la página. */
    margin-top: auto;
    width: 100%;
  }

  /* Contenedor flex principal del footer (Izquierda, Centro, Derecha) */
  .site-footer__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; /* Permite que pase a modo columna en móvil */
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .site-footer__left {
    text-align: left;
  }

  .site-footer__center {
    flex: 1; /* Ocupa el espacio central sobrante */
    text-align: center;
  }

  /* Estilos para los enlaces legales (Aviso, Privacidad...) */
  .site-footer__center a {
    margin: 0 12px;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    padding: 0; /* Anula el padding global verde de 'main.css' */
    transition: text-decoration 0.2s;
  }

  /* Hover para los enlaces legales */
  .site-footer__center a:hover,
  .site-footer__center a:focus {
    text-decoration: underline; /* Solo muestra el subrayado */
    background-color: transparent; /* Anula el fondo verde de 'main.css' */
  }

  .site-footer__right {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  /* Estilos para los enlaces <a> de iconos sociales */
  .site-footer__social-link {
    display: inline-block;
    width: 28px;
    height: 28px;
    padding: 0; /* Anula el padding global verde de 'main.css' */
    transition: transform 0.2s ease; /* Prepara para la animación de hover */
  }

  /* Hover para los iconos sociales */
  .site-footer__social-link:hover {
    background-color: transparent; /* Anula el fondo verde de 'main.css' */
    transform: scale(1.15); /* Efecto de zoom para dar feedback */
  }


  .site-footer__social-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* Estilos para pantallas de 600px o menos (móviles) */
  @media (max-width: 600px) {
    .site-footer__inner {
      flex-direction: column; /* Apila las secciones (Izquierda, Centro, Derecha) */
      align-items: center;
    }

    /* En móvil, todas las secciones ocupan el 100% y se centran */
    .site-footer__left,
    .site-footer__center,
    .site-footer__right {
      width: 100%;
      text-align: center;
      margin-top: 8px; /* Añade espacio entre secciones apiladas */
    }
  }
</style>