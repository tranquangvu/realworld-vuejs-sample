<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Demo</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-12">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <a
                  class="nav-link"
                  @click="changeFeedType('user')"
                  :class="{ active: feedType === 'user' }"
                >
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="changeFeedType('global')"
                  :class="{ active: feedType === 'global' }"
                >
                  Global Feed
                </a>
              </li>
            </ul>
          </div>
          <div class="article-preview loading" v-if="loadingArticles">
            Loading...
          </div>
          <div class="article-preview-container" v-else>
            <div v-if="articles.length">
              <ArticlePreview
                v-for="article in articles"
                :key="article.slug"
                :article="article"
              ></ArticlePreview>
              <div class="articles-pagination">
                <a
                  href="#"
                  class="btn btn-primary"
                  @click.prevent="handlePreviousPage"
                  v-if="currentPage !== 1"
                >
                  Previous
                </a>
                &nbsp;
                <a
                  href="#"
                  class="btn btn-primary"
                  @click.prevent="handleNextPage"
                  v-if="articlesCount > currentPage * perPage"
                >
                  Next
                </a>
              </div>
            </div>
            <div class="article-preview" v-if="!articles.length">
              No articles are here... yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview
  },
  data: function() {
    return {
      tags: [],
      feedType: "global",
      currentPage: 1,
      perPage: 20
    };
  },
  created: function() {
    this.getArticlesByFeedType(this.feedType);
  },
  watch: {
    feedType(newFeedType) {
      this.getArticlesByFeedType(newFeedType);
    }
  },
  methods: {
    handlePreviousPage() {
      this.currentPage = this.currentPage - 1;
      this.getArticlesByFeedType(this.feedType);
    },
    handleNextPage() {
      this.currentPage = this.currentPage + 1;
      this.getArticlesByFeedType(this.feedType);
    },
    changeFeedType(feedType) {
      this.currentPage = 1;
      this.feedType = feedType;
    },
    getArticlesByFeedType(feedType) {
      const action =
        feedType === "global"
          ? "articles/getGlobalArticles"
          : "articles/getUserArticles";

      this.$store.dispatch(action, {
        page: this.currentPage,
        limit: this.perPage
      });
    }
  },
  computed: {
    articles() {
      return this.$store.getters["articles/getList"] || [];
    },
    articlesCount() {
      return this.$store.getters["articles/getCount"] || 0;
    },
    loadingArticles() {
      return this.$store.getters["articles/getLoading"] || false;
    },
    user() {
      return this.$store.getters["users/user"];
    }
  }
};
</script>
