<script setup lang='ts'>
import { usePresupuestoStore } from "~/stores/presupuestoStore";
import { useRouter } from "vue-router";
import Alerta from "~/components/Alerta.vue";

definePageMeta({
  middleware:'auth',
})

interface Presupuesto{
  saldo:number
}
const presupuesto = reactive<Presupuesto>({
  saldo: 0
})
const presupuestoStore = usePresupuestoStore()
const error = ref('')
const router = useRouter()
const añadirSaldo = ()=>{
  const {saldo}= presupuesto
  if(saldo <= 0){
    error.value = 'La cantidad no es válida'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }else{
    presupuestoStore.añadirSaldo(
    presupuesto.saldo
    )
  }
  router.push('/gasto/listado-gastos')
}
const presupuestos = presupuestoStore.presupueto
</script>

<template>
  <div class="contenedor">
    <h2>Definir Saldo</h2>
    <el-form
    style="width: 100%;"
    size="large"
    :model="presupuesto"
    @submit.prevent="añadirSaldo"
    >
    <Alerta v-if="error">{{ error }}</Alerta>
    <el-form-item label="Añade tu saldo disponible" size="large">
      <el-input type="number" v-model.number="presupuesto.saldo"/>
    </el-form-item>
    <el-form-item>
        <el-button class="shake" style="width: 100%" @click="añadirSaldo">Añadir Saldo</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang='scss'>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/contenedor.scss";
</style>