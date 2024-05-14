<script setup lang="ts">
import { computed, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatearCantidad, formatearFecha } from "~/helpers";
import { useGastoStore } from "~/stores/gastoStore";
import { useAuthStore } from "~/stores/authStore";
import { usePresupuestoStore } from "~/stores/presupuestoStore";
import Alerta from "~/components/Alerta.vue";
import IconoCasa from "../public/img/icono_casa.svg";
import IconoComida from "../public/img/icono_comida.svg";
import IconoGastos from "../public/img/icono_gastos.svg";
import IconoOcio from "../public/img/icono_ocio.svg";
import IconoSalud from "../public/img/icono_salud.svg";
import IconoSuscripciones from "../public/img/icono_suscripciones.svg";
import { listarGastos } from "~/services/gastosServices.js";
import { storeToRefs } from 'pinia';


const {authenticated} = storeToRefs(useAuthStore())


// Diccionario de iconos para acceder mas facilmente
const diccionarioIConos = {
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};
interface Gasto {
  id: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  descripcion: string;
  fecha: string;
}

const gastoStore = useGastoStore();
const presupuestoStore = usePresupuestoStore();
const gastos = ref(gastoStore.gastos);
const categoriaSeleccionada= ref('')
const error = ref("");
const router = useRouter();



// Gastado: función que da la suma de todos los gastos
const gastado = computed(() => {
  return gastoStore.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
});

// Disponible: esta función ofrece la cantidad de dinero que queda restando al presupuesto lo gastado en total
const disponible = computed(() => {
  return presupuestoStore.saldo - gastado.value;
});


// Verificar el presupuesto automáticamente cada vez que cambio los gastos
watchEffect(() => {
  if (gastado.value > presupuestoStore.saldo) {
    error.value = "¡Cuidado! Tus gastos son superiores a tus ingresos.";
  }
});

// Funciones de redirección
const verDetalles = (gasto: Gasto) => {
  router.push("/gasto/detalles/" + gasto.id);
};
const añadirPresupuesto = () => {
  router.push("/presupuesto/agregar-presupuesto");
};

//Volver el presupuesto y los gastos a 0
const resetApp = () => {
  if (confirm("Desea Reiniciar el presupuesto y los gastos")) {
    Object.assign(gastoStore, { gastos: [] });
    presupuestoStore.saldo = 0;
  }
  router.push("/");
};

//Filtrar gastos por categoria
const gastosFiltrados = computed(()=>{
    if(categoriaSeleccionada.value){
       return gastoStore.getGastoByCategoria(categoriaSeleccionada.value) 
    }else{
        return gastoStore.gastos
    }    
})
</script>

<template>
  <h1 class="encabezado">Listado de Gastos</h1>
  <div class="contenedor">
    <el-card v-if="presupuestoStore.saldo === 0">
      <h2 class="subtitulo">No hay Saldo Establecido</h2>
      <el-button class="shake" @click="añadirPresupuesto" style="width: 100%"
        >agrega un presupuesto</el-button
      >
    </el-card>
    <div v-else>
      <Alerta v-if="error">{{ error }}</Alerta>

      <p>
        Presupuesto:
        <span>{{ formatearCantidad(presupuestoStore.saldo) }}</span>
      </p>
      <p>
        Disponible: <span>{{ formatearCantidad(disponible) }}</span>
      </p>
      <p>
        Gastado: <span>{{ formatearCantidad(gastado) }}</span>
      </p>
      <div class="btn-presupuesto">
        <router-link to="/gasto/agregar-gastos"
          ><el-button class="shake">Agregar Gasto</el-button></router-link
        >
        <el-button
          class="shake"
          @click="resetApp"
          style="background-color: #85c1e9"
          >Reset - App</el-button
        >
      </div>
    </div>
  </div>
  <div class="contenedor">
    <el-form
    style="width: 100%;"
    size="large"
    >
    <el-form-item label="Filtrar Gasto" size="large">
        <el-select placeholder="-- Seleccionar --" v-model="categoriaSeleccionada">
          <el-option label="--seleccionar--" value="" />
          <el-option label="Casa" value="casa" />
          <el-option label="Gastos Varios" value="gastos" />
          <el-option label="Ocio" value="ocio" />
          <el-option label="Comida" value="comida" />
          <el-option label="Salud" value="salud" />
          <el-option label="Suscripciones" value="suscripciones" />
        </el-select>
      </el-form-item>
</el-form>
  </div>
  <div class="card">
  <h2 class="subtitulo">{{ gastosFiltrados.length > 0 ? "Gastos" : "No hay Gastos" }}</h2>

    <el-card
      style="border-radius: 2.5rem; margin: 1rem"
      v-for="gasto in gastosFiltrados"
      :key="gasto.id"
      shadow="always"
    >
      <div class="gasto">
        <div class="contenido">
          <img
            :src="diccionarioIConos[gasto.categoria]"
            alt="icono gasto"
            class="icono"
          />
          <div class="detalles">
            <p class="categoria">{{ gasto.categoria }}</p>
            <p class="nombre">{{ gasto.nombre }}</p>
            <p class="fecha">Fecha: {{ formatearFecha(gasto.fecha) }}</p>
          </div>
          <div>
            <el-button
              class="shake"
              @click="verDetalles(gasto)"
              style="margin-left: 11rem; background-color: #00afff"
              >ver</el-button
            >
          </div>
        </div>
        <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/contenedor.scss";
@import "../../assets/styles/encabezado.scss";
@import "../../assets/styles/subtitulo.scss";
.btn-presupuesto {
  display: flex;
  justify-content: space-evenly;
}
.card {
  width: 90%;
  max-width: 80rem;
  margin: 5rem;
}
.gasto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.icono {
  width: 5rem;
}
.contenido {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.detalles p {
  margin: 0 0 1rem 0;
}
.categoria {
  color: $gris-oscuro;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 900;
}
.nombre {
  color: $gris-oscuro;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}
.fecha {
  color: $gris-oscuro;
  font-size: 1.3rem;
  font-weight: 800;
}
.cantidad {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
}
</style>
