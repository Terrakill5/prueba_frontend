<!-- <template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu v-if="!fixed">
        <slot name="actions">
          <base-button @click="tryClose">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template> -->

<template>
  <teleport to="body">
    <transition
      name="modal-animation"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
      mode="out-in"
    >
      <div v-show="store.mostrar" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="store.mostrar" class="modal-inner">
            <!-- Modal content -->
            <div v-if="store.condicion == 'logeo'">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                  /></svg>
                  Bienvenido
              </p>
            </div>
            <div v-if="store.condicion === 'contrasena'" >
              <p>Quisiera ayudarte pero esta opcion era en joda :V</p>
            </div>
          </div>
        </transition>
      </div>
      <!-- <dialog open v-if="anyProps.show">
      <p v-if="anyProps.condicion=='login'">Bienvenido</p>
      <p v-if="anyProps.condicion=='contraseña'">Quisiera ayudarte pero esta opcion era en joda :V</p>
    </dialog> -->
    </transition>
  </teleport>
</template>

<script setup>
import { useStore } from "../store/Modal.js";
const store = useStore();
/* import { defineProps } from "vue";
const anyProps = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  condicion: {
    type: String,
    required: false,
  },
}); */

/* if (anyProps.show) {
  setTimeout(function(){
    anyProps.show = !anyProps.show;
}, 2000);
} */
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

svg {
  height: 15px;
  width: 15px;
}
</style>
