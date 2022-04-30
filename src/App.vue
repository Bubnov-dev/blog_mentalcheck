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
    <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <div class="header__block">
            <div class="logo">
              <p class="logo__text">Логотип</p>
            </div>
          </div>
          <div class="header__block header__nav">
            <nav class="header-nav">
              <ul class="header-nav__list header-list">
                <li class="header-list__item">
                  <RouterLink class="header-list__link" to="/"
                    >Главная</RouterLink
                  >
                </li>
                <li class="header-list__item">
                  <RouterLink class="header-list__link" to="/mtests"
                    >Тесты</RouterLink
                  >
                </li>
                <li class="header-list__item">
                  <RouterLink
                    to="/materials/all"
                    class="header-list__link"
                    href="#"
                    >Материалы</RouterLink
                  >
                </li>
                <li class="header-list__item">
                  <RouterLink
                    to="/consultation"
                    class="header-list__link"
                    href="#"
                    >Консультация</RouterLink
                  >
                </li>
                <li class="header-list__item">
                  <a class="header-list__link" href="#">Медиа</a>
                  <ul class="header-nav__list header-list">
                    <li class="header-list__item">
                      <a class="header-list__link" href="#">Медиа</a>
                    </li>
                    <li class="header-list__item">
                      <a class="header-list__link" href="#">Медиа</a>
                    </li>
                    <li class="header-list__item">
                      <a class="header-list__link" href="#">Медиа</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header__burger header__block">
            <div class="burger">
              <div class="burger__item"></div>
              <div class="burger__item"></div>
              <div class="burger__item"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="aside">
      <div class="aside__wrapper">
        <div class="aside__nav">
          <nav class="aside-nav header-nav">
            <ul class="aside-nav__list aside-list header-nav__list">
              <li class="aside-list__item header-list__item">
                <RouterLink class="aside-list__link header-list__link" to="/"
                  >Главная</RouterLink
                >
              </li>
              <li class="aside-list__item header-list__item">
                <RouterLink
                  to="/mtests"
                  class="aside-list__link header-list__link"
                  >Тесты</RouterLink
                >
              </li>
              <li class="aside-list__item header-list__item">
                <RouterLink
                  to="/consultation"
                  class="aside-list__link header-list__link"
                  >Консультация</RouterLink
                >
              </li>
              <li class="aside-list__item header-list__item">
                <a class="aside-list__link header-list__link" href="#">Медиа</a>
                <ul class="aside-nav__list aside-list header-nav__list">
                  <li class="aside-list__item header-list__item">
                    <a class="aside-list__link header-list__link" href="#"
                      >Медиа</a
                    >
                  </li>
                  <li class="aside-list__item header-list__item">
                    <a class="aside-list__link header-list__link" href="#"
                      >Медиа</a
                    >
                  </li>
                  <li class="aside-list__item header-list__item">
                    <a class="aside-list__link header-list__link" href="#"
                      >Медиа</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div class="aside__footer">
          <a class="btn aside__btn" href="../cabinet2">Личный кабинет</a>
        </div>
      </div>
    </div>
    <div class="page-wrapper">
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
  provide() {
    return {
      host: this.host,
    };
  },
  inject: ["host"],
  mounted: function () {
    axios.get(this.host + "/api/blog/tags").then((response) => {
      console.log(response);
      this.tags = response["data"];
    });
  },

  data() {
    return {
      tags: [],
      host: "http://app.mentalcheck.ru",
    };
  },
};
</script>
<style>
/* @import '@/assets/base.css'; */
@import "@/assets/css/main.css";
</style>
