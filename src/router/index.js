import { createRouter, createWebHistory } from "vue-router";
import indexPage from "../views/indexPage.vue";
import materialsPage from "../views/materialsPage.vue";
import singlePage from "../views/singlePage.vue";
import singlePageTest from "../views/singlePageTest.vue";
import testPage from "../views/testPage.vue";
import consultationPage from "../views/consultationPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: indexPage,
    },

    {
      path: "/consultation",
      name: "consultation",
      component: consultationPage,
    },

    {
      path: "/materials/:type",
      name: "materials",
      component: materialsPage,
      props: true,
    },

    {
      path: "/material/:slug",
      name: "singleMaterial",
      component: singlePage,
      props: true,
    },
    {
      path: "/test/:slug",
      name: "singleTest",
      component: singlePageTest,
      props: true,
    },
    {
      path: "/tests",
      name: "tests",
      component: testPage,
    },
  ],
});

export default router;
