<template>
  <div class="catview">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>

    <div v-else-if="state.tag == 'loaded'">

      <h1>{{ category }}</h1>
      <PostForm :category="category"/>

      <Toolbar @refresh="loadThreads"/>

      <div class="catview-threads-wrap">
        <div class="catview-thread" v-for="thread in catView.threads" :key="thread.num">
          <router-link :to="'/' + category + '/' + thread.num">
            <ThreadPost isPreview :post="thread"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCatView, CatView } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";

import PostForm from "@/components/PostForm.vue";
import ThreadPost from "@/components/ThreadPost.vue";
import Toolbar from "@/components/Toolbar.vue";

@Component({
  components: {
    PostForm,
    ThreadPost,
    Toolbar,
  }
})
export default class CategoryView extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  private catView: CatView | null = null;
  private state: State = { tag: "loading" };

  created() {
    this.loadThreads();
  }

  async loadThreads() {
    try {
      this.catView = await getCatView(this.category);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }

}
</script>

<style>
.catview .catview-threads-wrap {
  display: flex;
  flex-flow: row wrap;
  text-align: left;
}

.catview .catview-threads-wrap .catview-thread {
  flex-basis: 15%;
  margin: 0.5em;
}

</style>