<template>
    <div class="main-container">
        <div class="about-section">
            <div class="about-section__text">
                <h1 class="about-section__title">Política de Privacidad</h1>

                <p class="about-section__paragraph">
                    En <strong>Recetarizada</strong> nos tomamos muy en serio la protección de tus datos personales.
                    La información que nos facilitas al registrarte o contactar se utiliza únicamente para gestionar tu cuenta
                    y mejorar tu experiencia de usuario.
                </p>

                <p class="about-section__paragraph">
                    Tus datos no se cederán a terceros salvo obligación legal o necesidad técnica para el funcionamiento del sitio.
                    Puedes solicitar en cualquier momento el acceso, rectificación o eliminación de tus datos escribiendo al
                    formulario de contacto.
                </p>

                <p class="about-section__paragraph">
                    Utilizamos cookies y tecnologías similares solo para mejorar el rendimiento y personalización de la web,
                    tal como se detalla en la
                    <RouterLink to="/cookies">Política de Cookies</RouterLink>.
                </p>

                <p class="about-section__paragraph">
                    Al continuar navegando en el sitio, aceptas nuestra política de privacidad y el tratamiento responsable de tus datos
                    conforme al Reglamento (UE) 2016/679 (RGPD).
                </p>
            </div>

            <div class="about-section__image">
                <img src="/privacidad.png" alt="Privacidad" class="about-section__img"/>
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

    .about-section__image {
    flex: 1;
    }

    .about-section__img {
    max-width: 250px;
    border-radius: 6%;
    object-fit: cover;
    }
</style>
