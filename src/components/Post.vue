<template>
  <div class="post">
    <p class="meta">
      <span v-if="isOp" class="op-tag">Op</span>
      <span class="num">#{{ post.num }}</span>
      <span v-if="!isPreview" class="timestamp">{{ timestamp }}</span>
    </p>
    <p v-if="isPreview" class="content small" v-html="previewContent"/>
    <p v-else v-html="post.content" class="content"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post as PostType } from "@/modules/repo";

import dayjs from "dayjs";

const previewMaxCharacters = 150;

@Component
export default class Post extends Vue {
  @Prop({ required: true })
  private post!: PostType;

  @Prop({ required: false, type: Boolean })
  private isOp!: boolean;

  @Prop({ required: false, type: Boolean })
  private isPreview!: boolean;

  get timestamp(): string {
    return dayjs(this.post.createdAt).format("hh:mm a MMM D 'YY");
  }

  get previewContent(): string {
    if(this.post.content.length > previewMaxCharacters) {
      return this.post.content.substr(0, previewMaxCharacters) + "...";
    }
    return this.post.content;
  }
}
</script>

<style>
.post {
  padding: 0.8em;

  background: hsl(0, 0%, 100%);
  border: 1px solid hsl(0, 0%, 85%);

  word-break: break-all;
  overflow: hidden;

  transition-property: border;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.post:hover {
  border: 1px solid #a7a3a3;
}
.post .meta {
  margin: 0;
}

.post .meta .op-tag {
  float: right;
  color: hsl(0, 0%, 50%);
  font-size: smaller;
}

.post .meta {
  font-size: 0.9em;
}

.post .meta .num {
  margin-right: 5px;
  color: var(--link);
}

.post .meta .timestamp {
  display: block;
  color: #5a4e4e;
}

.post .content {
  margin: 0;
  padding: 0.3em 0;
  word-break: break-word;

  color: #000;
}

.post .content.small {
  font-size: 0.9em;
}

</style>