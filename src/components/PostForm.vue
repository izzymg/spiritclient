<template>
  <div class="postform">
    <textarea v-model="content" class="postform-content"/>
    <div class="postform-actions-wrap">
      <input @click="submit" type="submit" :value="submitText" :disabled="state.tag == 'loading'">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { postPost, UserPost } from "@/modules/repo";
import { State, Loading, Loaded, Errored } from "@/modules/state";

@Component
export default class PostForm extends Vue {
  @Prop({ type: String, required: true })
  private category!: string;

  @Prop({ type: Number, required: false, default: 0 })
  private thread!: number;

  private state: State = { tag: "loaded" };
  private content = "";

  get submitText(): string {
    switch(this.state.tag) {
      case "loading":
        return "Submitting...";
      default:
        return this.thread == 0 ? "Submit thread" : "Submit reply";
    };
  }

  async submit() {
    this.state = { tag: "loading" };
    await postPost({ content: this.content }, this.category, this.thread);
    // Artifical delay
    setTimeout(() => {
      this.state = { tag: "loaded" };
    }, 300);
  }
}
</script>