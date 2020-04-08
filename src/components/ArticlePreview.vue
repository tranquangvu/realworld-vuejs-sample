<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="`/profile/@${article.author.username}`"
        class="nav-link"
      >
        <img :src="article.author.image" />
      </router-link>

      <div class="info">
        <router-link
          :to="`/profile/@${article.author.username}`"
          class="author"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>

      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
