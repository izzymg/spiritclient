<template>
  <div v-if="isActive" class="notifier">
    <span class="notif-text">{{ text }}</span>
    <button @click="deactivate">Dismiss</button>
  </div>
</template>

<script lang="ts">
import { NotifSub, Notif } from "@/modules/state";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notifier extends Vue {
  private text: string = "";

  created() {
    Notif.addSubscriber(this.onNotif);
  }

  beforeDestroy() {
    Notif.removeSubscriber(this.onNotif);
  }

  get isActive(): boolean {
    return this.text.length > 0;
  }

  deactivate() {
    this.text = "";
  }

  onNotif(text: string) {
    this.text = text;
  }
}
</script>

<style>
.notifier {
  border: 2px solid blue;
}
</style>