<script setup lang="ts">
import { useGastoStore } from "~/stores/gastoStore";
import { useAuthStore } from "~/stores/authStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { FormProps } from "element-plus";
import { uid } from "uid";
import Alerta from "~/components/Alerta.vue";
import { storeToRefs } from 'pinia';

const {authenticated} = storeToRefs(useAuthStore())


interface Gasto{
  id:string,
  nombre: string,
  cantidad: number
  categoria: string
  descripcion:string
  fecha: string
}

const gasto = reactive<Gasto>({
  id: null,
  nombre: "",
  cantidad: 0,
  categoria: "",
  descripcion: "",
  fecha: ""
});

const gastoStore = useGastoStore()
const router = useRouter()
const error = ref('')

const labelPosition = ref<FormProps["labelPosition"]>('left');

// Añadir gastos a la vista de listado-gastos
const añadirGasto = ()=>{
  const {nombre, cantidad, categoria, descripcion,fecha}= gasto
   //Validar que los campos no estén vacíos
  if([nombre, cantidad, categoria,descripcion,fecha].includes('')){
    error.value= 'Todos los campos son obligatorios'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }
  //Validar que la cantidad no sea 0
  if(cantidad <= 0){
    error.value = 'La cantidad no es válida'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }else{
    gastoStore.añadirGasto(
    gasto.nombre,
    gasto.cantidad,
    gasto.categoria,
    gasto.descripcion,
    gasto.fecha
    )
    
  }
  router.push('/gasto/listado-gastos')
}


const gastos = gastoStore.gastos

</script>

<template>
  <h1>Planifica tus Gastos</h1>
  
  <div class="contenedor" >
    <h2>Añadir Gastos</h2>
  
    <el-form
      :label-position="labelPosition"
      label-width="auto"
      style="width: 100%;"
      size="large"
      :model="gasto"
      @submit.prevent="añadirGasto"
    >
    <Alerta v-if="error">{{ error }}</Alerta>
      <el-form-item label="Nombre Gasto" size="large">
        <el-input v-model="gasto.nombre"  placeholder="Añade el nombre del gasto" />
      </el-form-item>
      <el-form-item label="Cantidad" size="large">
        <el-input type="number" v-model.number="gasto.cantidad"  placeholder="Añade la cantidad del gasto, ej.20" />
      </el-form-item>
      <el-form-item label="Categoría" size="large">
        <el-select placeholder="-- Seleccionar --" v-model="gasto.categoria">
          <el-option label="Casa" value="casa" />
          <el-option label="Gastos Varios" value="gastos" />
          <el-option label="Ocio" value="ocio" />
          <el-option label="Comida" value="comida" />
          <el-option label="Salud" value="salud" />
          <el-option label="Suscripciones" value="suscripciones" />
        </el-select>
      </el-form-item>
      <el-form-item label="Fecha del Gasto">
      <el-col :span="11">
        <el-date-picker
          v-model="gasto.fecha"
          type="date"
          placeholder="Elige la Fecha"
          style="width: 100%"
          
        />
      </el-col>
    </el-form-item>
      <el-form-item label="Descripción">
      <el-input v-model="gasto.descripcion" type="textarea" placeholder="Escribe una descripción si así lo deseas"/>
    </el-form-item>
      <el-form-item>
        <el-button class="shake" style="width: 100%" @click="añadirGasto">Añadir Gasto</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/contenedor.scss";
.presupuesto {
  width: 100%;
}
.campo {
  display: grid;
  gap: 2rem;
}
.presupuesto label {
  font-size: 2rem;
  text-align: center;
  color: $primary-color;
}
.presupuesto input[type="number"] {
  background-color: $background-color;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
}
.presupuesto input[type="submit"] {
  background-color: $primary-color;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: $color-fuente;
  font-weight: 900;
  width: 100%;
  border-radius: 1rem;
}
</style>
