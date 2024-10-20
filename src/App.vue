<template>
  <img alt="Sputnik logo" class="logo" src="./assets/Logo.svg">
  <MainPage/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import MainPage from "@/components/MainPage/MainPage.vue";

@Options({
  components: {
    MainPage,
  },
})

export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  .logo {
    margin-top: 60px;
  }
}
</style>
