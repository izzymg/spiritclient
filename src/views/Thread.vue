<template>
  <div class="thread">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the thread! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <ContentAsideSlot>
        <template v-slot:content>
          <ThreadPostList :posts="threadView.posts"/>
        </template>
        <template v-slot:aside>
          <CategoryAside
            @refresh="loadThreadView"
            :catName="threadView.category.name"
            :threadNum="opNumber"
            :meta="meta"
          />
        </template>
      </ContentAsideSlot>
    </div>
  </div>
</template>

<script lang="ts">
import ContentAsideSlot from "@/components/ContentAsideSlot.vue"
import ThreadPostList from "@/components/ThreadPostList.vue"
import CategoryAside from "@/components/CategoryAside.vue"

import { Vue, Component } from "vue-property-decorator";
import { getThreadView, Post, ThreadView } from "@/modules/repo";
import { Loading, Loaded, Errored, State, Meta } from "@/modules/state";

/**
Thread view, renders a list of all the posts in a thread. 
*/
@Component({
  components: {
    ContentAsideSlot,
    ThreadPostList,
    CategoryAside,
  }
})
export default class Thread extends Vue {
  private state: State = { tag: "loading" };
  private threadView: ThreadView | null = null;

  private meta: Meta = {
  };


  created() {
    this.loadThreadView();
  }

  get opNumber(): number {
    return this.threadView?.posts[0]?.num || 0;
  }

  async loadThreadView() {
    try {
      this.threadView = await getThreadView(
        this.$route.params["category"],
        parseInt(this.$route.params["thread"]),
      );
      this.state = { tag: "loaded" };
      this.meta = {
        threadReplies: this.threadView.posts.length - 1,
      };
    } catch(err) {
      this.state = { tag: "error", error: err };
    }
  }
}
</script>
