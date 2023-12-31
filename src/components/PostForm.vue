<template>
  <div class="postform">
    <textarea v-model="content" class="postform-content" placeholder="Content"/>
    <div class="postform-actions-wrap">
      <input
        class="submit-btn"
        @click="submit"
        type="submit"
        :value="submitText"
        :disabled="cooldown > 0"
        :title="submitTooltip"
      >
      <span 
        class="length-counter"
        :class="{ over: contentLength > maxContentLength }"
      >
        {{ contentLength }} / {{ maxContentLength }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { postPost, UserPost } from "@/modules/repo";
import { Notif, State, Loading, Loaded, Errored } from "@/modules/state";

const cooldownSeconds = 30;

@Component
export default class PostForm extends Vue {
  @Prop({ type: String, required: true })
  private catName!: string;

  @Prop({ type: Number, required: false, default: 0 })
  private threadNum!: number;

  private state: State = { tag: "loaded" };

  private content = "";
  private maxContentLength = 300;
  private cooldown = 0;

  get contentLength(): number {
    return this.content.length;
  }

  get submitText(): string {
    if(this.cooldown > 0) {
      return this.cooldown.toString();
    }
    return this.threadNum == 0 ? "New thread" : "Reply";
  }

  get submitTooltip(): string {
    if(this.cooldown > 0) {
      return "Post cooldown";
    }
    return this.threadNum == 0 ?
      "Create a new thread on this category" : "Reply to this thread";
  }

  async submit() {
    this.state = { tag: "loading" };
    try {
      await postPost({ content: this.content }, this.catName, this.threadNum);
      Notif.notify("Post submitted!");
      this.$emit("submitted");
      this.content = "";

      this.cooldown = cooldownSeconds;

      const counter = setInterval(() => {
        this.cooldown--;
        if(this.cooldown <= 0) {
          clearInterval(counter);
        }
      }, 1000);

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
  text-align: left;
  margin: 15px 0;
}

.postform .postform-content {
  font-family: inherit;
  padding: 0.5em;

  width: 100%;
  max-width: 50vmax;
  height: 15vh;

  border: none;
  box-shadow: -5px 5px 15px hsl(0, 0%, 80%);
  outline: none;

}

.postform .submit-btn {
  margin: 10px 0;
}

.postform .length-counter {
  margin: 0 5px;
}

.postform .length-counter.over {
  color: lightcoral;
}

</style>
