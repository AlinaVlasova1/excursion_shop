<script lang="ts">
import axios from 'axios'
import {ICity, IExcursion} from "./mainPage";
import {defineComponent} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faChevronDown, faStar, faTimes} from "@fortawesome/free-solid-svg-icons";
import CardExcursion from "@/components/CardExcursion/CardExcursion.vue";
import {getExcursionFromServer} from "@/service/excursion-service";
export default defineComponent({
  name: 'MainPage',
  components: {CardExcursion, FontAwesomeIcon},
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
      isSearchName: false as boolean,
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
      this.selectItem = city;
      this.select = true;
      this.isVisible = false;
      if (this.isSearchName) {
        const copy = this.excursionArr.filter((el) => {
          if (el.city_id === city.id) {
            return true
          }
        });
        this.excursionArr = structuredClone(copy);
      } else {
        await this.getExcursion();
        const copy = this.excursionArr.filter((el) => {
          if (el.city_id === city.id) {
            return true
          }
        });
        this.excursionArr = structuredClone(copy);
      }
    },
    async cleanExcursion() {
      this.searchName = 'Введите название экскурсии';
      this.isSearchName = false;
      if (this.select) {
        await this.setItem(this.selectItem);
      } else {
        this.clearFilter = true;
      }
    },
    async getExcursion() {
    const responce = await getExcursionFromServer();
      this.excursionArr = await responce.data;
    },
    async getExcursionByName(str: string){
      this.isSearchName = true;
      this.clearFilter = false;
      if (this.select) {
        const arr: Array<IExcursion> = [];
        this.excursionArr.forEach((el) => {
          if (el.title.toLowerCase().includes(str.toLowerCase())){
            arr.push(el);
          }
        })
        this.excursionArr = structuredClone(arr);
      } else {
        const arr: Array<IExcursion> = [];
        await this.getExcursion();
        this.excursionArr.forEach((el) => {
          if (el.title.toLowerCase().includes(str.toLowerCase())){
            arr.push(el);
          }
        })
        this.excursionArr = structuredClone(arr);
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
      <input class="search" v-model="this.searchName" @click='this.searchName = ``' v-on:keyup="getExcursionByName(this.searchName)" >
      <FontAwesomeIcon  @click='cleanExcursion()' class="input-icon" :icon="faTimes()" :style="{ color: '#999999' }"/>
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
  <div class="cards" v-if="(this.excursionArr.length !==0) && !this.clearFilter">
    <div class="card" v-for="(excursion, index) in excursionArr" :key="{index}">
     <CardExcursion :excursion="excursion"></CardExcursion>
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
          background-color: rgba(255, 255, 255, 1);

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
    width: 22%;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 50px;
    vertical-align: top;

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
</style>