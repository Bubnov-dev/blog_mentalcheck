<template>
<div class="page-wrapper__block">
    <div class="card-grid">
      <div class="card-grid__wrapper card-grid__wrapper_small">
        <RouterLink :to="'/test/'+test.slug"
            v-for="test in tests"
            :key="test.id"
            class="card-grid__item card-item"
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
              </div>
            </div>
          </RouterLink>
      </div>
      <div class="card-grid__footer card-grid__footer_position-center"><a class="card-grid__btn card-grid__btn-mobile btn btn-transparent" href="#">Показать еще</a><img class="card-grid__footer-img" src="../assets/img/test-footer.png"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios
      .get("https://mentalhub.ffox.site/api/blog/tests")
      .then((response) => {
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
