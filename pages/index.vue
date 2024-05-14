<script setup lang='ts'>


</script>

<template>
  <h1 class="encabezado">GESTION DE GASTOS</h1>
  <div class="justificado">
  <div class="content">
    <h2 class="subtitulo" >Control Mensual</h2>
    <p>¿Alguna vez has intentado hacer un seguimiento de tu dinero?</p>
    <p>Entonces sabrá que puede ser frustante si no se utilizan las herramientas adecuadas. CashFlying te ayudará desglosando tus gastos de una manera sencilla, intuitiva y comprensible</p>
  </div>
  <div>
    <img class="foto" src="../public/Credit card-bro.png" alt="foto aplicación">
  </div>
  </div>   
 
</template>
<style scoped lang='scss'>
@import "../assets/styles/variables.scss";
@import "../assets/styles/encabezado.scss";
@import "../assets/styles/subtitulo.scss";
.content{
  text-align: justify;
  width: 30rem;
  margin: 10rem;
}
p{
  font-size: 1.8rem;
  font-style: italic;
}
.foto{
  width: 25rem;
  height: 27rem;
  margin: 10rem;
}
.justificado{
  display: flex;
}
</style>