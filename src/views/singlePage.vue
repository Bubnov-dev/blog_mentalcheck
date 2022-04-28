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
            <div class="single-article__info">
              <div class="single-article__info-block">
                <time class="single-article__info-text">{{
                  material.created_at
                }}</time>
              </div>
              <div class="single-article__info-block">
                <p class="single-article__info-text">{{ material.author }}</p>
              </div>
            </div>
          </div>
          <div class="single-article__content">
            <h2 class="single-article__title">{{ material.title }}</h2>
            <div class="single-article__desc" v-html="material.content"></div>
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
              :to="'/material/' + material.slug"
              v-for="material in materials"
              :key="material.id"
              class="card-grid__item card-item"
            >
              <div class="card-item__wrapper">
                <div class="card-item__header">
                  <img
                    class="card-item__img card-item__img_size-full"
                    :src="material.preview"
                  />
                  <div class="card-item__header-footer">
                    <div class="card-item__category">
                      <img
                        v-if="material.type == 'article'"
                        class="card-item__category-icon"
                        src="../assets/img/tag-1.png"
                      />

                      <img
                        v-if="material.type == 'video'"
                        class="card-item__category-icon"
                        src="../assets/img/tag-2.png"
                      />

                      <img
                        v-if="material.type == 'stream'"
                        class="card-item__category-icon"
                        src="../assets/img/tag-3.png"
                      />
                    </div>
                    <div class="card-item__tag">
                      <div
                        class="card-item__tag-item"
                        v-for="tag in material.tags"
                        :key="tag"
                      >
                        <p class="card-item__tag-text">{{ tag }}</p>
                      </div>
                    </div>
                    <div class="card-item__date">
                      <p class="card-item__date-text">
                        {{ material.created_at }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card-item__content">
                  <p class="card-item__title">
                    {{ material.title }}
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
      material: {},
      materials: [],
    };
  },

  methods: {
    init() {
      axios
        .get("https://mentalhub.ffox.site/api/blog/material/" + this.slug)
        .then((response) => {
          this.material = response.data;
          var date = new Date(this.material.created_at);

          var options = {
            month: "numeric",
            day: "numeric",

            timezone: "UTC",
          };

          this.material.created_at = date.toLocaleString("ru", options);

          axios
            .get(
              "https://mentalhub.ffox.site/api/blog/" + this.material.type + "s"
            )
            .then((response) => {
              this.materials = response["data"]["data"].slice(0, 4);
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
