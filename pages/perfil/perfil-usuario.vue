<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePerfilStore } from "~/stores/perfilStore";
import { useAuthStore } from "~/stores/authStore";
import { uid } from "uid";
import { storeToRefs } from "pinia";

const { authenticated } = storeToRefs(useAuthStore());

interface Perfil {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  edad: number;
  telefono: number;
  calle: string;
  numero: number;
  poblacion: string;
  provincia: string;
  pais: string;
}

const router = useRouter();
const authStore = useAuthStore();
const perfilStore = usePerfilStore();
const perfilId = router.currentRoute.value.params.id;

const perfil: Ref<Perfil> = ref({
  id: uid(),
  nombre: "",
  apellidos: "",
  email: "",
  edad: "",
  telefono: "",
  calle: "",
  numero: "",
  poblacion: "",
  provincia: "",
  pais: "",
});

//Redirecionar vista editar perfil usuario
const editarPerfil = (perfil: Perfil) => {
  router.push("/perfil/editar/" + perfil.id);
};
//Funcion que desloguea al usuario
const logout = () => {
  authStore.logoutUser();
  router.push("/");
};
//Funcion para eliminar el perfil de usuario
const eliminarPerfil = (perfil: string) => {
  if(confirm("¿Desea Borrar su Perfil?")){
      perfilStore.deletePerfil(perfil.id);
  perfiles.value = perfilStore.perfil;
  }
  // Si elimina el perfil sale de la app
  logout();
};
const perfiles = ref(perfilStore.perfil);
</script>

<template>
  <h1 class="encabezado">Perfil del Usuario</h1>
  <div class="contenedor">
    <h2 class="subtitulo">{{ perfiles.length > 0 ? 'Tus Datos' : 'Por Favor Añade tu Perfil'}}</h2>
    <el-card shadow="always" v-for="perfil in perfiles">
      <el-row>
        <el-col :span="12">
          <p><strong>Nombre: </strong>{{ perfil.nombre }}</p>
          <p><strong>Apellidos: </strong>{{ perfil.apellidos }}</p>
          <p><strong>Email: </strong>{{ perfil.email }}</p>
          <p><strong>Edad: </strong>{{ perfil.edad }}</p>
          <p><strong>Teléfono: </strong>{{ perfil.telefono }}</p>
        </el-col>
        <el-col :span="12">
          <p><strong>Calle: </strong>{{ perfil.calle }}</p>
          <p><strong>Número: </strong>{{ perfil.numero }}</p>
          <p><strong>Población: </strong>{{ perfil.poblacion }}</p>
          <p><strong>Provincia: </strong>{{ perfil.provincia }}</p>
          <p><strong>Pais: </strong>{{ perfil.pais }}</p>
        </el-col>
      </el-row>
      <div class="botones">
        <el-button class="shake" @click="editarPerfil(perfil)" style="width: 50%"
          >Editar Perfil</el-button
        >
        <el-button
          class="shake"
          @click="eliminarPerfil(perfil)"
          style="background-color: #c62540;width: 50%"
          >Eliminar</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/contenedor.scss";
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/encabezado.scss";
@import "../../assets/styles/subtitulo.scss";
.botones{
  display: flex;
  justify-content: space-around;
  margin: 3rem;
  gap: 2rem;
}
.el-row{
  margin: auto 8rem;
  
}

</style>
