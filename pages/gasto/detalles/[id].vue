<script setup lang='ts'>
import { onMounted } from 'vue';
import { uid } from 'uid';
import { formatearCantidad, formatearFecha } from "~/helpers";
import { useRouter } from "vue-router";
import { useGastoStore } from '~/stores/gastoStore';
import { useAuthStore } from '~/stores/authStore';
import Alerta from '~/components/Alerta.vue';
import IconoCasa from "../public/img/icono_casa.svg";
import IconoComida from "../public/img/icono_comida.svg";
import IconoGastos from "../public/img/icono_gastos.svg";
import IconoOcio from "../public/img/icono_ocio.svg";
import IconoSalud from "../public/img/icono_salud.svg";
import IconoSuscripcion from "../public/img/icono_suscripciones.svg";
import { storeToRefs } from 'pinia';

const {authenticated} = storeToRefs(useAuthStore())

const diccionarioIConos = {
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripcion: IconoSuscripcion,
};

interface Gasto{
    id: string;
    nombre:string;
    cantidad: number;
    categoria: string;
    descripcion: string;
    fecha:string;
}

const router = useRouter()
const gastoStore = useGastoStore()
const gastoId = router.currentRoute.value.params.id
const error = ref('')

const gasto: Ref<Gasto> = ref({
    id: uid(),
    nombre: '',
    cantidad:0,
    categoria:'',
    descripcion:'',
    fecha:''
})

onMounted(()=>{
    const id:string = Array.isArray(gastoId) ? gastoId[0] : gastoId
    const gastoseleccionado = gastoStore.getGastoById(id)
    if(gastoseleccionado){
        Object.assign(gasto.value, gastoseleccionado)
    }else{
        error.value = `No se encontró ningun Gasto con ese Id : ${gastoId}`
    }
})

const editarGasto = (gasto: Gasto) => {
    router.push("/gasto/editar/" + gasto.id)
}
const eliminarGasto = (gasto:string)=>{
    gastoStore.deleteGasto(gasto.id)
    gastos.value = gastoStore.gastos
    router.push("/gasto/listado-gastos")
}
const gastos= ref(gastoStore.gastos)
</script>

<template>
    <h1>Detalles</h1>
  <div>
    <Alerta v-if="error">{{ error }}</Alerta>
  </div>
  <el-card shadow="always" class="card">
    <div class="gasto">
        <div class="contenido">
            <img
            :src="diccionarioIConos[gasto.categoria]"
            alt="icono gasto"
            class="icono"
          />
       
        <div class="detalles">
          <p><strong class="id">ID: </strong>{{gasto.id  }}</p>
        <p ><strong class="categoria">Categoría: </strong>{{ gasto.categoria }}</p>
        <p  ><strong class="nombre">Nombre: </strong>{{ gasto.nombre }}</p>
        <p><strong class="fecha">Fecha: </strong>{{formatearFecha(gasto.fecha ) }}</p>
        <p><strong class="descripcion">Descripción: </strong>{{ gasto.descripcion }}</p>  
        </div>
    </div>
        <p class="cantidad"><strong>Cantidad: </strong>{{formatearCantidad(gasto.cantidad) }}</p>
    </div>
    <div class="editar-eliminar">
        <el-button class="shake" @click="editarGasto(gasto)">Editar</el-button>
        <el-button class="shake" @click="eliminarGasto(gasto)" style="background-color: #C62540;">Eliminar</el-button>
    </div>

  </el-card>
</template>
<style scoped lang='scss'>
@import "../../../assets/styles/variables.scss";
@import "../../../assets/styles/boton.scss";
.card{
  width: 90%;
  max-width: 80rem;
  margin: 5rem;
  border-radius: 2rem;
}
.gasto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.icono {
  width: 6rem;
}
.contenido {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.detalles p {
  margin: 0 0 1.5rem 0;
}
.id{
    color: $gris-oscuro;
    font-size: 1.3rem;
}
.categoria {
  color: $gris-oscuro;
  font-size: 1.5rem;
  font-weight: 900;
}
.nombre {
  color: $gris-oscuro;
  font-size: 1.5rem;
 font-weight: bold;
  margin: 0;
}
.fecha {
  color: $gris-oscuro;
  font-size: 1.3rem;
  font-weight: bold;
 
}
.cantidad {
    color: $gris-oscuro;
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
}
.descripcion{
    color: $gris-oscuro;
    font-size: 1.3rem;
}
.editar-eliminar{
    display: flex;
    justify-content: space-around;
    
}
</style>