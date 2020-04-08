<template>
  <router-link to="#" class="tag-pill tag-default">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  props: ["name"]
};
</script>
