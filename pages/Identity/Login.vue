<script setup lang='ts'>
import { useAuthStore } from '~/stores/authStore';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import Alerta from '~/components/Alerta.vue';


const {authenticateUser} = useAuthStore()
const {authenticated} = storeToRefs(useAuthStore())
const router = useRouter()
const error = ref('')
const labelPosition = ref<FormProps['labelPosition']>('top')

interface Usuario{
    id:string,
    email:string,
    password: string
}

const usuario = ref({
  id: '',
  email: '',
  password: '',
})
//Expresión regular para validar email
const isValidEmail = (email) =>{
   const emailRegex =  /^[^\s@]+@[^\s@]+\.(es|com)$/
   return emailRegex.test(email)
 }
 //Expresión regular para validar password
 const isValidPassword = (password) => {
  const passwordRegex = /^.{8,}$/
  return passwordRegex.test(password)
 }
 //Función de login de usuarios
const login = async () => {
  //Validar que los campos son obligatorios
  if(!usuario.value || !usuario.value.email || !usuario.value.password){
  error.value= "Todos los campos son obligatorios"
  setTimeout(()=>{
     error.value=''
  }, 3000)
  return
 }
 //Valida que el email sea correcto
  if(!isValidEmail(usuario.value.email)){
   error.value="Email Incorrecto"
   setTimeout(()=>{
      error.value=''
   }, 3000)
   return
  }
  //valida que el password contenga al menos 8 caracteres
  if(!isValidPassword(usuario.value.password)){
   error.value="El Password debe contener al menos 8 caracteres"
   setTimeout(()=>{
      error.value=''
   }, 4000)
   return
  }
  //Logueo de usuario
  try{
    await authenticateUser(usuario.value)
 if(authenticated){
  router.push('/')
 }else{
  error.value = "Usuario o contraseña incorrectos"
 }
  }
  catch(error){
    console.log(error)
  }
 
}
</script>

<template>
  <h1 class="encabezado">Bienvenido a CashFlying</h1>
  <div class="contenedor" style="width: 30rem;">
    <h2 class="subtitulo">LOGIN</h2>
    <Alerta v-if="error">{{ error }}</Alerta>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="usuario"
    @submit.prevent="login"
    style="width: 100%;"
  >
    <el-form-item label="Email">
      <el-input  type="email" v-model="usuario.email"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="usuario.password"/>
    </el-form-item>
    <el-form-item>
        <el-button class="shake" style="width: 100%" @click="login">Login</el-button>
      </el-form-item>
      <el-text size="large">Aún no tienes cuenta? </el-text><el-link href="/Identity/register">Regístrate</el-link>
  </el-form>
</div>
</template>
<style scoped lang='scss'>
@import "../../assets/styles/contenedor.scss";
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
@import "../../assets/styles/encabezado.scss";
@import "../../assets/styles/subtitulo.scss";
.el-link {
  margin-right: 8px;
  font-size: large;
  color: $secundary-color;
}


</style>