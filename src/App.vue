<!-- SpiritChat App 
Mounts global notifier and router -->
<template>
  <div id="app">
    <Notifier/>
    <LinkHome/>
    <router-view/>
  </div>
</template>

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

<!-- Global CSS -->
<style>
#app {
  font-family: "Raleway", Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: inherit;
}

h1, h2, h3, h4 {
  font-weight: normal;
}
</style>