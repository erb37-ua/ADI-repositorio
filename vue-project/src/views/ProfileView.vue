<script setup>
  import { ref } from "vue";
  import { RouterLink, useRouter } from "vue-router";

  const router = useRouter();

  // Datos simulados (sin backend)
  const nombre = ref("Esteban");
  const correo = ref("esteban@example.com");
  const pass = ref("");
  const pass2 = ref("");

  const handleSave = () => {
      if (pass.value !== pass2.value) {
          console.warn("Las contraseñas no coinciden.");
          return;
      }
      console.log("Cambios de perfil guardados (demo, sin backend).");
  };

  const handleLogout = () => {
      console.log("Cierre de sesión simulado.");
      router.push("/login");
  };

  const handleDelete = () => {
      console.warn("Cuenta eliminada (simulación, sin backend).");
  };
</script>

<template>
  <div class="profile">
      <section class="profile-card">
          <h2 class="profile-card__title">Perfil</h2>

          <form id="formPerfil" novalidate @submit.prevent="handleSave">
          <div class="profile-card__row">
              <label for="nombre" class="profile-card__label">
              Nombre
              </label>
              <div class="profile-card__input-icon">
                  <i class="profile-card__icon fa-solid fa-user"></i>
                  <input id="nombre" class="profile-card__input" type="text" placeholder="Tu nombre" required v-model="nombre"/>
              </div>
          </div>

          <div class="profile-card__row">
              <label for="correo" class="profile-card__label">
              Correo electrónico
              </label>
              <div class="profile-card__input-icon">
                  <i class="profile-card__icon fa-solid fa-envelope"></i>
              <input id="correo" class="profile-card__input" type="email" placeholder="ejemplo@gmail.com" :value="correo" disabled />
              </div>
          </div>

          <div class="profile-card__row">
              <label for="pass" class="profile-card__label">
              Contraseña
              </label>
              <div class="profile-card__input-icon">
                  <i class="profile-card__icon fa-solid fa-lock"></i>
                  <input id="pass" class="profile-card__input" type="password" placeholder="********" v-model="pass"/>
              </div>
          </div>

          <div class="profile-card__row">
              <label for="pass2" class="profile-card__label">
              Repetir contraseña
              </label>
              <div class="profile-card__input-icon">
                  <i class="profile-card__icon fa-solid fa-lock"></i>
                  <input id="pass2" class="profile-card__input" type="password" placeholder="********"v-model="pass2"/>
              </div>
          </div>

          <div class="profile-card__row profile-card__buttons">
              <button type="submit" class="profile-card__btn">
              Guardar cambios
              </button>
              <button type="button" class="profile-card__btn" id="btnCerrarSesion" @click="handleLogout">
                  Cerrar sesión
              </button>
          </div>
          </form>

          <div class="profile-card__row profile-card__delete">
          <button type="button" class="profile-card__btn profile-card__btn--danger" @click="handleDelete">
              Eliminar cuenta
          </button>
          </div>
      </section>
  </div>
</template>

<style scoped>
  .profile {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 20px 120px;
  }

  .profile-card {
      background: var(--card);
      border-radius: var(--radius);
      padding: var(--pad);
      border: 2px solid var(--dark);
      max-width: 550px;
      margin: 0 auto;
  }

  .profile-card__title {
      font-size: 28px;
      margin-bottom: 28px;
      text-align: center;
      font-weight: 700;
  }

  .profile-card__row {
      margin-bottom: 18px;
      position: relative;
      text-align: left;
  }

  .profile-card__label {
      display: block;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #333;
  }

  .profile-card__input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      font-size: 15px;
      color: #333;
      font-weight: 400;
      font-family: 'Itim', sans-serif;
  }

  .profile-card__input::placeholder {
      color: #666;
      font-weight: 400;
  }

  .profile-card__input-icon {
      position: relative;
  }

  .profile-card__icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 16px;
  }

  .profile-card__input-icon .profile-card__input {
      padding-left: 40px;
  }

  .profile-card__buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
  }

  .profile-card__btn {
      display: inline-block;
      padding: 12px 30px;
      border-radius: 12px;
      background: var(--dark);
      color: #fff;
      text-decoration: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      font-weight: 700;
      font-family: 'Itim', sans-serif;
  }

  .profile-card__btn--danger {
      background: var(--accent);
      color: #fff;
      border-radius: 12px;
      padding: 12px 25px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      font-family: 'Itim', sans-serif;
  }

  .profile-card__delete {
      text-align: center;
      margin-top: 12px;
  }
</style>