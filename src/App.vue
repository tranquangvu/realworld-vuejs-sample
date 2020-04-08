<template>
  <div id="app">
    <NavBar :logout="handleLogout"></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  },
  methods: {
    handleLogout() {
      this.$store
        .dispatch("users/logout")
        .then(() => {
          console.log("Logged out");
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>
