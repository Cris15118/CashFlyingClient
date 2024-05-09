<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="contenedor">
    <div class="error">
      <h1 class="statusCode">{{ error.statusCode }}</h1>
      <NuxtLink class="link" to="/">VUELVE A CASA POR FAVOR</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contenedor {
position: relative;
 display: flex;
 justify-content: center;
 margin-top: 90px;
 
}
.error{
    display: flex;
    align-items: end;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(183, 137, 137, 0.3);
    padding: 20px;
    height: 300px;
    width: 300px;
    background-image: url("./public/perro-triste.jpg") ;
    background-size: cover; 
    background-position: center;
    background-repeat: no-repeat;
}
.link{
    color: white;
    font-weight: bold;
    font-size: large;
    
}
.statusCode{
    color: crimson;
    animation-name: shake;
        -webkit-animation-name: shake;
        -moz-animation-name: shake;
    animation-duration: 2s;
        -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
    animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
}
</style>
