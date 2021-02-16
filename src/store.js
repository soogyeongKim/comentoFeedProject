import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = () => {
  return {
    contentList: [],
    category: [],
    adsList: [],
  };
};

const actions = {
  //글 리스트
  async getContentList({ commit }, params) {
    await axios
      .get(`/api/list`, { params })
      .then((res) => {
        commit("setContentList", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  //필터 카테고리
  async getCategory({ commit }) {
    await axios
      .get(`/api/category`)
      .then((res) => {
        //console.log(res.data.category[0].id);
        commit("setCategory", res.data.category);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  //광고 리스트
  async getAdsList({ commit }, params) {
    await axios
      .get(`/api/ads`, { params })
      .then((res) => {
        commit("setAdsList", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

const mutations = {
  setContentList(state, contentList) {
    state.contentList = contentList;
  },
  setCategory(state, category) {
    state.category = category;
  },
  setAdsList(state, adsList) {
    state.adsList = adsList;
  },
};

const getters = {
  contentList(state) {
    return state.contentList;
  },
  category(state) {
    return state.category;
  },
  adsList(state) {
    return state.adsList;
  },
};

export const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
