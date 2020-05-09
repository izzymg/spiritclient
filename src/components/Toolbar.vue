<template>
  <div class="toolbar">
    <button class="toolbar-btn" @click="emitRefresh">Refresh</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {
  emitRefresh() {
    this.$emit("refresh");
  }
};
</script>

<style>
.toolbar {
  display: flex;
  flex-flow: row-reverse;

  border-bottom: 2px solid hsl(0, 0%, 92%);

  padding: 0.4em;

  font-size: 0.9em;
  text-align: left;
}

.toolbar .toolbar-btn {
  padding: 0.5em;
  border: none;
}
</style>