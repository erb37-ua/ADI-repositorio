<template>
  <!-- Contenedor principal para la sección "Sobre mí" -->
  <div class="about-section">
    
    <!-- Columna de texto -->
    <div class="about-section__text">
      <h1 class="about-section__title">Sobre mí</h1>
      <p class="about-section__paragraph">
        ¡Hola! Soy estudiante de 4º de carrera de ingeniería informática y,
        aunque paso muchas horas entre apuntes y trabajos, uno de mis mayores
        hobbies es cocinar. Y para que sepáis un poco más de mí, aunque es
        bastante obvio por el nombre, os dejo una imagen por aquí.
      </p>

      <p class="about-section__paragraph">
        Ahora estoy poco a poco implementado recetas de otros países, sobre
        todo de Asia y Latinoamérica, ¡mirad en la página y probad, están
        buenísimas!
      </p>

      <p class="about-section__paragraph">
        Aquí encontrarás recetas sencillas, todas hechas por mí. Espero que
        te sirvan para inspirarte, aprender algo nuevo o simplemente
        disfrutar de la cocina tanto como yo.
      </p>

      <p class="about-section__paragraph">
        Bienvenido/a a mi rincón culinario, ¡ojalá lo disfrutes tanto como
        yo al crearlo! 🌿✨
      </p>
    </div>

    <!-- Columna de imagen -->
    <div class="about-section__image">
      <img
        src="/yo.jpeg"
        alt="Foto sobre mí"
        class="about-section__img"
      />
    </div>
  </div>
</template>

<style scoped>
  /* 'scoped' asegura que estos estilos solo afecten a este componente */

  /* Contenedor principal de esta vista (página) */
  .about-section {
    /* Define el ancho máximo del contenido de esta página */
    max-width: 1100px;
    /* Centra el contenido horizontalmente en el <main> */
    margin: 0 auto;
    /* Espaciado interno (arriba, lados, abajo) */
    padding: 40px 20px 140px;
    
    /* --- Layout de 2 Columnas (Texto | Imagen) --- */
    display: flex;
    /* Alinea las columnas en la parte superior */
    align-items: flex-start;
    /* Espacio entre las dos columnas */
    gap: 150px;
  }

  /* Columna de texto */
  .about-section__text {
    /* Hace que la columna de texto sea el doble de ancha que la de imagen */
    flex: 2;
    /* Justifica el texto para un look de "libro" */
    text-align: justify;
  }

  .about-section__title {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .about-section__paragraph {
    margin-bottom: 15px; /* Espacio entre párrafos */
  }

  /* Columna de imagen */
  .about-section__image {
    /* Ocupa 1 parte del espacio (complementa el flex: 2) */
    flex: 1;
  }

  /* Estilos de la imagen */
  .about-section__img {
    max-width: 250px; /* Ancho máximo de la foto */
    border-radius: 6%; /* Bordes redondeados */
    object-fit: cover; /* Asegura que la imagen cubra el espacio sin deformarse */
  }
</style>