<template>
  <div class="thread-posts">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>

    <div v-else-if="state.tag == 'loaded'">
      <router-link :to="'/' + category" class="thread-category-link">
        <h2>{{ category }}</h2>
      </router-link>
      <h2>Thread no.{{ posts[0].num }}</h2>

      <PostForm :category="category" :thread="thread"/>

      <div class="posts">
        <div class="thread-post-wrap" v-for="post in posts" :key="post.num">
          <ThreadPost :post="post" :isOp="false"/>
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

@Component({
  components: {
    PostForm,
    ThreadPost,
  },
})
export default class ThreadPosts extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  @Prop({required: true, type: Number})
  private thread!: number;

  private state: State = { tag: "loading" };
  private posts: Post[] = [];

  async created() {
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
</style>