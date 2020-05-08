<template>
  <div class="thread">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the thread! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <router-link :to="{ name: 'Category', params: { category: catName } }">
        <h2>{{ catName }}</h2>
      </router-link>

      <h2>Thread no.{{ opNumber }}</h2>

      <PostForm :catName="catName" :threadNum="threadNum"/>
      <Toolbar @refresh="loadPosts"/>
      <ThreadPostList :posts="posts"/>
    </div>
  </div>
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue"
import Toolbar from "@/components/Toolbar.vue"
import ThreadPostList from "@/components/ThreadPostList.vue"

import { Vue, Component } from "vue-property-decorator";
import { getThread, Post } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";

/**
Thread view, renders a list of all the posts in a thread. 
*/
@Component({
  components: {
    PostForm,
    Toolbar,
    ThreadPostList
  }
})
export default class Thread extends Vue {
  private state: State = { tag: "loading" };
  private posts: Post[] = [];

  private catName!: string;
  private threadNum!: number;

  created() {
    this.catName = this.$route.params["category"];
    this.threadNum = parseInt(this.$route.params["thread"]);
    this.loadPosts();
  }

  get opNumber(): number {
    return this.posts[0]?.num;
  }

  async loadPosts() {
    try {
      this.posts = await getThread(this.catName, this.threadNum);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err };
    }
  }
}
</script>
