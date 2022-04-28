<template>
  <div class="page-wrapper__block">
    <div class="card-grid">
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
    <div
      v-if="page < lastPage"
      class="card-grid__footer card-grid__footer_position-center"
    >
      <span class="card-grid__btn btn btn-light-blue" @click="nextPage"
        >показать еще</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    console.log("https://mentalhub.ffox.site/api/blog/" + this.type);
    this.init();
  },

  props: {
    type: {
      validator(value) {
        return ["articles", "videos", "streams", "all"].includes(value);
      },
    },
  },

  data() {
    return {
      materials: [],
      page: 1,
      lastPage: 1,
      r_type: "all",
    };
  },

  methods: {
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      console.log(
        document.documentElement.scrollTop +
          window.innerHeight +
          " " +
          document.documentElement.offsetHeight
      );
      if (bottomOfWindow) {
        this.nextPage();
      }
    },
    findGetParameter(parameterName) {
      var result = "",
        tmp = [];
      location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
      return result;
    },
    init() {
      this.r_type = this.type;
      console.log("init " + this.type);
      this.page = 1;

      let tagsParams = this.findGetParameter("tags");
      let tagParam = tagsParams != "" ? "&tags=" + tagsParams : "";
      axios
        .get(
          "https://mentalhub.ffox.site/api/blog/" +
            this.r_type +
            "?page=" +
            +this.page +
            tagParam
        )
        .then((response) => {
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
        });
    },

    nextPage() {
      let tagsParams = this.findGetParameter("tags");
      let tagParam = tagsParams != "" ? "&tags=" + tagsParams : "";
      axios
        .get(
          "https://mentalhub.ffox.site/api/blog/" +
            this.type +
            "?page=" +
            +(++this.page) +
            tagParam
        )
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
        });
    },
  },

  watch: {
    type() {
      this.init();
    },
    $route: {
      handler: function (search) {
        console.log(search);
        // this.init();
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>
