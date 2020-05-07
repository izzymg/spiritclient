<template>
  <div class="postform">
    <div class="postform-titlebar">
      <span class="postform-title">{{ submitText }}</span>
    </div>
    <div class="postform-wrap">
      <textarea v-model="content" class="postform-content" placeholder="Content"/>
      <div class="postform-actions-wrap">
        <input
          class="submit-btn"
          @click="submit"
          type="submit"
          :value="submitText"
          :disabled="state.tag == 'loading'"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { postPost, UserPost } from "@/modules/repo";
import { Notif, State, Loading, Loaded, Errored } from "@/modules/state";

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
        return this.thread == 0 ? "New thread" : "Reply";
    };
  }

  async submit() {
    this.state = { tag: "loading" };
    try {
      await postPost({ content: this.content }, this.category, this.thread);
      Notif.notify("Post submitted!");
    } catch(err) {
      Notif.notify(err);
    }
    // Artifical delay
    setTimeout(() => {
      this.state = { tag: "loaded" };
    }, 300);
  }
}
</script>

<style>
.postform {
  width: 20%;
  text-align: left;

  border: 1px solid hsl(0, 0%, 75%);

  margin: 15px 0;
}

.postform .postform-titlebar {
  color: hsl(0, 0%, 98%);
  background: #5a5e79;
  font-size: 0.9em;
  padding: 0.2em;
}

.postform .postform-wrap {
  display: flex;
}

.postform .postform-content {
  flex: 1 0;

  font-family: inherit;
  padding: 0.5em;

  border: none;
  box-sizing: border-box;
  resize: vertical;
  outline: none;
}

.postform .submit-btn {
  margin: 0.3em;
}

</style>
