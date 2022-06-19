<template>
  <div class="area">
    <img
      src="../../../img/logo_principal_editado.jpg"
      alt="logo principal de la pagina"
    />
    <h1>Bienvenido</h1>
    <p class="gris_ligero">A las mejores pizzas del pais</p>
    <div class="grupoInput">
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
        />
      </svg>
    </div>
    <div class="grupoInput">
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
        />
      </svg>
    </div>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><boton-submit @click="register">Logearse</boton-submit></p>
    <button class="boton_invisible" @click="apareceContrasena">
      ¿Olvidaste tu contraseña?
    </button>
    <p>
      <boton-submit @click="signInWithGoogle">Logearse con Google</boton-submit>
    </p>
    <p>
      <boton-submit @click="registrarse">Registrarse con email</boton-submit>
    </p>
    <!-- <base-modal :show="show" v-if="condicion == 'contraseña'">
      <div class="modal-content">
        <p>Quisiera ayudarte pero esta opcion era en joda :V</p>
      </div>
    </base-modal> -->
    <!-- <base-modal :show="show" v-if="condicion == 'logeo'"
      ><p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
          <path
            d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
          /></svg
        >Bienvenido
      </p></base-modal
    > -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../../store/Modal.js";
import { useAuthStore } from "../../store/Auth.js";
/* import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; */
import { useRouter } from "vue-router";
import BotonSubmit from "../../ui/BotonSubmit.vue";
//import BaseModal from "../../ui/BaseModal.vue";
const usarAuth = useAuthStore();
const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const errMsg = ref(); //Mensaje de error
//const show = ref(false);
//let condicion = ref("");
async function register () {
 await usarAuth.logear(email.value, password.value);
  if (usarAuth.permite) {
    router.push("/pizzastore");
  }
  usarAuth.falsoPagina();
}

const registrarse = () => {
  router.push("/register");
};

async function signInWithGoogle() {
  await usarAuth.signInWithGoogle();
  if (usarAuth.permite) {
    router.push("/pizzastore");
  }
  usarAuth.falsoPagina();
  /* const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      //show.value = true;
      store.cambiarMostrar();
      //condicion.value = "logeo";
      store.ponerCondicion("logeo");
      setTimeout(function () {
        //show.value = !show.value;
        store.cambiarMostrar();
      }, 2000);
      console.log(result.user);
      router.push("/pizzastore");
    })
    .catch(() => {
      //handle error
    }); */
}

const apareceContrasena = () => {
  //show.value = true;
  store.cambiarMostrar();
  //condicion.value = "contrasena";
  store.ponerCondicion("contrasena");
  setTimeout(function () {
    //show.value = !show.value;
    store.cambiarMostrar();
  }, 2000);
  //condicion.value = "contraseña";
};
/*
watch(show, function(newValue) {
  if (newValue) {
    
  }
}); */
</script>

<style scoped>
div {
  text-align: center;
}

h1 {
  margin-bottom: 10px;
}

.area {
  margin-top: 45px;
}

.gris_ligero {
  color: darkgray;
  margin-top: 5px;
}

.grupoInput {
  position: relative;
}

.grupoInput svg {
  position: absolute;
  top: 6px;
  /* right: 260px; */
  right: calc(50% - 80px);
}

.boton_invisible {
  background: none;
  border: 0;
}

input {
  height: 25px;
}

svg {
  height: 15px;
  width: 15px;
}
</style>
