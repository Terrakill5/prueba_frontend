<template>
<div>
  <img src="../../../img/logo_principal_editado.jpg" alt="logo principal de la pagina">
  <h1>Bienvenido</h1>
  <h2>Crea una cuenta para continuar a nuestras tiendas</h2>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</div>
  
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const password = ref("");
const register = () => {
  // Necesita .value debido al ref()
  const auth = getAuth(); // de firebase/auth
  createUserWithEmailAndPassword(auth, email.value, password.value).then(() => {
    console.log("Registro completado");
    console.log(auth.currentUser);
    router.push("/pizzastore"); //redirecciona a la pizzeria
  });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/pizzastore");
        })
        .catch(() => {
            //handle error
        })
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>