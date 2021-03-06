import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main.vue";
import Detail from "@/components/Detail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Main", component: Main },
    {
      path: "/:id",
      name: "Detail",
      component: Detail,
    },
  ],
});
