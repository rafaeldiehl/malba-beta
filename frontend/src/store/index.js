import { createStore } from "vuex";
//import createPersistedState from "vuex-persistedstate";

import axiosClient from "@/services/axios";

export default createStore({
  state: {
    user: {
      data: {},
      token: null,
    },
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((res) => {
        commit("logout");
        return res;
      });
    },
    /*update({ commit }, user) {
      return axiosClient
        .put(`/users/${user.id}}`, user.credentials)
        .then(({ data }) => {
          commit("setUser", data);
          return data;
        });
    },*/
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
  //plugins: [createPersistedState()],
});
