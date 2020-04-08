<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href>Need an account?</a>
          </p>
          <ul class="error-messages">
            <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
          </ul>
          <form>
            <fieldset class="form-group">
              <input
                type="text"
                placeholder="Email"
                class="form-control form-control-lg"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                placeholder="Password"
                class="form-control form-control-lg"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="handleLogin"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getErrorMessages } from "../utils/errorUtils";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("users/loginUser", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.errors = [];
          this.$router.push("/");
        })
        .catch(e => {
          this.errors = getErrorMessages(e.response);
        });
    }
  }
};
</script>
