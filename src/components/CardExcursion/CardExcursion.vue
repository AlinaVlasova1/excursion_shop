<script lang="ts">
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {defineComponent} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: 'CardExcursion',
  components: {FontAwesomeIcon},
  methods: {
    faStar() {
      return faStar
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
  },
  props: ['excursion']
})
</script>

<template>
  <div>
    <img alt="card-image" class="card-image" v-bind:src="excursion.image_big">
    <div class="line-block">
      <FontAwesomeIcon :icon="faStar()" :style="{ color: '#ffd300' }"></FontAwesomeIcon>
      <div class="rating">{{ excursion.rating }}</div>
      <div class="reviews-with-text">({{ excursion.reviews_with_text }})</div>
    </div>
    <h3>{{ excursion.title }}</h3>
    <h2>от {{ excursion.price }}</h2>
    <span>за {{ typeActivityPipe(excursion.activity_type) }}</span>
  </div>
</template>

<style>
.card-image {
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
    vertical-align: middle;
    padding: 5px;
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
</style>