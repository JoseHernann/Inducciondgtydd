<script setup lang="ts">
import {
  DxColumn,
  DxDataGrid,
  DxPaging,
  DxEditing,
  DxPatternRule,
  DxRequiredRule,
  DxLookup,
} from 'devextreme-vue/data-grid';

import {onMounted, reactive, ref} from "vue";
import getDinamicData from "../../../services/requestFunction.ts";
import JsonRequestOptions from "../../../services/jsonRequest.ts";
import {Toast} from "../../../utils/alerts.ts";

const users = ref()
const onlyUpperCaseAndNumbersandDash = /^[A-Z0-9\-]+$/;
const onlyUpperCase = /^[A-Z\s]+$/;
const roles =  ['Administrador', 'Instructor',  'Usuario']
const sexo = ['M', 'F'];

onMounted(() => {
  getUsers();
})

async function getUsers() {
  const respondantObject = reactive<JsonRequestOptions>({
    encryptedSP: 'X_XiWWe/Nqvp64V4dm4lhm5gA==',
  });
  users.value = await getDinamicData(respondantObject);
}
async function addUser(user) {
  const responseObject = reactive<JsonRequestOptions>({
    encryptedSP: 'X_XUUS3SER0iFm2pL8jzPz834F8jP7COB5p', //SP_AD_ADD_PRACTICANTE
    paramValues: [
      {
        name: 'USER_ID',
        value: user.USER_ID,
        type: 'varchar',
      },
      {
        name: 'NOMBRE',
        value: user.NOMBRE,
        type: 'varchar',
      },
      {
        name: 'USER_AC',
        value: user.USER_AC,
        type: 'varchar',
      },
      {
        name: 'CORREO',
        value: user.CORREO,
        type: 'varchar',
      },
      {
        name: 'SEXO',
        value: user.SEXO,
        type: 'varchar',
      },
      {
        name: 'ROL',
        value: user.ROL,
        type: 'varchar',
      },
      {
        name: 'DEPARTAMENTO',
        value: user.DEPARTAMENTO,
        type: 'varchar',
      }
    ],
  });
  try{
    await getDinamicData(responseObject);
    await Toast.fire({icon: 'success', title: 'Usuario agregado'})
  }catch (e){
    await Toast.fire({icon: 'error', title: 'Error al agregar usuario'})
  }
}

</script>

<template>
  <div class="mt-10 mx-10">
    <div class="flex flex-col gap-4">
      <p class="text-4xl text-secondary mt-8">Usuarios</p>
    </div>
    <div class="mt-8 flex justify-center ">
      <DxDataGrid
          :data-source="users"
          key-expr="USER_ID"
          :row-alternation-enabled="true"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :filter-row="{ visible: true }"
          :header-filter="{ visible: true }"
          :grouping="{ autoExpandAll: true }"
          :group-panel="{ visible: true }"
          :show-row-lines="true"
          @row-inserting="addUser($event.data)"
      >
        <DxColumn data-field="USER_ID" caption="ID USUARIO">
          <DxRequiredRule />
          <DxPatternRule
              :pattern="onlyUpperCaseAndNumbersandDash"
              message='Debe ser en mayusculas y solo puede contener numeros y guiones. Ejemplo: "PRAC-1234"'
          />
        </DxColumn>
        <DxColumn data-field="USER_AC" caption="USUARIO"></DxColumn>
        <DxColumn data-field="NOMBRE" caption="NOMBRE">
          <DxPatternRule
              :pattern="onlyUpperCase"
              message='Debe ser en mayusculas. Ejemplo: "JUAN CARLOS"'
          />
        </DxColumn>
        <DxColumn data-field="CORREO" caption="CORREO"  />
        <DxColumn data-field="ROL" caption="ROL">
          <DxLookup
              :data-source="roles"
              :value="users?.ROl"
              :valueExpr="users?.ROL"
              :displayExpr="users?.ROL"
          />
        </DxColumn>
        <DxColumn data-field="DEPARTAMENTO" caption="DEPARTAMENTO" />
        <DxColumn data-field="SEXO" caption="SEXO">
          <DxLookup
              :data-source="sexo"
              :value="users?.SEXO"
              :valueExpr="users?.SEXO"
              :displayExpr="users?.SEXO"
          />
        </DxColumn>
        <DxPaging :enabled="true" />
        <DxEditing  mode="form" :allow-adding="true" />
      </DxDataGrid>
    </div>
  </div>
</template>

<style scoped>

</style>