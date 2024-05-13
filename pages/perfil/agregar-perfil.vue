<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { usePerfilStore } from '~/stores/perfilStore';
import { useAuthStore } from '~/stores/authStore';
import Alerta from '~/components/Alerta.vue';
import type { ComponentSize, FormProps } from 'element-plus'
import { uid } from 'uid';
import { storeToRefs } from 'pinia';

const {authenticated} = storeToRefs(useAuthStore())


interface Perfil{
  id: string ,
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
const PerfilStore = usePerfilStore()
const router = useRouter()
const error = ref('')

const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('top')

const perfil = reactive<Perfil>({
  id: uid(),
  nombre:'',
  apellidos:'',
  email: '',
  edad:'',
  telefono:'',
  calle:'',
  numero:'',
  poblacion:'',
  provincia:'',
  pais:''
})

//Agregar datos del perfil
const agregarPerfil = ()=>{
  const {nombre,apellidos,email,edad,telefono,calle,numero,poblacion,provincia,pais} = perfil
  //validar que ningun campo esté vacío
  if([nombre,apellidos,email,edad,telefono,calle,numero,poblacion,provincia,pais].includes('')){
    error.value ='Todos los campos son Obligatorios'
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }
  //validar el numero de telefono
  if(telefono.length < 9){
    error.value='Teléfono incorrecto'
    setTimeout(()=>{
      error.value=''
    }, 3000)
    return
  }else{
    PerfilStore.añadirPerfil(
      perfil.nombre,
      perfil.apellidos,
      perfil.email,
      perfil.edad,
      perfil.telefono,
      perfil.calle,
      perfil.numero,
      perfil.poblacion,
      perfil.provincia,
      perfil.pais
    )
  }
  router.push('/perfil/perfil-usuario')
}
</script>

<template>
  <h1>Agrega tu Perfil de Usuario</h1>
  <div class="contenedor">
  <el-form
    ref="form"
    style="max-width: 100%"
    :model="perfil"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
    @submit.prevent="agregarPerfil"
  >
  <Alerta v-if="error">{{ error }}</Alerta>
  <el-row>
    <el-col :span="12">
  <el-form-item label="Nombre">
      <el-input placeholder="Escribe tu Nombre" v-model="perfil.nombre"  />
    </el-form-item>
    <el-form-item label="Apellidos">
      <el-input placeholder="Escribe tus Apellidos" v-model="perfil.apellidos" />
    </el-form-item>
    <el-form-item prop="email" label="Email" :rules="[
        {
          type: 'email',
          message: 'Email incorrecto',
        },
      ]">
      <el-input placeholder="Escribe tu Email" type="email" v-model="perfil.email" />
    </el-form-item>
  <el-form-item label="Edad" prop="age"
      :rules="[
        { type: 'number', message: 'Debería ser un número' },
      ]">
      <el-input placeholder="Escribe tu Edad" type="number" v-model.number="perfil.edad"  />
    </el-form-item>
    <el-form-item label="telefono" >
      <el-input placeholder="XXX-XX-XX-XX" v-model.number="perfil.telefono" type="number" />
    </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item label="Calle">
      <el-input placeholder="Escribe tu Calle" v-model="perfil.calle"  />
    </el-form-item>
    <el-form-item label="Numero">
      <el-input placeholder="Escribe tu Numero de Domicilio" v-model.number="perfil.numero" type="number" />
    </el-form-item>
    <el-form-item label="Población">
      <el-input placeholder="Población" v-model="perfil.poblacion" />
    </el-form-item>
    <el-form-item label="Provincia">
      <el-input placeholder="Provincia" v-model="perfil.provincia"  />
    </el-form-item>
    <el-form-item label="Pais">
      <el-input placeholder="Pais" v-model="perfil.pais" />
    </el-form-item>
  </el-col>
  </el-row>
    <div class="crear-ver">
      <el-button class="shake" @click="agregarPerfil">Crear Perfil</el-button>
     <router-link  to="/perfil/perfil-usuario"> <el-button class="shake" @click="agregarPerfil" style="background-color: #409EFF;">ver Perfil</el-button></router-link>
      
    </div>
  </el-form>
</div>
</template>
<style scoped lang='scss'>
@import "../assets/styles/variables.scss";
@import "../assets/styles/boton.scss";
@import "../assets/styles/contenedor.scss";
.el-row{
  margin: 3rem;
}
.el-col{
  padding-right: 5rem;
}
.crear-ver{
  display: flex;
  justify-content: space-around;
}
</style>