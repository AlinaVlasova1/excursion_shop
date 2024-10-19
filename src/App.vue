<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Logo.svg">
    <MainPage title="Экскурсии по всему миру"/>
  </div>
</template>

<script type="module">
import MainPage from "./components/MainPage/MainPage.vue";

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
  height: 100%;

  img {
    margin-top: 60px;
  }

  MainPage {
    height: 100%;
  }
}
</style>
