<!-- SpiritChat App 
Mounts global notifier and router -->
<template>
  <div id="app">
    <AppNotifier/>
    <LinkHome/>
    <RouterView/>
  </div>
</template>

<script>
import AppNotifier from "@/components/AppNotifier.vue"
import LinkHome from "@/components/LinkHome.vue"

export default {
  components: {
    AppNotifier,
    LinkHome,
  },
};
</script>

<!-- Global CSS -->
<style>
:root {
  --link: rgb(95, 89, 129);
}

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