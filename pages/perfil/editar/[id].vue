<script setup lang='ts'>
import { usePerfilStore } from '~/stores/perfilStore';
import { useAuthStore } from '~/stores/authStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
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

const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('top')
const perfilStore = usePerfilStore()
const router = useRouter()
const error = ref('')
const perfilId = router.currentRoute.value.params.id
console.log("PerfilID" + perfilId)

const perfil: Ref<Perfil> = ref({
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


onMounted(()=>{
  const id:string = Array.isArray(perfilId) ? perfilId[0] : perfilId
  const perfilSeleccionado = perfilStore.getUsuarioById(id)
  if(perfilSeleccionado){
    Object.assign(perfil.value, perfilSeleccionado)
    
  }else{
    error.value ="Usuario no existe"
  }
})

//Actualizar los datos del perfil
const actualizarPerfil = ()=>{
    if(!perfil.value.nombre || !perfil.value.apellidos || !perfil.value.email || !perfil.value.edad || !perfil.value.telefono || !perfil.value.calle || !perfil.value.numero || !perfil.value.poblacion || !perfil.value.provincia || !perfil.value.pais.includes('')){
    error.value ='Todos los campos son Obligatorios'
    setTimeout(()=>{
      error.value=''
    },5000)
    return
  }
  //validar el numero de telefono
  if(perfil.value.telefono.toString().length < 9){
    error.value='Teléfono incorrecto'
    setTimeout(()=>{
      error.value=''
    }, 5000)
    return
}else{
    perfilStore.UpdatePerfil(perfil.value)
    router.push("/perfil/perfil-usuario")
}
}

</script>

<template>
  <h1 class="encabezado">Editar Perfil de Usuario</h1>
 
  <div class="contenedor">
  <el-form
    ref="form"
    style="max-width: 100%"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
    @submit.prevent="actualizarPerfil"
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
    <el-form-item>
      <el-button style="width: 100%;" class="shake" @click="actualizarPerfil(perfil)">Actualizar Perfil</el-button>

    </el-form-item>
  </el-form>
</div>
</template>
<style scoped lang='scss'>
@import "../../../assets/styles/contenedor.scss";
@import "../../../assets/styles/variables.scss";
@import "../../../assets/styles/boton.scss";
@import "../../../assets/styles/encabezado.scss";
.el-row{
  margin: 3rem;
}
.el-col{
  padding-right: 5rem;
}
</style>