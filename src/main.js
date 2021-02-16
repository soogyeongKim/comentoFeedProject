import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import axios from "axios";
import router from "./router";

Vue.config.productionTip = false;

// baseURL 기본값
axios.defaults.baseURL = "https://problem.comento.kr";
// 헤더
axios.defaults.headers.get["Accept"] = "application/json";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
