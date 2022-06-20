<template>
  <teleport to="body">
    <div class="flex">
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
                  <svg
                    class="palomita"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                    />
                  </svg>
                  Bienvenido
                </p>
              </div>
              <div v-if="store.condicion === 'contrasena'">
                <p>Quisiera ayudarte pero esta opcion era en joda :V</p>
              </div>
              <div v-if="store.condicion === 'cerrarSesion'">
                <p>
                  <svg
                    class="palomita"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                    />
                  </svg>
                  Sesión cerrada
                </p>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { useStore } from "../store/Modal.js";
const store = useStore();
</script>

<style scoped>
p {
  padding: 2px 5px;
}
.flex {
  display: flex;
  position: fixed;
  top: 0;
  left: calc(25%);
  width: 50%;
  height: 80px;
  z-index: 100;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.modal {
  text-align: center;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: white;
}

.palomita {
  fill: green;
}

svg {
  height: 16px;
  width: 16px;
}
</style>
