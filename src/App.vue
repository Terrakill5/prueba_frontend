<template>
  <div class="container">
    <section class="left">Left</section>
    <section class="right">
      <div class="enfoque">
        <!-- <div class="theHeader">
          <the-header :auth="auth" :isLoggedIn="isLoggedIn"></the-header>
        </div> -->
        <base-modal></base-modal>

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
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseModal from "./ui/BaseModal.vue";
//import TheHeader from "./components/TheHeader.vue";
import { useAuthStore } from "./store/Auth.js";
import { onMounted} from "vue";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
const usarAuth = useAuthStore();
//const isLoggedIn = ref(false); para  verificar que esta logeado
//let auth;
/* onMounted(() => {
  //fase donde se comprueba si el usuario esta logeado
  auth = getAuth(); //recibimos de firebase el usuario en cuestion
  onAuthStateChanged(auth, (user) => {
    //cada vez que se cambie el estado del usuario, se modifica en la pagina si esta o no logeado
    if (user) {
      usarAuth.cambiarLog(true);
      //isLoggedIn.value = true;
    } else {
      usarAuth.cambiarLog(false);
      //isLoggedIn.value = false;
    }
  });
}); */

onMounted(() => {
  usarAuth.comprobacionAuth;
})
</script>

<style>
body {
  margin: 0;
}

a {
  text-decoration: none;
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

.enfoque {
  padding: 10px 0 30px 0;
}

.theHeader {
  text-align: center;
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
