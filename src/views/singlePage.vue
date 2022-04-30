<template>
  <div class="template-wrap">
    <div class="page-wrapper__block">
      <article class="single-article">
        <div class="single-article__wrapper">
          <div class="single-article__header">
            <div class="single-article__img">
              <img
                class="single-article__img-item"
                :src="material.head_content"
              />
            </div>
          </div>
          <div class="single-article__content">
            <div class="single-article__info">
              <div class="single-article__info-block">
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
              <div class="single-article__info-block">
                <time class="single-article__info-text">{{
                  material.created_at
                }}</time>
              </div>
            </div>
            <p class="single-article__title">
              {{ material.title }}
            </p>
            <div class="single-article__desc" v-html="material.content"></div>
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
            <div class="card-grid material-grid">
              <div class="card-grid__wrapper card-grid__wrapper_small">
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
      material: {},
      materials: [],
    };
  },

  methods: {
    init() {
      axios
        .get(this.host + "/api/blog/material/" + this.slug)
        .then((response) => {
          this.material = response.data;
          var date = new Date(this.material.created_at);

          var options = {
            month: "numeric",
            day: "numeric",
            year: "2-digit",

            timezone: "UTC",
          };
          console.log(date);
          this.material.created_at = date.toLocaleString("ru", options);

          axios
            .get(this.host + "/api/blog/" + this.material.type + "s")
            .then((response) => {
              this.materials = response["data"]["data"].slice(0, 3);
              this.materials.forEach((element) => {
                var date = new Date(element.created_at);

                var options = {
                  month: "numeric",
                  day: "numeric",

                  timezone: "UTC",
                };

                element.created_at = date.toLocaleString("ru", options);
              });
            });
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
