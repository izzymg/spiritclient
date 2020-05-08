<template>
  <div class="thread">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the thread! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <router-link :to="{ name: 'Category', params: { category: threadView.category.name } }">
        <h2>{{ threadView.category.name }}</h2>
      </router-link>

      <h2>Thread no.{{ opNumber }}</h2>

      <PostForm :catName="threadView.category.name" :threadNum="opNumber"/>
      <Toolbar @refresh="loadThreadView"/>
      <ThreadPostList :posts="threadView.posts"/>
    </div>
  </div>
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue"
import Toolbar from "@/components/Toolbar.vue"
import ThreadPostList from "@/components/ThreadPostList.vue"

import { Vue, Component } from "vue-property-decorator";
import { getThreadView, Post, ThreadView } from "@/modules/repo";
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
  private threadView!: ThreadView;

  created() {
    this.loadThreadView();
  }

  get opNumber(): number {
    return this.threadView.posts[0]?.num;
  }

  async loadThreadView() {
    try {
      this.threadView = await getThreadView(
        this.$route.params["category"],
        parseInt(this.$route.params["thread"]),
      );
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err };
    }
  }
}
</script>
