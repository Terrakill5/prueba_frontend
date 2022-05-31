<template>
<div>
  <h1>Create an Account</h1>
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
