<template>
  <router-link class="linkhome" to="/">
    <h2 class="linkhome-text">SpiritChat</h2>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LinkHome extends Vue {}
</script>

<style>
.linkhome {
  font-size: 1.5em;
}

.linkhome .linkhome-text {
  margin: 0.5em 0;
}
</style>