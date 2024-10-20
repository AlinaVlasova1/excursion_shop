<script lang="ts">
import axios from 'axios'
import events from "events";
import {ICity, IExcursion} from "./mainPage";
import {defineComponent} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faChevronDown, faStar, faTimes} from "@fortawesome/free-solid-svg-icons";
export default defineComponent({
  name: 'MainPage',
  components: {FontAwesomeIcon},
  data() {
    return {
      title: `Экскурсии по всему миру` as string,
      nameExcursion: 'Введите название экскурсии' as string,
      nameTown: 'Выбрать город' as string,
      arrExcursion: [],
      searchName: 'Введите название экскурсии' as string,
      isVisible: false as boolean,
      selectItem: {
       name: 'Выбрать город' as string
      } as ICity,
      citysArr: [] as Array<ICity>,
      select: false as boolean,
      excursionArr: [] as Array<IExcursion>,
      clearFilter: true as boolean
    }
  },
  methods: {
    faStar() {
      return faStar
    },
    faChevronDown() {
      return faChevronDown
    },
    faTimes() {
      return faTimes
    },
    getExcursionByTown(str1: string, event: events) {
      console.log('getExcursionByTown', event)
    },
    async getCities() {

      const response = await axios.get(
          `https://thingproxy.freeboard.io/fetch/https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
          {
            headers: {
              'Accept': 'application/json'
            }
          })
      this.citysArr = await response.data ;
    },
     async setItem(city: ICity) {
      this.clearFilter = false;
      console.log('city', city);
      this.selectItem = city;
      this.select = true;
      this.isVisible = false;
      await this.getExcursion();
      const copy = this.excursionArr.filter((el) => {
        console.log('el.city_id', el.city_id);
        console.log('city.id', city.id);
        console.log('el.city_id === city.id', Boolean(el.city_id === city.id))
        if (el.city_id === city.id) {
          return true
      }
      });
      this.excursionArr = structuredClone(copy);
      console.log('this.excursionArr 2', this.excursionArr)
    },
    cleanExcursion() {

    },
    async getExcursion() {
    const responce = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.sputnik8.com/v1/products?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
        {
          headers: {
            'Accept': 'application/json'
          }
        })
      this.excursionArr = await responce.data;
    console.log('this.excursionArr 1', this.excursionArr)

    },
    typeActivityPipe(str: string) {
      switch (str) {
        case 'tour': {
          return 'тур';
        }
        case 'entry_ticket': {
          return 'круиз';
        }
      }
    },
    getExcursionByName(str: string, event: events){
      console.log('event', event);
      this.clearFilter = false;
      if (this.select) {
        this.excursionArr.filter((el) => {
          if (el.title.toLowerCase().includes(str.toLowerCase())){
            return el;
          }
        })
      } else {
        this.getExcursion();
        this.excursionArr.filter((el) => {
          if (el.title.toLowerCase().includes(str.toLowerCase())){
            return el;
          }
        })
      }
    },
    clear(){
      this.clearFilter = true;
      this.searchName = 'Введите название экскурсии';
      this.selectItem = {
        name: 'Выбрать город'
      }
    }
  },
  mounted() {
  }
})


</script>

<template>
<div class="container">
  <h1>{{ title }}</h1>
  <div class="inputs">
    <div class="nameSearch">
      <i class="fa-times"></i>
      <input class="search" v-model="this.searchName" v-on:keyup="getExcursionByName(this.searchName, $event)" >
      <FontAwesomeIcon @click='cleanExcursion()' class="input-icon" :icon="faTimes()" :style="{ color: '#999999' }"/>
    </div>

    <div class="dropdown-wrapper">
      <div  class="dropdown-popover" >
        <div>
          <input  v-model="this.selectItem.name">
          <FontAwesomeIcon @click="isVisible = !isVisible; getCities()" class="input-icon" :icon="faChevronDown()" :style="{ color: '#999999' }"/>
        </div>
        <div v-if="isVisible && (this.citysArr.length !== 0 )" class="options">
          <ul>
            <li v-for="(city, index) in citysArr" :key="{index}" @click='setItem(city)'>{{city.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="cards" v-if="this.select && !this.clearFilter">
    <div class="card" v-for="(excursion, index) in excursionArr" :key="{index}">
      <img v-bind:src="excursion.main_photo.big">
      <div class="line-block">
        <FontAwesomeIcon :icon="faStar()" :style="{ color: '#ffd300' }"></FontAwesomeIcon>
        <div class="rating">{{excursion.rating}}</div>
        <div class="reviews-with-text">({{excursion.reviews_with_text}})</div>
      </div>
      <h3>{{excursion.title}}</h3>
      <h2>от {{excursion.price}}</h2>
      <span>за {{typeActivityPipe(excursion.activity_type)}}</span>
    </div>
  </div>
  <div v-if="this.excursionArr.length === 0 && !this.clearFilter">
    <div class="not-found">
      <div >Поиск не дал результатов</div>
      <button class="blue-button" @click="clear()">Сбросить Фильтры</button>
    </div>
  </div>
</div>
</template>

<style>
.container {
  height: auto;
}

.inputs {
  display: block;
}

FontAwesomeIcon {
  color: rgba(153, 153, 153, 1);
  background-color: rgba(153, 153, 153, 1);
}

input {
  width: 300px;
  margin-right: 10px;
  color: rgba(153, 153, 153, 1);
}

.input-icon {
  position: relative;
  left: -35px;
}

.nameSearch {
  display: inline-block;
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
        height: 170px;
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

          &:hover {
            background: #70878a;
            color: #fff;
            font-weight: bold;
          }

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

.not-found {
  font-weight: 400;
  font-size: 34px;
  color: rgba(0, 0, 0, 1);
  margin-top: 200px;
  .blue-button {
    background-color: rgba(0, 167, 255, 1);
    margin-top: 30px;
    width: 200px;
    height: 40px;
    max-height: 40px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 34px;
    padding-right: 34px;
    line-height: 0px;
    color: rgba(255, 255, 255, 1);
    border: none;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    border-radius: 3px;
  }
}

.cards {
  width: 85%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-evenly;

  .card {
    display: inline-block;
    text-align: left;
    width: 25%;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 50px;
    vertical-align: top;

    img {
      width: 100%;
      height: 200px;
      margin-top: 0;
      margin-bottom: 10px;
    }

    .line-block {
      display: flex;
      margin-right: 5px;

      FontAwesomeIcon {
        height: 22px;
        width: 22px;
      }

      .rating {
        font-size: 14px;
        line-height: 22px;
      }

      .reviews-with-text {
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        line-height: 22px;
      }

    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 10px;
    }

    h2 {
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
    }

    span {
      color: rgba(153, 153, 153, 1);
      font-weight: 400;
      font-size: 12px;
      line-height: 22px;
    }
  }

}

</style>