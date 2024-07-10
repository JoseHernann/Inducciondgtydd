<script setup lang="ts">
import LoginImage from "../../assets/loginImage.vue";
import VInput from "../../components/VInput/VInput.vue";
import {IdentificationIcon, LockClosedIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
import GridBackground from "../../assets/GridBackground.vue";
import getDinamicData from "../../services/requestFunction.ts";
import JsonRequestOptions from "../../services/jsonRequest.ts";
import {Toast} from "../../utils/alerts.ts";
import router from "../../router/router.ts";


const user = ref('');
const password = ref('');

async function login() {
  const initSession: JsonRequestOptions = {
    encryptedSP: 'X_XgpoilSJAat5lL4qvA55RIA==',
    paramValues: [
      {
        name: 'USR',
        value: user.value,
        type: 'varchar',
      },
      {
        name: 'PASS',
        value: password.value,
        type: 'varchar',
      },
    ],
  };

  const response = await getDinamicData(initSession);
  if(response.length === 0 ){
    await Toast.fire({icon: 'error', title: 'Usuario no encontrado'})
  }else{
    sessionStorage.setItem('Nombre',response[0].NOMBRE);
    sessionStorage.setItem('Correo',response[0].CORREO);
    sessionStorage.setItem('Rol',response[0].ROL);
    sessionStorage.setItem('Sexo',response[0].SEXO);
    sessionStorage.setItem('UserAC',response[0].USER_AC);
    sessionStorage.setItem('UserID',response[0].USER_ID);
    await router.push('/usuarios')


  }

}
</script>

<template>
  <GridBackground class="absolute w-full h-full " />
  <div class="flex w-screen h-screen bg-primary items-center justify-around px-10">
    <div>
      <LoginImage class="w-[80dvh] h-full z-30  " />
    </div>
    <div class="text-white flex flex-col gap-10">
        <span class="text-5xl font-bold">Bienvenido !!!</span>
        <p class="text-2xl">Introduce tus credenciales para comenzar</p>
      <v-input
          id="user"
          border-color="border-gray-300"
          :icon="IdentificationIcon"
          icon-color="stroke-primary"
          v-model="user"
          placeholder=""
          label="Usuario"
          type="text"
      />
      <v-input
          id="password"
          border-color="border-gray-300"
          :icon="LockClosedIcon"
          icon-color="stroke-primary"
          v-model="password"
          placeholder=""
          label="Contraseña"
          type="password"
      />
      <button class="bg-secondary w-full text-primary font-semibold py-2 rounded-xl text-xl hover:opacity-90 z-10" @click="login">
        Iniciar Sesión
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>