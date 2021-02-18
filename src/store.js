import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = () => {
  return {
    loading: true,
    detailLoading: true,
    page: 1,
    nextPage: true,
    adsPage: 1,
    adsNextPage: true,
    nextContents: true,
    contentList: [],
    adsList: [],
    allContentList: [],
    category: [],
    selectedCategory: localStorage.getItem("selectedCategory")
      ? JSON.parse(localStorage.getItem("selectedCategory"))
      : [],
    categoryID: [],
    order: localStorage.getItem("order")
      ? localStorage.getItem("order")
      : "asc",
    detail: {},
    adsIndex: 0,
  };
};

const actions = {
  //필터 카테고리
  async getCategoryList({ commit }) {
    await axios
      .get(`/api/category`)
      .then((res) => {
        commit("setCategory", res.data.category);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  //글 리스트
  async getContentList({ state, commit }) {
    state.loading = true;
    const params = {
      page: state.page,
      ord: state.order,
      category:
        state.selectedCategory && state.selectedCategory.length > 0
          ? [...state.selectedCategory.map((s) => s.id)]
          : state.categoryID,
      limit: 10,
    };
    if (state.nextPage) {
      await axios
        .get(`/api/list`, { params })
        .then((res) => {
          commit("setContentList", res.data.data);
          commit("setNextPage", res.data.next_page_url);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      state.nextContents = false;
    }
  },

  //광고 리스트
  async getAdsList({ state, commit }) {
    const params = {
      page: state.adsPage,
      limit: 3,
    };
    if (state.nextPage) {
      await axios
        .get(`/api/ads`, { params })
        .then((res) => {
          commit("setAdsList", res.data.data);
          commit("setAdsNextPage", res.data.next_page_url);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },

  //글 디테일
  async getDetail({ commit }, params) {
    state.detailLoading = true;
    await axios
      .get(`/api/view`, { params })
      .then((res) => {
        commit("setDetail", res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

const mutations = {
  initList(state) {
    state.loading = true;
    state.page = 1;
    state.nextPage = true;
    state.adsPage = 1;
    state.adsNextPage = true;
    state.allContentList = [];
    state.contentList = [];
    state.adsList = [];
    state.adsIndex = 0;
  },
  setContentList(state, contentList) {
    //contents
    state.contentList = [...state.contentList, ...contentList];
    state.page++;
  },
  setAdsList(state, adsList) {
    //ads
    state.adsList = [...state.adsList, ...adsList];
    state.adsPage++;
  },
  setAllContentList(state) {
    //contents + ads list
    const ads = state.adsList;
    const content = state.contentList;

    const initPage = state.page - 2;

    const type = { type: "content" };
    const adsType = { type: "sponsor" };

    if (state.nextContents) {
      let adsCnt = 0;
      let temp = [];

      for (let i = initPage * 10; i < content.length; i++) {
        let obj = { ...content[i], ...type };
        temp.push(obj);
        if ((i + 1) % 3 === 0) {
          if (ads[adsCnt]) {
            let obj2 = { ...ads[state.adsIndex], ...adsType };
            temp.push(obj2);
          }
          state.adsIndex++;
          adsCnt++;
        }
      }
      state.allContentList = [...state.allContentList, ...temp];
      state.loading = false;
    }
  },
  setOrder(state, order) {
    state.order = order;
    localStorage.setItem("order", order);
  },
  setCategory(state, category) {
    state.category = category;
    state.categoryID = category.map((c) => c.id);
  },
  setSelectedCategory(state, selectedCategory) {
    state.selectedCategory = selectedCategory;
    localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
  },
  setNextPage(state, nextPage) {
    state.nextPage = nextPage ? true : false;
  },
  setAdsNextPage(state, adsNextPage) {
    state.adsNextPage = adsNextPage ? true : false;
  },
  setDetail(state, detail) {
    state.detail = detail;
    state.detailLoading = false;
  },
};

const getters = {
  loading(state) {
    return state.loading;
  },
  contentList(state) {
    return state.contentList;
  },
  adsList(state) {
    return state.contentList;
  },
  allContentList(state) {
    return state.allContentList;
  },
  nextPage(state) {
    return state.nextPage;
  },
  adsNextPage(state) {
    return state.adsNextPage;
  },
  category(state) {
    return state.category;
  },
  selectedCategory(state) {
    return state.selectedCategory;
  },
  order(state) {
    return state.order;
  },
  detail(state) {
    return state.detail;
  },
  detailLoading(state) {
    return state.detailLoading;
  },
};

export const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
