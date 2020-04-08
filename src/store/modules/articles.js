import { api } from "../api";

export default {
  namespaced: true,
  state: {
    list: [],
    count: 0,
    loading: false
  },
  getters: {
    getList(state) {
      return state.list;
    },
    getCount(state) {
      return state.count;
    },
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setArticles(state, { articles, articlesCount }) {
      state.list = articles;
      state.count = articlesCount;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async getGlobalArticles({ commit }, payload = { page: 1 }) {
      let route = "/articles";

      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;

        route += tag ? "?tag=${tag}&" : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favourited=${favourited}&` : "";
        route += page ? `?offset=${(page - 1) * 10}&limit=30` : "";
      }

      try {
        commit("setLoading", true);
        const respone = await api.get(route);
        commit("setArticles", respone.data);
        return respone;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    async getUserArticles({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";

      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${(page - 1) * 10}&limit=30` : "";
      }

      try {
        commit("setLoading", true);
        const response = await api.get(route);
        commit("setArticles", response.data);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    }
  }
};
