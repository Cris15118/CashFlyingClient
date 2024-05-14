<script setup lang='ts'>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePerfilStore } from '~/stores/perfilStore';
import { useAuthStore } from '~/stores/authStore';
import Alerta from '~/components/Alerta.vue';
import { uid } from 'uid';
import { storeToRefs } from 'pinia';

const {authenticated} = storeToRefs(useAuthStore())



interface Perfil{
  id: string,
  nombre:string,
  apellidos:string,
  email:string,
  edad:number,
  telefono:number,
  calle:string,
  numero:number,
  poblacion:string,
  provincia:string,
  pais:string
}


const router=useRouter()
const perfilStore =usePerfilStore()
const perfilId = router.currentRoute.value.params.id
const error= ref('')

const perfil: Ref<Perfil> = ref({
  id:uid(),
  nombre:'',
  apellidos:'',
  email:'',
  edad:'',
  telefono:'',
  calle:'',
  numero:'',
  poblacion:'',
  provincia:'',
  pais:''
})

//rellena el componente con através de email de usuaio
onMounted(()=>{
  const id:string = Array.isArray(perfilId)? perfilId[0] : perfilId
  const perfilUsuario = perfilStore.getUsuarioById(id)
  if(perfilUsuario){
    Object.assign(perfil.value, perfilUsuario)
  }else{
    error.value = `No se encontró ningún Usuario Agrega tu Perfil`
  }
})
//Redirecionar vista editar perfil usuario
const editarPerfil = (perfil:Perfil)=>{
  router.push("/perfil/editar/" + perfil.id)
}
const logout = async ()=>{
  const {error} = await supaAuth.signOut()
  if(error){
    error.value = error.message
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }else{
    return navigateTo('/Identity/register')
  }
}
const eliminarPerfil = (perfil:string)=>{
  perfilStore.deletePerfil(perfil.id)
  perfiles.value = perfilStore.perfil
  //TODO hacer que si se elimina el perfil tambien se elimine de la base de datos
  logout()
}
const perfiles = ref(perfilStore.perfil)

</script>

<template>
  <h1 class="encabezado">Perfil del Usuario</h1>
  <div class="contenedor">
  
    <Alerta v-if="error">{{ error }}</Alerta>

  <el-card shadow="always">
    <el-row>
      <el-col :span="12">
 
        <p><strong>Nombre: </strong>{{perfil.nombre}}</p>
        <p ><strong>Apellidos: </strong>{{ perfil.apellidos }}</p>
        <p><strong>Email: </strong>{{ perfil.email }}</p>
        <p  ><strong >Edad: </strong>{{ perfil.edad }}</p>
        <p><strong>Teléfono: </strong>{{perfil.telefono}}</p>
      </el-col>
      <el-col :span="12">
        <p><strong>Calle: </strong>{{ perfil.calle }}</p>  
        <p><strong>Número: </strong>{{ perfil.numero }}</p>  
        <p><strong>Población: </strong>{{ perfil.poblacion }}</p>  
        <p><strong>Provincia: </strong>{{ perfil.provincia }}</p>  
        <p><strong>Pais: </strong>{{ perfil.pais }}</p>  
       
      </el-col>
    </el-row>
    <div >
        <el-button class="shake" @click="editarPerfil(perfil)" >Editar Perfil</el-button>
        <el-button class="shake" @click="eliminarPerfil(perfil)" style="background-color: #C62540;">Eliminar</el-button>
    </div>
</el-card>
</div>
</template>
<style scoped lang='scss'>
@import "../../assets/styles/contenedor.scss";
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/encabezado.scss"

</style>