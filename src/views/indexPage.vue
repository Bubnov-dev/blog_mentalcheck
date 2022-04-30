<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<template>
  <div class="template-wrap">
    <div v-if="showPreloader > 0" class="preloader">Лого</div>
    <div class="page-wrapper__block">
      <div class="card-grid test-grid">
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

    <div class="page-wrapper__block">
      <section class="banner page-wrapper__banner">
        <div class="banner__wrapper">
          <div class="banner__img"><img src="../assets/img/banner.png" /></div>
          <div class="banner__content">
            <h2 class="banner__title">
              <span>Задай волнующий тебя вопрос</span> дипломированному
              психологу
            </h2>
          </div>
          <div class="banner__footer">
            <a class="banner__btn btn" href="#">Написать</a>
          </div>
        </div>
      </section>
    </div>
    <div class="page-wrapper__block">
      <div class="card-grid material-grid">
        <div class="card-grid__wrapper">
          <RouterLink
            :to="'/material/' + material.slug"
            class="card-grid__item card-item"
            v-for="material in materials"
            :key="material.id"
          >
            <div class="card-item__wrapper">
              <div class="card-item__header">
                <img
                  class="card-item__img card-item__img_size-full"
                  :src="material.preview"
                />
                <div class="card-item__header-footer">
                  <div class="card-item__tag">
                    <div
                      class="card-item__tag-item"
                      v-for="tag in material.tags"
                      :key="tag"
                    >
                      <p class="card-item__tag-text">{{ tag }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-item__content">
                <p class="card-item__title">{{ material.title }}</p>
                <p class="card-item__text">{{ material.description }}</p>
              </div>
            </div>
          </RouterLink>
        </div>

        <div
          v-if="page < lastPage"
          class="card-grid__footer card-grid__footer_margin-small"
        >
          <span class="card-grid__link" @click="nextPage()">Загрузить еще</span>
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
    axios.get(this.host + "/api/blog/testsShort").then((response) => {
      this.tests = response["data"];
      this.showPreloader--;
    });

    axios.get(this.host + "/api/blog/newest").then((response) => {
      this.materials = response["data"]["data"];
      this.lastPage = response["data"]["last_page"];

      this.materials.forEach((element) => {
        var date = new Date(element.created_at);

        var options = {
          month: "numeric",
          day: "numeric",

          timezone: "UTC",
        };

        element.created_at = date.toLocaleString("ru", options);
      });
      this.showPreloader--;
    });
  },

  methods: {
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        -document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.loading) {
        this.loading = true;
        axios
          .get(this.host + "/api/blog/newest" + "?page=" + +(++this.page))
          .then((response) => {
            let _materials = response["data"]["data"];
            _materials.forEach((element) => {
              var date = new Date(element.created_at);

              var options = {
                month: "numeric",
                day: "numeric",

                timezone: "UTC",
              };

              element.created_at = date.toLocaleString("ru", options);
            });

            this.materials = [...this.materials, ..._materials];
            this.loading = false;
          });
      }
    },
    nextPage() {
      axios
        .get(this.host + "/api/blog/newest" + "?page=" + ++this.page)
        .then((response) => {
          let _materials = response["data"]["data"];
          _materials.forEach((element) => {
            var date = new Date(element.created_at);

            var options = {
              month: "numeric",
              day: "numeric",

              timezone: "UTC",
            };

            element.created_at = date.toLocaleString("ru", options);
          });

          this.materials = [...this.materials, ..._materials];
          this.loading = false;
        });
    },
  },
  data() {
    return {
      materials: [],
      tests: [],
      page: 1,
      lastPage: 1,
      showPreloader: 2, //0 = don't show
      loading: false,
    };
  },
};
</script>
