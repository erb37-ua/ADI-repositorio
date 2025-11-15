<template>
    <div class="contact">
        <h1 class="contact__title">Contacto</h1>
        <p class="contact__intro">
            <br />
            ¡Gracias por visitar <strong>Recetarizada</strong>!
        </p>
        <p class="contact__info">
            Si quieres escribirme con dudas o sugerencias, puedes hacerlo a través de mi correo o en mis redes sociales.
            También puedes escribir comentarios en las propias recetas de la página, ¡adelante!
        </p>
        <p class="contact__email">
            <br />
            📧
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=erb37@gcloud.ua.es"
                target="_blank"
                rel="noopener noreferrer"
            >
                erb37@gcloud.ua.es
            </a>
        </p>

        <!-- Redes sociales -->
        <div class="contact__socials" aria-label="Redes sociales">
            <a class="contact__social-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <img class="contact__social-icon" src="/youtube.png" alt="YouTube"/>
            </a>

            <a class="contact__social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img class="contact__social-icon" src="/instagram.png" alt="Instagram"/>
            </a>

            <a class="contact__social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <img class="contact__social-icon" src="/tiktok.png" alt="TikTok"/>
            </a>

            <a class="contact__social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img class="contact__social-icon" src="/twitter.png" alt="Twitter"/>
            </a>

            <a class="contact__social-link" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <img class="contact__social-icon" src="/pinterest.png" alt="Pinterest"/>
            </a>

            <a class="contact__social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img class="contact__social-icon" src="/facebook.png" alt="Facebook"/>
            </a>
        </div>
    </div>
</template>

<style scoped>
/* ==================== Main / Contact ==================== */
.contact {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px 120px;
    text-align: justify;
}

.contact__title {
    font-size: 2rem;
    margin-bottom: 10px;
}

.contact__intro,
.contact__info,
.contact__email {
    margin-bottom: 20px;
    line-height: 1.2;
    font-size: 18px;
}

/* ==================== Socials ==================== */
.contact__socials {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 20px 0;
}

.contact__social-link {
    display: inline-flex;
    width: 55px;
    height: 55px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    text-decoration: none;
}

/* Imagen más grande + transición suave */
.contact__social-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.15s ease-out;
}

    /* Quitamos el fondo del a:hover global y solo usamos zoom en hover */
    .contact__socials a:hover {
    background-color: transparent !important;
    outline: none;
    }

    /* SOLO hover hace zoom, no focus */
    .contact__socials a:hover .contact__social-icon {
    transform: scale(1.08);
    }

</style>
