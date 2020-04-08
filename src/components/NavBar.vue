<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">conduit</a>
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
        <li v-if="!user" class="nav-item">
          <router-link to="/register" class="nav-link">
            Sign Up
          </router-link>
        </li>
        <li v-if="!!user" class="nav-item">
          <router-link class="nav-link" to="/">
            {{ user.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["users/user"];
    }
  }
};
</script>
