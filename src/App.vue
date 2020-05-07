<template>
  <div id="app">
    <Notifier/>
    <LinkHome/>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Notifier from "@/components/Notifier.vue"
import LinkHome from "@/components/LinkHome.vue"

export default {
  components: {
    Notifier,
    LinkHome,
  },
};
</script>
