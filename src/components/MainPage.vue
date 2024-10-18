<script>
// import axios from "core-js/client/core";
import axios from 'axios'

export default {
  name: 'MainPage',
  data() {
    return {
      title: 'Экскурсии по всему миру',
      nameExcursion: 'Введите название экскурсии',
      nameTown: 'Выбрать город',
      arrExcursion: [],
      selectItem: null,
      searchName: '',
      isVisible: false,
      citysArr: []
    }
  },
  methods: {
    getExcursion(str) {
      this.nameExcursion = str
    },
    getExcursionByTown(str) {
      this.nameTown = str
    },
    getCities() {
      this.citysArr =  axios
          .get(
              `https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=${encodeURIComponent('frontend@sputnik8.com')}`,
              {
                headers: {
                  "Content-Type" : "application/json",
                  // 'Access-Control-Allow-Origin': "*"
                }
              })
          .then(response => {
            return response
          })
    }
  },
  mounted() {
    // fetch('https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com'
    //     , {mode: 'no-cors'})
    //     .then(res => {
    //       console.log('res.json', JSON.parse(res))
    //       res.json
    //     })
    //     .then((json) => {
    //       this.citysArr = json
    //     })
    // axios
    //       .get('https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com')
    //       .then(response => response.json)
    //       .then((json) => {
    //         this.citysArr = json
    //       })
    // }
    this.getCities()
  }
}


</script>

<template>
<div>
  <h1>{{ title }}</h1>
  <input  v-model="this.searchName" v-on:keyup="getExcursion()" >

  <input @click="isVisible = !isVisible" v-model="this.selectItem" v-on:keyup="getExcursionByTown()" >
  <div v-if="isVisible">
    <ul>
      <li v-for="(city) in citysArr">{{city}}</li>
    </ul>
  </div>
</div>
</template>

<style>

</style>