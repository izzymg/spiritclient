<template>
  <div class="thread-post">
    <p class="meta">
      <span v-if="isOp" class="op-tag">Op</span>
      <span class="num">no.{{ post.num }}</span>
      <span class="timestamp">{{ timestamp }}</span>
    </p>
    <p v-if="isPreview" class="content small" v-html="previewContent"/>
    <p v-else v-html="post.content" class="content"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post } from "@/modules/repo";

import dayjs from "dayjs";

const previewMaxCharacters = 80;

@Component
export default class ThreadPost extends Vue {
  @Prop({ required: true })
  private post!: Post;

  @Prop({ required: false, type: Boolean })
  private isOp!: boolean;

  @Prop({ required: false, type: Boolean })
  private isPreview!: boolean;

  get timestamp(): string {
    return dayjs(this.post.createdAt).format("hh:mm a MMM D 'YY");
  }

  get previewContent(): string {
    if(this.post.content.length > previewMaxCharacters) {
      return this.post.content.substr(0, 80) + "...";
    }
    return this.post.content;
  }
}
</script>

<style>
.thread-post {
  padding: 0.3em;

  border: 1px solid hsl(0, 0%, 89%);

  word-break: break-all;
  overflow: hidden;

  transition-property: border;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.thread-post:hover {
  border: 1px solid #a7a3a3;
}
.thread-post .meta {
  margin: 0;
}

.thread-post .meta .op-tag {
  float: right;
  color: hsl(0, 0%, 50%);
  font-size: smaller;
}

.thread-post .meta {
  font-size: 0.9em;
}

.thread-post .meta .num {
  margin-right: 5px;
  color: #489248;
}

.thread-post .meta .timestamp {
  display: block;
  color: #5a4e4e;
}

.thread-post .content {
  margin: 0;
  padding: 0.3em 0;
}

.thread-post .content.small {
  font-size: 0.9em;
}

</style>