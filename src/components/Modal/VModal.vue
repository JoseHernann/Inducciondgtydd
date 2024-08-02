<script setup lang="ts">
import JsonRequestOptions from "../../services/jsonRequest.ts";
import { Toast } from "../../utils/alerts.ts";
import getDinamicData from "../../services/requestFunction.ts";

import {ExclamationTriangleIcon} from "@heroicons/vue/24/solid";


const props = defineProps(['curso', 'cursoId']);
const emit = defineEmits(['closeModal','startExam']);

async function checkEndCurse() {
  const initSession: JsonRequestOptions = {
    encryptedSP: 'X_XWtwPsqPz8JKev24llk9F7vg3bT8LJdaO',
    paramValues: [
      {
        name: 'USERID',
        value: 'PP01',
        type: 'varchar',
      },
      {
        name: 'CURSO',
        value: props.cursoId,
        type: 'int',
      },
    ],
  };

  const response = await getDinamicData(initSession);
  if (parseInt(response[0].CALIDAD) === 0) {
    await Toast.fire({ icon: 'error', title: 'No has concluido el curso' });
  } else {
    await Toast.fire({ icon: 'success', title: 'Comenzando examen....' });
    emit('closeModal', false);
    emit('startExam', true);
  }
}
</script>

<template>
  <div class="modal-background" @click="$emit('closeModal', false)">

    <div class="card" @click.stop>
      <ExclamationTriangleIcon class="w-10 h-10" />
      <p class="cookieHeading">Iniciar Examen</p>
      <p class="cookieDescription">Estas por iniciar tu examen del curso <span>{{ props.curso }}</span> para contestarlo primero necesitas haber concluido dicho curso</p>

      <div class="buttonContainer">
        <button class="acceptButton" @click="checkEndCurse">Continuar</button>
        <button class="declineButton" @click="$emit('closeModal', false)">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.card {
  width: 300px;
  height: 220px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  gap: 13px;
  position: relative;
  z-index: 20;
  overflow: hidden;
}

.cookieHeading {
  font-size: 1.2em;
  font-weight: 800;
  color: #1a1a1a;
}

.cookieDescription {
  text-align: center;
  font-size: 0.7em;
  font-weight: 600;
  color: #636363;
}

.cookieDescription a {
  color: rgb(59 130 246);
}

.cookieDescription a:hover {
  text-decoration: underline;
}

.buttonContainer {
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.acceptButton,
.declineButton {
  width: 80px;
  height: 30px;
  transition-duration: 0.2s;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s ease;
}

.acceptButton {
  background-color: #FCA311;
  border: none;
  color: rgb(241, 241, 241);
  box-shadow: 0 4px 6px -1px #FCA311, 0 2px 4px -1px #FCA311;
}

.acceptButton:hover {
  background-color: #ffbd54;
  box-shadow: 0 10px 15px -3px #ffbd54, 0 4px 6px -2px #ffbd54;
}

.declineButton {
  background-color: #dadada;
  border: none;
  color: rgb(46, 46, 46);
  box-shadow: 0 4px 6px -1px #bebdbd, 0 2px 4px -1px #bebdbd;
}

.declineButton:hover {
  background-color: #ebebeb;
  box-shadow: 0 10px 15px -3px #bebdbd, 0 4px 6px -2px #bebdbd;
}
</style>
