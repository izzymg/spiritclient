<template>
  <div class="thread">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the thread! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <ContentAsideSlot>
        <template v-slot:content>
          <Toolbar @refresh="loadThreadView"/>
          <ThreadPostList :posts="threadView.posts"/>
        </template>
        <template v-slot:aside>
          <CategoryAside :catName="threadView.category.name" :threadNum="opNumber"/>
        </template>
      </ContentAsideSlot>
    </div>
  </div>
</template>

<script lang="ts">
import ContentAsideSlot from "@/components/ContentAsideSlot.vue"
import Toolbar from "@/components/Toolbar.vue"
import ThreadPostList from "@/components/ThreadPostList.vue"
import CategoryAside from "@/components/CategoryAside.vue"

import { Vue, Component } from "vue-property-decorator";
import { getThreadView, Post, ThreadView } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";

/**
Thread view, renders a list of all the posts in a thread. 
*/
@Component({
  components: {
    ContentAsideSlot,
    Toolbar,
    ThreadPostList,
    CategoryAside,
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
