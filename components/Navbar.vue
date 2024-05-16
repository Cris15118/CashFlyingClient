<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Logo from "./Logo.vue";

const authStore = useAuthStore()
const {authenticated} = storeToRefs(useAuthStore())
const router = useRouter()
const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
};


const logout =  ()=>{
  authStore.logoutUser()
  router.push('/')
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
  <div v-if="!authenticated">
      <NuxtLink to="/"> <el-menu-item index="0">
      <Icon name="dashicons:admin-home" size="1.5em" class="fuentes"></Icon>
      <p class="fuentes">Home</p>
      </el-menu-item></NuxtLink>
  </div>
   <div class="navbar" v-else>
   <NuxtLink to="/gasto/agregar-gastos"><el-menu-item index="1">
    <Icon name="i-heroicons:document-plus-solid" size="1.5rem" class="fuentes"></Icon>
    <p class="fuentes">Añadir Gastos</p>

   </el-menu-item>

   </NuxtLink>
    <NuxtLink to="/gasto/listado-gastos"><el-menu-item index="2">
      <Icon name="heroicons-solid:clipboard-list" size="1.5em" class="fuentes"></Icon>
      <p class="fuentes">Listado Gastos</p>
    </el-menu-item></NuxtLink>
   </div>
    
    <div class="login" v-if="!authenticated" >
   
    <NuxtLink to="/Identity/Login"><el-menu-item index="3" class="fuentes">
      <Icon name="fa6-solid:arrow-right-to-bracket" style="margin-top: 2;" class="fuentes"></Icon>
     <p class="fuentes">Login</p> 
    </el-menu-item></NuxtLink>
    </div>
    <div class="login" v-else >
      
     <NuxtLink to="/perfil/agregar-perfil"><el-menu-item index="4" class="fuentes"><Icon name="i-heroicons:user-plus-16-solid" style="margin:15 8;" size="1.5em" class="fuentes" ></Icon><p class="fuentes">Añade tu Perfil</p></el-menu-item></NuxtLink> 

    
    <NuxtLink to="/"><el-menu-item index="5" class="fuentes" @click="logout"><Icon name="fa6-solid:arrow-right-from-bracket" style="margin-top: 2;" class="fuentes"></Icon><p class="fuentes">Salir</p></el-menu-item></NuxtLink>
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
  font-size: 1.2rem;
}
</style>
