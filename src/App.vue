<template>
  <div class="container">
    <section class="left">Left</section>
    <section class="right">
      <nav>
        <router-link to="/register">Register</router-link>
        {{ " " }}
        <router-link to="/sign-in">Sign In</router-link>
        {{ " " }}
        <router-link to="/pizzastore">Pizza</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
        <!-- boton aparece si el usuario esta logeado -->
      </nav>

      <div class="right__center">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
            mode="out-in"
          >
            <!--  en la transicion, se usa el nombre para poder nombrar los estilos con fade, luego con el mode, se usa out-in para primero desaparezca el primer elemento y luego sale el segundo, para evitar solapamiento -->
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false); //para  verificar que esta logeado
let auth;
onMounted(() => {
  //fase donde se comprueba si el usuario esta logeado
  auth = getAuth(); //recibimos de firebase el usuario en cuestion
  onAuthStateChanged(auth, (user) => {
    //cada vez que se cambie el estado del usuario, se modifica en la pagina si esta o no logeado
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/"); //lo envia a la pagina principal
  });
};
</script>

<style>
  body {
  margin: 0;
}
</style>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* fracciona en dos la pantalla principal */
  height: 100vh; /* hace que la altura sea igual a lo que se ve en pantalla  */
}

.left {
  background-color: aqua;
}

/* .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
} */
</style>
