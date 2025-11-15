<template>
    <div>
        <!-- Main -->
        <main class="recipe-detail">
            <h2 class="recipe-detail__title"> 
                <strong>Cinnamon Rolls caseros</strong></h2>

            <img class="recipe-detail__image" src="/cinnamonrolls.jpeg" alt="Cinnamon Rolls caseros" />

            <p class="recipe-detail__description">
                Estos cinnamon rolls esponjosos están rellenos de canela y azúcar moreno y cubiertos con un glaseado suave. Perfectos para un desayuno especial o una merienda dulce.
            </p>

            <h3 class="recipe-detail__section-title">
                <strong>INGREDIENTES</strong>
            </h3>
            <div class="recipe-detail__ingredients">
                <ul class="recipe-detail__list">
                <li>500 g de harina de trigo</li>
                <li>250 ml de leche templada</li>
                <li>75 g de azúcar blanco</li>
                <li>1 sobre de levadura seca de panadería</li>
                <li>75 g de mantequilla derretida</li>
                <li>1 huevo</li>
                <li>Relleno: mantequilla, azúcar moreno y canela al gusto</li>
                </ul>
            </div>

            <h3 class="recipe-detail__section-title">
                <strong>PASOS</strong>
            </h3>
            <ol class="recipe-detail__steps">
                <li>Añade la leche templada, la levadura y el azúcar blanco. Deja reposar unos minutos.</li>
                <li>Mezcla con la harina, el huevo y la mantequilla derretida. Amasa hasta obtener una masa suave.</li>
                <li>Deja levar la masa en un bol tapado hasta que doble su tamaño.</li>
                <li>Estira la masa en un rectángulo, unta mantequilla, espolvorea azúcar moreno y canela.</li>
                <li>Enrolla, corta en porciones y colócalas en una bandeja de horno.</li>
                <li>Deja levar de nuevo y hornea hasta que estén dorados.</li>
                <li>Si quieres, cúbrelos con un glaseado de azúcar glas y leche.</li>
            </ol>
        </main>

        <!-- Sección de comentarios -->
        <section class="recipe-comments">
            <!-- Escribir un comentario -->
            <div class="recipe-comments__box">
                <h3 class="recipe-comments__title">
                <strong>Deja tu comentario</strong>
                </h3>
                <form class="recipe-comments__form" @submit.prevent>
                <div class="recipe-comments__row">
                    <label for="rating">Valoración:</label><br />
                    <select id="rating" name="rating" class="recipe-comments__input">
                    <option value="0">0 estrellas</option>
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
                    </select>
                </div>

                <div class="recipe-comments__row">
                    <label for="comment">Comentario:</label><br />
                    <textarea
                    id="comment"
                    name="comment"
                    class="recipe-comments__input"
                    rows="4"
                    placeholder="Escribe aquí tu comentario..."
                    ></textarea>
                </div>

                <button type="submit" class="recipe-comments__btn">Enviar</button>
                </form>
            </div>

            <!-- Lista de comentarios -->
            <div class="recipe-comments__list">
                <h3 class="recipe-comments__title"><strong>Comentarios anteriores</strong></h3>

                <div class="recipe-comments__item">
                <p class="recipe-comments__author">
                    <strong>Ana</strong>
                </p>
                <p class="recipe-comments__meta">28/09/2025 18:30</p>
                <p class="recipe-comments__stars">⭐⭐⭐⭐⭐</p>
                <p class="recipe-comments__text">Me encantó la receta, me salió riquísima 😍</p>
                <hr class="recipe-comments__divider" />
                </div>

                <div class="recipe-comments__item">
                <p class="recipe-comments__author">
                    <strong>Pedro</strong>
                </p>
                <p class="recipe-comments__meta">28/09/2025 19:10</p>
                <p class="recipe-comments__stars">⭐⭐⭐⭐</p>
                <p class="recipe-comments__text">Probé a ponerle un poco menos de azúcar y quedó genial 👌</p>
                <hr class="recipe-comments__divider" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    /* Recipe detail */
    .recipe-detail {
    max-width: 66%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 120px;
    }

    .recipe-detail__title {
    font-size: 2rem;
    margin-bottom: 20px;
    margin-top: 40px;
    }

    .recipe-detail__image {
        display: block;
        margin: 0 auto 20px;
        max-width: 520px;
        width: 100%;
        border-radius: 12px;
    }

    .recipe-detail__description {
        margin-bottom: 24px;
        line-height: 1.6;
        text-align: justify;
    }

    .recipe-detail__section-title {
        margin: 24px 0 12px;
    }

    .recipe-detail__subsection-title {
        margin: 16px 0 8px;
    }

    .recipe-detail__ingredients,
    .recipe-detail__list,
    .recipe-detail__steps {
        text-align: left;
        margin: 0 auto 28px;
        display: inline-block;
    }

    /* Comments */
    .recipe-comments {
        max-width: 800px;
        margin: 40px auto 120px;
        font-family: inherit;
    }

    .recipe-comments__box {
        background: #fff;
        border-radius: var(--radius);
        border: 2px solid rgba(43, 91, 91, 0.12);
        padding: 20px;
        margin-bottom: 30px;
    }

    .recipe-comments__title {
        text-align: center;
        margin-bottom: 16px;
    }

    .recipe-comments__form .recipe-comments__row {
        margin-bottom: 14px;
    }

    .recipe-comments__input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 10px;
        border: 1px solid rgba(43, 91, 91, 0.12);
    }

    .recipe-comments__btn {
        display: inline-block;
        padding: 10px 18px;
        border-radius: 12px;
        background: var(--dark);
        color: #fff;
        text-decoration: none;
        border: none;
        cursor: pointer;
    }

    .recipe-comments__list {
        background: #fff;
        border-radius: var(--radius);
        border: 2px solid rgba(43, 91, 91, 0.12);
        padding: 20px;
    }

    .recipe-comments__item {
        margin-bottom: 20px;
    }

    .recipe-comments__author {
        font-size: 1.1rem;
    }

    .recipe-comments__meta {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 4px;
    }

    .recipe-comments__stars {
        color: var(--accent);
        margin-bottom: 6px;
    }

    .recipe-comments__text {
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .recipe-comments__divider {
        border: none;
        border-top: 1px solid rgba(43, 91, 91, 0.2);
    }

    .recipe-detail__title strong,
    .recipe-detail__section-title strong,
    .recipe-comments__title strong,
    .recipe-comments__author strong {
        font-weight: 700;
    }
</style>
