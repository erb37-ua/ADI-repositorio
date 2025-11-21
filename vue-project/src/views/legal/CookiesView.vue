<template>
    <div class="main-container">
        <div class="about-section">
            <div class="about-section__text">
                <h1 class="about-section__title">Política de Cookies</h1>

                <p class="about-section__paragraph">
                    Este sitio web utiliza cookies propias y de terceros con el objetivo de ofrecer una mejor experiencia de navegación,
                    optimizar el rendimiento del sitio y analizar la interacción de los usuarios con los contenidos.
                </p>

                <p class="about-section__paragraph">
                    Las cookies son pequeños archivos de texto que el navegador almacena en tu dispositivo. Puedes configurar o rechazar su uso
                    desde las preferencias de tu navegador en cualquier momento.
                </p>

                <p class="about-section__paragraph">
                    Tipos de cookies que utilizamos:
                </p>

                <ul class="about-section__list">
                    <li>
                        <strong>Cookies técnicas:</strong>
                        necesarias para el correcto funcionamiento del sitio.
                    </li>

                    <li>
                        <strong>Cookies de análisis:</strong>
                        nos ayudan a mejorar el contenido mediante estadísticas anónimas.
                    </li>

                    <li>
                        <strong>Cookies de preferencias:</strong>
                        guardan tus elecciones (como idioma o tema visual).
                    </li>
                </ul>

                <p class="about-section__paragraph">
                    Al continuar navegando en Recetarizada, aceptas el uso de cookies conforme a esta política.
                    Puedes obtener más información o revocar tu consentimiento en cualquier momento desde tu navegador.
                </p>
            </div>
            <div class="about-section__image">
                <img src="/cookies.png" alt="Cookies" class="about-section__img"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Contenido principal tipo "about" */
    .main-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 20px 120px;
    }

    .about-section {
        display: flex;
        align-items: flex-start;
        gap: 150px;
    }

    .about-section__text {
        flex: 2;
        text-align: justify;
    }

    .about-section__title {
        font-size: 32px;
        margin-bottom: 20px;
    }

    .about-section__paragraph {
        margin-bottom: 15px;
    }

    .about-section__list {
        margin-left: 1.4rem;
        margin-bottom: 15px;
    }

    .about-section__image {
        flex: 1;
    }

    .about-section__img {
        max-width: 250px;
        border-radius: 6%;
        object-fit: cover;
    }
</style>
