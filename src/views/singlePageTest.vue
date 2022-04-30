<template>
  <div class="template-wrap">
    <div class="page-wrapper__block">
      <article class="single-article">
        <div class="single-article__wrapper">
          <div class="single-article__header">
            <div class="single-article__img">
              <img class="single-article__img-item" :src="test.head_content" />
            </div>
          </div>
          <div class="single-article__content">
            <div class="single-article__info">
              <div class="single-article__info-block">
                <div class="card-item__tag">
                  <div
                    class="card-item__tag-item"
                    v-for="tag in test.tags"
                    :key="tag"
                  >
                    <p class="card-item__tag-text">{{ tag }}</p>
                  </div>
                </div>
              </div>
              <div class="single-article__info-block">
                <time class="single-article__info-text">{{
                  test.created_at
                }}</time>
              </div>
            </div>
            <p class="single-article__title">
              {{ test.title }}
            </p>
            <div class="single-article__desc" v-html="test.content"></div>
          </div>
        </div>
      </article>
    </div>
    <div class="page-wrapper__block">
      <section class="section">
        <div class="container container-small">
          <div class="section__header">
            <h2 class="section__title">Читайте также:</h2>
          </div>
          <div class="section__content">
            <div class="card-grid test-grid">
              <div class="card-grid__wrapper card-grid__wrapper_small">
                <RouterLink
                  :to="'/test/' + test.slug"
                  class="card-grid__item card-item"
                  v-for="test in tests"
                  :key="test.id"
                >
                  <div class="card-item__wrapper">
                    <div class="card-item__header">
                      <img
                        class="card-item__img card-item__img_size-full"
                        :src="test.preview"
                      />
                      <div class="card-item__header-footer">
                        <div class="card-item__tag">
                          <div
                            class="card-item__tag-item"
                            v-for="tag in test.tags"
                            :key="tag"
                          >
                            <p class="card-item__tag-text">{{ tag }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-item__content">
                      <p class="card-item__title">{{ test.title }}</p>
                      <p class="card-item__text">
                        Описание статьи максимум в три <br />
                        строки
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  inject: ["host"],
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
      axios.get(this.host + "/api/blog/test/" + this.slug).then((response) => {
        this.test = response.data;
        var date = new Date(this.test.created_at);

        var options = {
          month: "numeric",
          day: "numeric",

          timezone: "UTC",
        };

        this.test.created_at = date.toLocaleString("ru", options);
      });
      axios.get(this.host + "/api/blog/testsShort").then((response) => {
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
