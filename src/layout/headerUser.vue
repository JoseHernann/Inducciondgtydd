<script setup lang="ts">
import {
  UserGroupIcon, DocumentIcon, BellAlertIcon
} from '@heroicons/vue/24/outline';
import logoUANL from '../assets/logoUANL.vue';

import { onMounted, ref } from 'vue';

const icons = [UserGroupIcon, DocumentIcon]; //Iconos en orden que se muestran en el sidebar
import router from '../router/router.ts';
const currentUser = sessionStorage.getItem('UserAC')  ?? 'Usuario';

const selectedRouteIndex = ref(0);
const roleRoutes = getAuthorizedRoutes("Usuario");



function goToRoute(route: string, index: number) {
  selectedRouteIndex.value = index;
  router.push(route);

}

function getAuthorizedRoutes(rol: string) {
  return router.getRoutes().filter((route) => {
    return Array.isArray(route.meta.authorizedRoles) && route.meta.authorizedRoles.includes(rol);
  });
}


onMounted(() => {
  router.push(roleRoutes[0].path as string);
});

function logout() {
  sessionStorage.clear();
  router.push('/login');
}

</script>

<template>

    <nav class="flex justify-between items-center  bg-white w-screen left-0 top-0 px-5 pt-2 boxShadow w-full">
      <div>
        <logoUANL class="w-32 mb-2" />
      </div>
      <div class="flex-none">
        <ul class=" px-3 font-semibold " v-for="(route , index ) in roleRoutes">
          <li @click="goToRoute(route.path,index)" :class="{'text-gray-500': selectedRouteIndex !== index , 'text-secondary': selectedRouteIndex === index}"> {{route.name}} </li>
        </ul>
      </div>
      <div class="-ml-94">
        <span class="text-lg text-white   ">{{ currentUser }}</span>
        <button class="bg-primary text-white text-xl  py-2 rounded-xl px-6 " @click="logout">
          Salir
        </button>
      </div>
    </nav>


</template>

<style scoped>
.boxShadow {
  box-shadow: 0px 4px 25px 0px rgba(184, 181, 181, 0.25);
}
</style>