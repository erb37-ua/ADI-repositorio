<template>
    <div class="main-container">
        <div class="about-section">
            <div class="about-section__text">
                <h1 class="about-section__title">Aviso Legal</h1>

                <p class="about-section__paragraph">
                    En cumplimiento con la legislación vigente, se informa a los usuarios que el sitio web
                    <strong>Recetarizada</strong> es gestionado por una persona particular.
                    El acceso a esta web implica la aceptación de los términos y condiciones descritos en este aviso.
                </p>

                <p class="about-section__paragraph">
                    Todos los contenidos publicados —incluyendo textos, imágenes, recetas y código— son propiedad de Recetarizada
                    o se utilizan con autorización de sus autores.
                    Queda prohibida la reproducción total o parcial sin consentimiento previo por escrito.
                </p>

                <p class="about-section__paragraph">
                    Recetarizada no se hace responsable del uso indebido de la información ni de posibles daños derivados del
                    acceso o utilización de los contenidos del sitio web.
                </p>

                <p class="about-section__paragraph">
                    Para cualquier duda o comunicación relacionada con esta web, puedes contactar a través del formulario
                    de contacto disponible en la sección
                    <RouterLink to="/contact">Contacto</RouterLink>.
                </p>
            </div>

            <div class="about-section__image">
                <img src="/legal.png" alt="Aviso Legal" class="about-section__img"/>
            </div>
        </div>
    </div>
</template>

<style>
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
