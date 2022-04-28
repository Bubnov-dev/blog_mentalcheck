<script setup>
import { RouterLink, RouterView } from "vue-router";
import iconAnalyse from "./components/icons/iconAnalyse.vue";
import iconArticles from "./components/icons/iconArticles.vue";
import iconHome from "./components/icons/iconHome.vue";
import iconStream from "./components/icons/iconStream.vue";
import iconVideo from "./components/icons/iconVideo.vue";
import iconConsultation from "./components/icons/iconConsultation.vue";
</script>

<template>
  <body>
    <div class="page-wrapper">
      <div class="page-wrapper__aside">
        <aside class="aside">
          <div class="aside__wrapper">
            <div class="aside__block aside__header">
              <div class="aside__burger">
                <div class="burger">
                  <div class="burger__item"></div>
                  <div class="burger__item"></div>
                  <div class="burger__item"></div>
                </div>
              </div>
              <RouterLink class="aside-logo" to="/"
                ><img class="aside-logo__img" src="./assets/img/logo.png"
              /></RouterLink>
            </div>
            <div class="aside__wrapper-block">
              <div class="aside__block aside__content">
                <nav class="aside-nav main-nav">
                  <ul class="aside-nav__list page-list">
                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconHome />
                        </span>
                        <span class="aside-nav__link-text page-list__link-text"
                          >Главная</span
                        >
                      </RouterLink>
                    </li>
                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/materials/articles"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconArticles />
                        </span>
                        <span class="aside-nav__link-text page-list__link-text"
                          >Рубрики</span
                        >
                      </RouterLink>
                      <ul class="aside-nav__list">
                        <li
                          class="aside-nav__item"
                          v-for="tag in tags"
                          :key="tag.name"
                        >
                          <RouterLink
                            class="aside-nav__link"
                            :to="'/materials/articles?tags=' + tag.id"
                          >
                            <span class="aside-nav__link-text">{{
                              tag.name
                            }}</span>
                          </RouterLink>
                        </li>
                      </ul>
                    </li>
                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/materials/videos"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconVideo />
                        </span>

                        <span class="aside-nav__link-text page-list__link-text"
                          >Видео</span
                        >
                      </RouterLink>
                    </li>
                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/materials/streams"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconStream />
                        </span>

                        <span class="aside-nav__link-text page-list__link-text">
                          Прямые трансляции
                        </span>
                      </RouterLink>
                    </li>
                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/tests"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconAnalyse />
                        </span>
                        <span class="aside-nav__link-text page-list__link-text">
                          Психологический анализ</span
                        >
                      </RouterLink>
                    </li>

                    <li class="aside-nav__item page-list__item">
                      <RouterLink
                        class="aside-nav__link page-list__link"
                        to="/consultation"
                      >
                        <span class="aside-nav__link-icon page-list__link-icon">
                          <iconConsultation />
                        </span>
                        <span class="aside-nav__link-text page-list__link-text"
                          >Консультация</span
                        >
                      </RouterLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="aside__block aside__footer">
                <a class="aside__btn btn btn-light-blue" href="../cabinet"
                  >личный кабинет</a
                >
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div class="page-wrapper__content">
        <RouterView />
      </div>
    </div>
  </body>
</template>
<script>
import axios from "axios";
import "./assets/js/common.js";

export default {
  mounted: function () {
    axios.get("https://mentalhub.ffox.site/api/blog/tags").then((response) => {
      console.log(response);
      this.tags = response["data"];
    });
  },

  data() {
    return {
      tags: [],
    };
  },
};
</script>
<style>
/* @import '@/assets/base.css'; */
@import "@/assets/main.css";
</style>
