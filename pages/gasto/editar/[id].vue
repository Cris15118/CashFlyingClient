<script setup lang='ts'>
import { useGastoStore } from '~/stores/gastoStore';
import { useAuthStore } from "~/stores/authStore";
import { onMounted } from 'vue';
import { uid } from 'uid';
import { useRouter } from 'vue-router';
import Alerta from '~/components/Alerta.vue';
import { storeToRefs } from 'pinia';

const {authenticated} = storeToRefs(useAuthStore())

interface Gasto{
    id: string;
    nombre:string;
    cantidad: number;
    categoria: string;
    descripcion: string;
    fecha:string;
}

const gastoStore = useGastoStore()
const router = useRouter()
const gastoId = router.currentRoute.value.params.id
const error = ref('')
const labelPosition = ref<FormProps["labelPosition"]>('left');

const gasto: Ref<Gasto> = ref({
    id: uid(),
    nombre: '',
    cantidad:0,
    categoria:'',
    descripcion:'',
    fecha:''
})

// Rellena el componente con el id del gasto elegido en la vista anterior
onMounted(()=>{
    const id:string = Array.isArray(gastoId) ? gastoId[0] : gastoId
    const gastoseleccionado = gastoStore.getGastoById(id)
    if(gastoseleccionado){
        Object.assign(gasto.value, gastoseleccionado)
    }else{
        error.value = `No se encontró ningun Gasto con ese Id : ${gastoId}`
    }
})

// Actualizar gastos
const actualizarGasto = () =>{
  if(!gasto.value.nombre|| !gasto.value.cantidad || !gasto.value.descripcion.includes('')){
    error.value= 'Todos los campos son obligatorios'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }
  if(gasto.value.cantidad <= 0){
    error.value = 'La cantidad no es válida'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
}else{
  gastoStore.updateGasto(gasto.value)
  router.push("/gasto/listado-gastos")
}
}
</script>

<template>
  <h1 class="encabezado">Editar</h1>
  <div class="contenedor" >
    <h2 class="subtitulo">Editar Gastos</h2>
  
    <el-form
      :label-position="labelPosition"
      label-width="auto"
      style="width: 100%;"
      size="large"
      @submit.prevent="actualizarGasto"
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
        <el-button class="shake" style="width: 100%" @click="actualizarGasto(gasto)">Editar Gasto</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang='scss'>
@import "../../../assets/styles/contenedor.scss";
@import "../../../assets/styles/boton.scss";
@import "../../../assets/styles/encabezado.scss";
@import "../../../assets/styles/subtitulo.scss";

</style>