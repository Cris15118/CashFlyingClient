<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/authStore';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue'
import Alerta from '~/components/Alerta.vue';
import type { FormProps } from 'element-plus'

const authStore = useAuthStore()
const {authenticated} = storeToRefs(useAuthStore()) 
const error = ref('')
const router = useRouter()
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

const register = async ()=>{
  await authStore.registerUser(user.value)
 router.push('/Identity/Login')
 }
</script>

<template>
  <h1 class="encabezado">Bienvenido a CashFlying</h1>
  <div class="contenedor" style="width: 30rem;">
    <h2 class="subtitulo">REGISTRO</h2>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="user"
    @submit.prevent="register"
    style="width: 100%;"
  >
    <el-form-item label="Email">
      <el-input  type="email" v-model="user.email"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="user.password"/>
    </el-form-item>
    <el-form-item>
        <el-button class="shake" style="width: 100%" @click="register">Resgistro</el-button>
      </el-form-item>
      <el-text size="large">Ya tienes cuenta? </el-text><el-link href="/auth/login" >Logueate!</el-link>
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