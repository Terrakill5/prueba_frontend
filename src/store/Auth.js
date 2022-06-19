import { defineStore } from "pinia";
import { useStore } from "./Modal.js";
//import { useRouter } from "vue-router";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLog: false,
    auth: null,
    cambiarPagina: false,
  }),
  getters: {
    estado: (state) => state.isLog,
    isAuth: (state) => state.isAuth,
    permite: (state) => state.cambiarPagina,
  },
  actions: {
    cambiarLog(valor) {
      this.isLog = valor;
    },
    falsoPagina() {
      this.cambiarPagina = false;
    },
    comprobacionAuth() {
      this.auth = getAuth(); //recibimos de firebase el usuario en cuestion
      onAuthStateChanged(this.auth, (user) => {
        //cada vez que se cambie el estado del usuario, se modifica en la pagina si esta o no logeado
        if (user) {
          this.cambiarLog(true);
          //isLoggedIn.value = true;
        } else {
          this.cambiarLog(false);
          //isLoggedIn.value = false;
        }
      });
    },
    async register(email, password) {
      //const router = useRouter();
      // Necesita .value debido al ref()
      this.auth = getAuth(); //recibimos de firebase el usuario en cuestion
      await createUserWithEmailAndPassword(this.auth, email, password).then(
        () => {
          this.cambiarLog(true);
          console.log("Registro completado");
          //console.log(this.auth.currentUser);
          this.cambiarPagina = true;
          //router.push("/pizzastore");
        }
      );
    },
    async logear(email, password) {
      //const router = useRouter();
      const store = useStore();
      let errMsg;
      // Necesita .value debido al ref()
      this.auth = getAuth(); //recibimos de firebase el usuario en cuestion
      await signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.cambiarLog(true);
          console.log("Te has logeado exitosamente!");
          //show.value = true;
          store.cambiarMostrar();
          //condicion.value = "logeo";
          store.ponerCondicion("logeo");
          setTimeout(function () {
            //show.value = !show.value;
            store.cambiarMostrar();
          }, 2000);
          //console.log(this.auth.currentUser);
          this.cambiarPagina = true;
          //router.push("/pizzastore"); //redirecciona a la pizzeria
        })
        .catch((error) => {
          //en caso el correo sea invalido
          console.log(error.code);
          console.log(errMsg);
          switch (error.code) {
            case "auth/invalid-email": //caso que el email sea invalido
              errMsg = "Invalid email";
              break;
            case "auth/user-not-found": //no se encuentra al usuario
              errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password": //contraseña incorrecta
              errMsg = "Incorrect password";
              break;
            default: //el correo o la clave es errada
              errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    async handleSignOut() {
      this.auth = getAuth(); //recibimos de firebase el usuario en cuestion
      await signOut(this.auth)
        .then(() => {
          this.cambiarLog(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async signInWithGoogle() {
      //const router = useRouter();
      //console.log(router);
      const store = useStore();
      const provider = new GoogleAuthProvider();
      this.auth = getAuth(); //recibimos de firebase el usuario en cuestion
      await signInWithPopup(this.auth, provider)
        .then((result) => {
          store.cambiarMostrar();
          //condicion.value = "logeo";
          store.ponerCondicion("logeo");
          setTimeout(function () {
            //show.value = !show.value;
            store.cambiarMostrar();
          }, 2000);
          console.log(result.user);

          console.log("llego hasta aca");
          console.log("luego aca");
          this.cambiarLog(true);
          this.cambiarPagina = true;
        })
        .catch(() => {
          //handle error
        });

      //router.push("/pizzastore");
    },
  },
});
