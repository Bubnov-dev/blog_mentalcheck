<template>
  <div class="page-wrapper__block">
    <div class="card-grid">
      <div class="card-grid__wrapper card-grid__wrapper_small">
        <div
          class="card-grid__item card-item"
          v-for="test in tests"
          :key="test.id"
        >
          <div class="card-item__wrapper card-item__wrapper_row">
            <div class="card-item__header card-item__header_size-small">
              <img class="card-item__img" :src="test.preview" />
            </div>
            <div class="card-item__content card-item__content_size-small">
              <p class="card-item__title">{{ test.title }}</p>
              <p class="card-item__text">
                {{ test.description }}
              </p>
              <RouterLink
                :to="'/test/' + test.slug"
                class="card-item__btn btn btn-blue"
                href="#"
                >начать</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  inject: ["host"],
  mounted() {
    axios.get(this.host + "/api/blog/tests").then((response) => {
      this.tests = response["data"];
    });
  },

  data() {
    return {
      tests: [],
    };
  },
};
</script>
