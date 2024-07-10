<script setup lang="ts">
import {
  UserGroupIcon,
} from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const icons = [UserGroupIcon]; //Iconos en orden que se muestran en el sidebar
const router = useRouter();
const selectedRouteIndex = ref(0);

const currentUser = sessionStorage.getItem('Name')  ?? 'Usuario';
const userDepartment = sessionStorage.getItem('Department') ?? 'Departamento';
function goToRoute(route: string, index: number) {
  selectedRouteIndex.value = index;
  router.push(route);
}
function getAuthorizedRoutes(rol: string) {
  return router.getRoutes().filter((route) => {
    return Array.isArray(route.meta.authorizedRoles) && route.meta.authorizedRoles.includes(rol);
  });
}
const roleRoutes = getAuthorizedRoutes('Administrador');

onMounted(() => {
  router.push(roleRoutes[0].path as string);
});
</script>

<template>
  <div class="mt-32 ">
    <div class="bg-primary rounded-tr-[6rem] shadow-xl h-full ">
      <div class="text-auxiliar flex flex-col gap-10 pt-20 h-full justify-between">
        <div
            :class="{
            ' text-secondary bg-white': selectedRouteIndex == index,

            'flex items-center gap-3 mr-5 px-3 py-2 cursor-pointer transition-colors rounded-r-xl ': true,
          }"
            v-for="(options, index) in roleRoutes"
            :key="index"
            @click="goToRoute(options.path as string, index as number)"
        >
          <component :is="icons[index]" class="w-5 h-5" />
          <span>{{ options.name }}</span>
        </div>
        <div class="flex flex-col justify-center items-center pb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="104" height="4" viewBox="0 0 104 4" fill="none">
            <path d="M2 2H102" stroke="#FCA311" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <div class="flex flex-col justify-start w-full px-8  gap-1 mb-4 mt-1 ">
            <span class="text-lg text-white   ">{{ currentUser }}</span>
            <span class="text-[10px] font-semibold text-white">{{userDepartment}}</span>
          </div>
          <button class="bg-white text-secondary text-xl  py-2 rounded-xl px-16 ">
            Salir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
