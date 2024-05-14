<script setup lang='ts'>
import { useAuthStore } from '~/stores/authStore';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import Alerta from '~/components/Alerta.vue';
import type { FormProps } from 'element-plus'

const {authenticateUser} = useAuthStore()
const {authenticated} = storeToRefs(useAuthStore())
const router = useRouter()
const error = ref('')
const labelPosition = ref<FormProps['labelPosition']>('top')

interface User{
    id:string,
    email:string,
    password: string
}

const user = ref({
  id: '',
  email: '',
  password: '',
})
const login = async () => {

 await authenticateUser(user.value)
 if(authenticated){
  router.push('/')
 }else{
  error.value = "Usuario o contraseña incorrectos"
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
    :model="user"
    @submit.prevent="login"
    style="width: 100%;"
  >
    <el-form-item label="Email">
      <el-input  type="email" v-model="user.email"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="user.password"/>
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