<template>
  <div class="thread-posts">
    <!-- First post in thread is always OP -->
    <div
      v-for="(post, i) in posts" :key="post.num"
      :class="{ reply: i !== 0, op: i === 0}"
      class="thread-post-wrap"
    >
      <ThreadPost :post="post" :isOp="i === 0"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post } from "@/modules/repo";

import PostForm from "@/components/PostForm.vue";
import ThreadPost from "@/components/ThreadPost.vue";
import Toolbar from "@/components/Toolbar.vue";

/**
Lists all posts in a thread. 
*/
@Component({
  components: {
    PostForm,
    ThreadPost,
    Toolbar,
  },
})
export default class ThreadPostList extends Vue {
  @Prop({ required: true })
  private posts!: Post[];
}
</script>

<style>
.thread-posts .thread-post-wrap {
  margin: 0.5em 0;
  text-align: left;
}

.thread-posts .thread-post-wrap.reply {
  margin-left: 10px;
}
</style>