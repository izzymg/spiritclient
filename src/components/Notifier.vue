<template>
  <transition name="notif-fade">
    <div v-if="isActive" class="notifier">
      <span class="notif-text">{{ text }}</span>
      <button class="notif-dismiss-btn" @click="deactivate">Dismiss</button>
    </div>
  </transition>
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
    setTimeout(() => {
      this.deactivate();
    }, 3000);
  }
}
</script>

<style>
.notifier {
  padding: 1em;

  position: absolute;
  top: 20px;

  left: 20px;
  right: 20px;

  color: hsl(0, 0%, 100%);
  background: #5a5e79;
  border-radius: 25px;

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.notifier .notif-dismiss-btn {
  background: none;
  border: none;
  padding: 0;

  color: inherit;

  cursor: pointer;

  font-size: 0.8em;

  margin-left: auto;
}

.notif-fade-enter-active, .notif-fade-leave-active {
  transition: opacity 150ms;
  transition-timing-function: ease-out;
}
.notif-fade-enter, .notif-fade-leave-to {
  opacity: 0;
}
</style>