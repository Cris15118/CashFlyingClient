<script setup lang="ts"></script>

<template>
  <h1 class="encabezado" style="font-style: italic">CASHFLYING</h1>
  <div class="display">
    <div class="content">
      <h2 class="subtitulo">Control Mensual</h2>
      <p class="parrafo">
        ¿Alguna vez has intentado hacer un seguimiento de tu dinero? Entonces
        sabrás que puede ser frustante si no se utilizan las herramientas
        adecuadas. CashFlying te ayudará desglosando tus gastos de una manera
        sencilla, intuitiva y comprensible
      </p>
    </div>
    <img
      class="foto"
      src="../public/Credit card-bro.png"
      alt="foto aplicación"
    />
  </div>
  <div class="display">
    <img class="foto" src="../public/Revenue-bro.png" alt="foto ahorros" />
    <div class="content">
      <h2 class="subtitulo">Agrege Registros en un Instante</h2>
      <p class="parrafo">
        Categorías seleccionadas cuidadosamente para un facil seguimiento de tus
        gastos. Describe y toma nota para no tener sustos a final de mes. <br />
        Modifica los gastos tantas veces quieras según tus necesidades. <br />
        Filtra por categorías para obtener visualmente donde van la mayoria de
        tus gastos.
      </p>
    </div>
  </div>
  <div class="display">
    <div class="content">
      <h2 class="subtitulo">Sin Sorpresas a final de mes</h2>
      <p class="parrafo">
        Ten pleno conocimiento de tus gastos y el dinero disponible a final de
        mes.<br />Ahorra o invierte tu dinero. Ahora podrás hacerlo al conocer
        exactamente tu situación al cabo del mes.
      </p>
    </div>
    <img
      class="foto"
      src="../public/Investment data-bro.png"
      alt="foto ahorros"
    />
  </div>
  <h2 class="subtitulo">Opiniones de los Usuarios</h2>
  <h1 class="encabezado">Lo que piensan los usuarios sobre CashFlying</h1>
  <div class="fondo">
    <div class="colocar-opinion">
      <div class="opinion">
        <h3 class="nombre">Raquel</h3>
        <Icon
          name="i-heroicons:hand-thumb-up-16-solid"
          size="2rem"
          class="icon"
        ></Icon>
        <p class="review">
          He estado buscando durante años las mejores aplicaciones de
          administracion de gastos y por fin he encontrado CashFlying. <br />
          100% recomendable! <br />
          Estoy encantada con ella!
        </p>
      </div>
      <div class="opinion">
        <h3 class="nombre">Alfredo</h3>
        <Icon
          name="i-heroicons:hand-thumb-up-16-solid"
          size="2rem"
          class="icon"
        ></Icon>
        <p class="review">
          Aplicación limpia, clara y muy útil. <br />Puedes registrar cualquier
          gasto que desees. <br />La interfaz de usuario es facil de usar.
          <br />Recomiento esta aplicación a quien le guste realizar un
          seguimiento de sus gastos
        </p>
      </div>
      <div class="opinion">
        <h3 class="nombre">Mercedes</h3>
        <Icon
          name="i-heroicons:hand-thumb-up-16-solid"
          size="2rem"
          class="icon"
        ></Icon>
        <p class="review">
          ¡Esta aplicación es increible! <br />
          Te ayuda a presupuestar tu dinero, ver en tiempo real lo que estás
          gastando y el dinero que te queda disponible en ese mes. <br />Siento
          que por fin encontré la aplicación de gestion de gastos perfecta.
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/encabezado.scss";
@import "../assets/styles/subtitulo.scss";
.content {
  text-align: left;
  max-width: 30rem;
  margin: 3rem 9rem;
  letter-spacing: 0.2rem;
}
.parrafo {
  font-size: 1.8rem;
  font-style: italic;
}
.foto {
  width: 20rem;
  height: 25rem;
  margin: 3rem 9rem;
}
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.fondo {
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: 10px 10px 15px -3px rgba(0, 0, 0, 0.2);
  background-color: $primary-color;
  width: 85%;
  height: 20rem;
  margin: 5rem 10rem;
}
.opinion {
  border: 1px solid black;
  border-radius: 1rem;
  background-color: $background-color;
  width: 25%;
  height: 31rem;
}
.colocar-opinion {
  display: flex;
  justify-content: space-around;
  margin: 5rem;
}
.icon {
  color: $secundary-color;
  margin-left: 2rem;
  
}
.nombre{
  text-align: justify;
  margin: 2rem;
  font-size: xx-large;
  color: $gris-oscuro;
  letter-spacing: 0.1rem;
}
.review{
  text-align: justify;
  font-size: larger;
  padding: 1rem;
}
</style>
