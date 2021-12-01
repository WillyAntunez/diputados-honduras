<template>
  <div id="app">
    <div class="main-container">
      <Header />
      <Diputados />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Diputados from './components/Diputados.vue'

export default {
  name: 'App',
  components: {
    Header,
    Diputados
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

  body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  main-container {
    width: 100%;
  }
</style>
