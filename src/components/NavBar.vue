<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">Demo</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Home
          </router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
        <li v-if="!!user" class="nav-item">
          <router-link class="nav-link" to="/">
            {{ user.username }}
          </router-link>
        </li>
        <li v-if="!!user" class="nav-item" @click.prevent="logout">
          <router-link class="nav-link" to="/">
            Logout
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["logout"],
  computed: {
    user() {
      return this.$store.getters["users/user"];
    }
  }
};
</script>
