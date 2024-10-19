<script lang="ts">
import axios from 'axios'
import events from "events";
import {ICity} from "./mainPage";
export default {
  name: 'MainPage',
  // props: {
  //   title: {
  //     type: String
  //   },
  //   nameExcursion: {
  //     type: String
  //   },
  //   nameTown: {
  //     type: String
  //   },
  //   arrExcursion: {
  //     type: Array
  //   },
  //   searchName: {
  //     type: String
  //   },
  //   isVisible: {
  //     type: Boolean
  //   },
  //   citysArr: {
  //     type: Array<ICity>
  //   },
  //   selectItem: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      title: `Экскурсии по всему миру` as string,
      nameExcursion: 'Введите название экскурсии' as string,
      nameTown: 'Выбрать город' as string,
      arrExcursion: [],
      searchName: '' as string,
      isVisible: false as boolean,
      selectItem: null,
      citysArr: [] as Array<ICity>
    }
  },
  methods: {
    getExcursion(str1: string, event: events): string {
      console.log('getExcursion event', event)
      return str1
    },
    getExcursionByTown(str1: string, event: events) {
      console.log('getExcursionByTown', event)
    },
    async getCities(citysArr: Array<ICity>) {

      const response = await axios.get(
          `https://thingproxy.freeboard.io/fetch/https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
          {
            headers: {
              'Accept': 'application/json'
            }
          })
      citysArr = await response.data ;
      console.log('this.citysArr',citysArr )
      //    .then(response => response.json()).then((res) => {
      //   console.log("res", res)
      //  this.citysArr = res;
      // })
    }
  },
  mounted() {
  }
}


</script>

<template>
<div class="container">
  <h1>{{ title }}</h1>
  <div class="inputs">
    <input class="search" v-model="this.searchName" v-on:keyup="getExcursion(this.searchName, $event)" >
    <div class="dropdown-wrapper">
      <div @click="isVisible = !isVisible; getCities(this.citysArr)" class="dropdown-popover" >
        <input  v-model="this.selectItem" v-on:keyup="getExcursionByTown(this.selectItem, $event)">
        <div v-if="isVisible" class="options">
          <ul>
            <li v-for="(city, index) in this.citysArr" :key="{index}">{{city.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.container {
  height: 100%;
}

.inputs {
  display: block;
}

input {
  width: 300px;
  margin-right: 10px;
}

.dropdown-wrapper {
  max-width: 350px;
  margin: 0 auto;
  display: inline-block;

  .dropdown-popover {
    top: 40px;
    left: 0;
    right: 0;
    background-color: #fff;
    max-width: 100%;
    padding: 5px;

    input {
      height: 30px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      font-size: 16px;
      padding-left: 8px;
    }

    .options {
      width: 300px;
      padding-left: 8px;
      position: absolute;

      ul {
        list-style: none;
        text-align: left;
        padding-left: 3px;
        max-height: 170px;
        overflow-y: scroll;
        scrollbar-width: thin;
        overflow-x: hidden;
        box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.05), -20px -20px 20px rgba(0, 0, 0, 0.05);
        margin: 5px 0 ;

        li {
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          padding: 13px 15px;
          font-weight: 400;
          font-size: 14px;
        }

      }
    }
  }
}

.search {
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  padding-left: 8px;
  max-width: 350px;
}


</style>