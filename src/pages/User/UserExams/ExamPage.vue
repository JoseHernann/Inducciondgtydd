<script setup lang="ts">
import {computed, ref, watch} from "vue";
    import VModal from "../../../components/Modal/VModal.vue";
    import JsonRequest from "../../../services/jsonRequest.ts";
    import getDinamicData from "../../../services/requestFunction.ts";
    const showModal = ref(false);

  const curso = ref(0);
  const showExam = ref(false);
  const questions = ref([]);
  const setCurso = (id: number) => {
    curso.value = id;
  }

  async function  getQuestions(curso: number){
    const fnObjt : JsonRequest = {
      encryptedSP : 'X_XK/xSR6hboeW6kC+VTghdUH9aNSNyU7sH',
      paramValues: [{
        name: 'CURSO_ID',
        value: curso,
        type: 'int'
      }]
    };

    questions.value = await getDinamicData(fnObjt)
    console.log(questions.value)
  }

  watch(showExam,(value) => {
    if(value){
      getQuestions(curso.value)
    }
  })

</script>

<template>
  <div class="flex  gap-10 px-10 flex-col" v-if="!showExam" >
    <VModal v-if="showModal==true" @closeModal="(n) => showModal = n " :curso-id="curso" :curso="'de Calidad'" @startExam="(val) => showExam = val"/>
    <div
        class="overflow-hidden before:ease-in-out after:ease-in-out bg-white group cursor-pointer relative flex flex-col gap-4 justify-between rounded-2xl border hover:after:w-full border-white-222 hover:border-secondary duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 after:bg-[url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWaeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')] before:duration-300 before:-z-1 before:bg-secondary before:absolute before:top-0 before:left-0"
        @click="showModal = true, setCurso(1)"
    >
      <h4
          class="font-medium text-lg duration-300 group-hover:text-white group-hover:z-[5]"
      >
        Examen Curso de Calidad
      </h4>
      <a
          class="text-[#1D2825] group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base"
      >
        Comenzar
        <svg
            class="w-4 h-4"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              stroke-linejoin="round"
              stroke-linecap="round"
          ></path>
        </svg>
      </a>
    </div>

  </div>
  <div v-else class="flex flex-col w-full p-10 ">

    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold mb-5">Examen Curso de Calidad</h1>
      <button class="bg-secondary hover:opacity-80 text-xl px-10 py-4 rounded-xl text-white">Enviar</button>
    </div>
    <div v-for="( question, index) in questions" class="flex flex-col">
      <span>{{question.PREGUNTA}}</span>
      <textarea class=" h-40 border rounded-md mb-10 mt-4 p-4"></textarea>
    </div>
   </div>


</template>

<style scoped>

</style>