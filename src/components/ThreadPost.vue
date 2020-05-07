<template>
  <div class="thread-post">
    <p class="meta">
      <span v-if="isOp" class="op-tag">Op</span>
      <span class="num">no.{{ post.num }}</span>
      <span class="timestamp">{{ timestamp }}</span>
    </p>
    <p class="content">{{ post.content }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post } from "@/modules/repo";

import dayjs from "dayjs";

@Component
export default class ThreadPost extends Vue {
  @Prop({ required: true })
  private post!: Post;

  @Prop({ required: true, type: Boolean })
  private isOp!: boolean;

  get timestamp(): string {
    return dayjs(this.post.createdAt).format("hh:mm a MMM D YYYY");
  };
}
</script>

<style>
.thread-post {
  padding: 0.3em;

  cursor: pointer;

  border: 1px solid hsl(0, 0%, 89%);

  word-break: break-all;
  overflow-y: hidden;

  transition-property: border;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.thread-post:hover {
  border: 1px solid #d3bcae;
}
.thread-post .meta {
  margin: 0;
}

.thread-post .meta .op-tag {
  float: right;
  color: hsl(0, 0%, 50%);
  font-size: smaller;
}
.thread-post .meta .num {
  margin-right: 5px;
  font-size: 0.85em;
  color: #489248;
}

.thread-post .meta .timestamp {
  color: #5a4e4e;
  font-size: 0.9em;
}
</style>