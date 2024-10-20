<script lang="ts">
import { ICity, IExcursion } from './mainPage'
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faStar, faTimes } from '@fortawesome/free-solid-svg-icons'
import CardExcursion from '@/components/CardExcursion/CardExcursion.vue'
import { getCitiesFromServer, getExcursionFromServer } from '@/service/excursion-service'

export default defineComponent({
    name: 'MainPage',
    components: { CardExcursion, FontAwesomeIcon },
    data() {
        return {
            title: `Экскурсии по всему миру` as string,
            searchName: '' as string,
            isVisible: false as boolean,
            selectedCity: {} as ICity,
            citiesArr: [] as Array<ICity>,
            excursionToDisplayArr: [] as Array<IExcursion>,
            allExcursionArr: [] as Array<IExcursion>,
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

        async setCities() {
            const response = await getCitiesFromServer()
            this.citiesArr = await response.data
        },

        async setCity(city: ICity) {
            this.selectedCity = city
            this.isVisible = false

            const isNameContains = this.isNameEmpty()
                ? () => true
                : (el: IExcursion) => el.title.toLowerCase().includes(this.searchName.toLowerCase())

            const copy = this.allExcursionArr.filter((el) => {
                if (el.city_id === city.id && isNameContains(el)) {
                    return true
                }
            })

            this.excursionToDisplayArr = structuredClone(copy)
        },

        async cleanExcursion() {
            this.searchName = ''

            if (this.isCityEmpty()) {
                await this.setCity(this.selectedCity)
            }
        },

        async setExcursion() {
            const response = await getExcursionFromServer()
            this.allExcursionArr = await response.data
        },

        async getExcursionByName() {
            const isCityMatches = this.isCityEmpty()
                ? () => true
                : (el: IExcursion) => el.city_id === this.selectedCity.id

            const copy = this.allExcursionArr.filter((el) => {
                if (
                    isCityMatches(el) &&
                    el.title.toLowerCase().includes(this.searchName.toLowerCase())
                ) {
                    return true
                }
            })

            this.excursionToDisplayArr = structuredClone(copy)
        },

        clear() {
            this.searchName = ''
            this.selectedCity = {}
        },

        isCityEmpty() {
            return Object.keys(this.selectedCity).length === 0
        },

        isNameEmpty() {
            return this.isEmptyOrSpaces(this.searchName)
        },

        isEmptyOrSpaces(str: string | null) {
            return str === null || str.match(/^ *$/) !== null
        },
    },

    async created() {
        await Promise.all([this.setExcursion(), this.setCities()])
    },
})
</script>

<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <div class="inputs">
            <div class="nameSearch">
                <i class="fa-times"></i>
                <input
                    v-model="searchName"
                    class="search"
                    placeholder="Введите название экскурсии"
                    @click="searchName = ``"
                    v-on:keyup="getExcursionByName()" />
                <FontAwesomeIcon
                    :icon="faTimes()"
                    :style="{ color: '#999999' }"
                    class="input-icon"
                    @click="cleanExcursion()" />
            </div>

            <div class="dropdown-wrapper">
                <div class="dropdown-popover">
                    <div>
                        <input v-model="selectedCity.name" placeholder="Выбрать город" />
                        <FontAwesomeIcon
                            :icon="faChevronDown()"
                            :style="{ color: '#999999' }"
                            class="input-icon"
                            @click="isVisible = !isVisible" />
                    </div>
                    <div v-if="isVisible" class="options">
                        <ul>
                            <li
                                v-for="(city, index) in citiesArr"
                                :key="index"
                                @click="setCity(city)">
                                {{ city.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="excursionToDisplayArr.length !== 0 && (!isNameEmpty() || !isCityEmpty())"
            class="cards">
            <div v-for="(excursion, index) in excursionToDisplayArr" :key="index" class="card">
                <CardExcursion :excursion="excursion"></CardExcursion>
            </div>
        </div>
        <div v-if="excursionToDisplayArr.length === 0 && (!isCityEmpty() || !isNameEmpty())">
            <div class="not-found">
                <div>Поиск не дал результатов</div>
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
                box-shadow:
                    15px 15px 20px rgba(0, 0, 0, 0.05),
                    -20px -20px 20px rgba(0, 0, 0, 0.05);
                margin: 5px 0;

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
        padding: 0 34px;
        line-height: 0;
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
