<script setup lang='ts'>
import { reactive, ref } from 'vue'
import Alerta from '~/components/Alerta.vue';
import type { FormProps } from 'element-plus'

definePageMeta({
  middleware:'unauth',
})

const supaAuth = useSupabaseClient().auth
const error = ref('')
const labelPosition = ref<FormProps['labelPosition']>('top')

const credentials = reactive({
  email: '',
  password: '',
})
const login = async ()=>{
  const {error} = await supaAuth.signUp(credentials)
  if(error){
    alert(error.message)
  }else{
    return navigateTo('/')
  }

}
</script>

<template>
  <h1>Bienvenido a CashFlying</h1>
  <div class="contenedor" style="width: 30rem;">
    <p class="login">LOGIN</p>
    <Alerta v-if="error">{{ error }}</Alerta>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="credentials"
    @submit.prevent="login"
    style="width: 100%;"
  >
    <el-form-item label="Email">
      <el-input  type="email" v-model="credentials.email"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="credentials.password"/>
    </el-form-item>
    <el-form-item>
        <el-button class="shake" style="width: 100%" @click="login">Login</el-button>
      </el-form-item>
      <el-text size="large">Aún no tienes cuenta? </el-text><el-link href="/auth/register">Regístrate</el-link>
  </el-form>
</div>
</template>
<style scoped lang='scss'>
@import "../../assets/styles/contenedor.scss";
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/boton.scss";
.login{
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color:$secundary-color ;
  margin: 0 0 0.8rem 0;
}
.el-link {
  margin-right: 8px;
  font-size: large;
  color: $secundary-color;
}


</style>