<template>
  <div class="template-wrap">
    <div class="page-wrapper__block">
      <article class="single-article">
        <div class="single-article__wrapper">
          <div class="single-article__header">
            <div class="single-article__img">
              <img class="single-article__img-item" :src="test.head_content" />
            </div>
            <div class="single-article__info">
              <div class="single-article__info-block">
                <time class="single-article__info-text">{{
                  test.created_at
                }}</time>
              </div>
              <div class="single-article__info-block">
                <p class="single-article__info-text">{{ test.author }}</p>
              </div>
            </div>
          </div>
          <div class="single-article__content">
            <h2 class="single-article__title">{{ test.title }}</h2>
            <div class="single-article__desc" v-html="test.content"></div>
          </div>
        </div>
      </article>
    </div>
    <div class="page-wrapper__block">
      <section class="section">
        <div class="section__header">
          <h2 class="section__title">Читайте также:</h2>
        </div>
        <div class="section__content">
          <div class="card-grid__wrapper">
            <RouterLink
              :to="'/test/' + test.slug"
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
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.init();
  },

  props: {
    slug: String,
  },

  data() {
    return {
      test: {},
      tests: [],
    };
  },
  methods: {
    init() {
      axios
        .get("https://mentalhub.ffox.site/api/blog/test/" + this.slug)
        .then((response) => {
          this.test = response.data;
          var date = new Date(this.test.created_at);

          var options = {
            month: "numeric",
            day: "numeric",

            timezone: "UTC",
          };

          this.test.created_at = date.toLocaleString("ru", options);
        });
      axios
        .get("https://mentalhub.ffox.site/api/blog/testsShort")
        .then((response) => {
          this.tests = response.data;
        });
    },
  },
  watch: {
    slug(to, from) {
        this.init();

    },
  },
};
</script>
