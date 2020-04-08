import {
  api,
  setTokenToAxiosInstance,
  clearTokenFromAxiosInstance
} from "../api";

import {
  setUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage
} from "../storage";

const user = getUserFromLocalStorage() || null;

export default {
  namespaced: true,
  state: {
    user
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.user.token;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    }
  },
  actions: {
    async getUser({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      clearTokenFromAxiosInstance();

      try {
        const respone = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        const {
          data: { user }
        } = respone;

        if (user) {
          setUserToLocalStorage(user);
          setTokenToAxiosInstance(user.token);

          commit("setUser", user);
        }
        return respone;
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      removeUserFromLocalStorage();
      clearTokenFromAxiosInstance();

      commit("removeUser");
    }
  }
};
