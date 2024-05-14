<script setup lang='ts'>
import Navbar from '~/components/Navbar.vue';

</script>

<template>
    <Navbar></Navbar>
  
  <slot />
</template>
<style lang='scss'>
@import "../assets/styles/variables.scss";
body{
  background-color:$background-color;
    margin: 0;
    height: 100%;
    font-family: Sedan;
    font-size: 1.3rem;
}


</style>