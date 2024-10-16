<script>
export default {
  name: 'MainPage',
  data() {
    return {
      title: 'Экскурсии по всему миру',
      nameExcursion: 'Введите название экскурсии',
      nameTown: 'Выбрать город'
    }
  },
  methods: {
    getExcursion(str) {
      this.nameExcursion = str
    },
    getExcursionByTown(str) {
      this.nameTown = str
    }
  }
}

</script>

<template>
<div>
  <h1>{{ title }}</h1>
  <input  type="text" v-on:keyup="getExcursion()" value="this.nameExcursion">
  <input type="text" v-on:keyup="getExcursionByTown()" value="this.nameTown">
</div>
</template>

<style scoped>

</style>