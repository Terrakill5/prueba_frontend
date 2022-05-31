<template>
<div>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</div>
    
</template>

<script setup>
    import {ref} from "vue";
    import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errMsg = ref(); //Mensaje de error
    const register = () => {
        // Necesita .value debido al ref()
        const auth = getAuth() // de firebase/auth
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            console.log("Te has logeado exitosamente!");
            console.log(auth.currentUser);
            router.push("/pizzastore"); //redirecciona a la pizzeria
        })
        .catch((error) => { //en caso el correo sea invalido
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email": //caso que el email sea invalido
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found": //no se encuentra al usuario
                    errMsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password": //contraseña incorrecta
                    errMsg.value = "Incorrect password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"; //el correo o la clave es errada
                    break;
            }
        });
    };

    const signInWithGoogle = () => {

    }
</script>