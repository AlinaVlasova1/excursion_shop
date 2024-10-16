<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Logo.svg">
    <MainPage title="Экскурсии по всему миру"/>
  </div>
</template>

<script type="module">
import MainPage from "./components/MainPage.vue";

export default {
  name: 'app',
  components: {
    MainPage,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
