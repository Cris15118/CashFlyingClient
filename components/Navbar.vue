<script lang="ts" setup>
import { ref } from "vue";
import Logo from "./Logo.vue";


const supaAuth = useSupabaseClient().auth
const user = useSupabaseUser()
const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  
};

const logout = async ()=>{
  const {error} = await supaAuth.signOut()
  if(error){
    error.value = error.message
    setTimeout(()=>{
      error.value=''
    },3000)
    return
  }else{
    return navigateTo('/')
  }
}
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
  <NuxtLink to="/"> <el-menu-item>
      <Logo/>
    </el-menu-item></NuxtLink>
  <div v-if="!user">
      <NuxtLink to="/"> <el-menu-item index="0">
      <Icon name="dashicons:admin-home" size="1.5em" class="fuentes"></Icon>
      <p class="fuentes">Home</p>
      </el-menu-item></NuxtLink>
  </div>
   <div class="navbar" v-else>
   <NuxtLink to="/gasto/agregar-gastos"><el-menu-item index="1">
    <Icon name="heroicons-solid:clipboard-list" size="1.5rem" class="fuentes"></Icon>
    <p class="fuentes">Añadir Gastos</p>

   </el-menu-item>

   </NuxtLink>
    <NuxtLink to="/gasto/listado-gastos"><el-menu-item index="2">
      <Icon name="heroicons-solid:clipboard-list" size="1.5em" class="fuentes"></Icon>
      <p class="fuentes">Listado Gastos</p>
    </el-menu-item></NuxtLink>
   </div>
    
    <div class="login" v-if="!user" >
    <Icon name="fa6-solid:arrow-right-to-bracket" style="margin-top: 20;" class="fuentes"></Icon>
    <NuxtLink to="/auth/login"><el-menu-item index="3" class="fuentes">Login</el-menu-item></NuxtLink>
    </div>
    <div class="login" v-else >
     <NuxtLink to="/perfil/agregar-perfil"><p >Bienvenido: {{ user.email }}</p></NuxtLink> 

    <Icon name="fa6-solid:arrow-right-from-bracket" style="margin-top: 20;" class="fuentes"></Icon>
    <NuxtLink to="/"><el-menu-item index="3" class="fuentes" @click="logout">Salir</el-menu-item></NuxtLink>
    </div>
    
  </el-menu>
</template>
<style scoped lang="scss">
@import "../assets/styles/variables.scss";
.login {
  display: flex;
  margin-left: auto;
}
.fuentes{
  color: $primary-color;
  font-size: 1.2rem;
}
.navbar{
  display: flex;
}
p{
  margin: 1rem;
  color: $primary-color;
  text-decoration: underline;
  font-size: 1rem;
}
</style>
