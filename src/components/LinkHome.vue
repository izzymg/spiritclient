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