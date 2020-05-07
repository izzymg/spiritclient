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

button, input[type="submit"] {
  font-family: inherit;

  border: none;
  background: hsl(0, 0%, 95%);
  border: 1px solid hsl(0, 0%, 83%);
  border-radius: 9px;

  padding: 0.7em;
  
  cursor: pointer;

  transition-property: border;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

button, input[type="submit"]:hover {
  border: 1px solid hsl(0, 0%, 70%);
}
</style>