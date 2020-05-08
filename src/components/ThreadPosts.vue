<template>
  <div class="thread-posts">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>

    <div v-else-if="state.tag == 'loaded'">
      <router-link :to="'/' + category" class="thread-category-link">
        <h2>{{ category }}</h2>
      </router-link>
      <h2>Thread no.{{ posts[0].num }}</h2>

      <PostForm :catName="category" :threadNum="thread"/>

      <Toolbar @refresh="loadPosts"/>

      <div class="posts">
        <div class="thread-post-wrap" v-for="(post, i) in posts" :key="post.num">
          <!-- First post in thread is OP -->
          <ThreadPost :class="{ reply: i !== 0, op: i === 0}" :post="post" :isOp="i === 0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Loading, Loaded, Errored, State } from "@/modules/state";
import { getThread, Post } from "@/modules/repo";

import PostForm from "@/components/PostForm.vue";
import ThreadPost from "@/components/ThreadPost.vue";
import Toolbar from "@/components/Toolbar.vue";

@Component({
  components: {
    PostForm,
    ThreadPost,
    Toolbar,
  },
})
export default class ThreadPosts extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  @Prop({required: true, type: Number})
  private thread!: number;

  private state: State = { tag: "loading" };
  private posts: Post[] = [];

  created() {
    this.loadPosts();
  }

  async loadPosts() {
    try {
      this.posts = await getThread(this.category, this.thread);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err };
    }
  }

}
</script>

<style>
.thread-posts .thread-post-wrap {
  margin: 0.5em 0;
  text-align: left;
}

.thread-posts .thread-post-wrap .reply {
  margin-left: 10px;
}
</style>