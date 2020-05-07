<template>
  <div class="catview">
    <h2>Spirit</h2>
    <p v-if="state.tag == 'loading'">Loading...</p>
    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>
    <div v-else-if="state.tag == 'loaded'">
      <h1>{{ category }}</h1>
      <PostForm :category="category"/>
      <div class="catview-thread" v-for="thread in catView.threads" :key="thread.num">
        <router-link :to="'/' + category + '/' + thread.num">
          <p>no.{{ thread.num }}</p>
          <p>{{ parseDate(thread.createdAt) }}</p>
          <p>{{ thread.content }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCatView, CatView } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";
import { parseDate } from "@/modules/fmt";

import PostForm from "@/components/PostForm.vue";

@Component({
  components: {
    PostForm,
  }
})
export default class CategoryView extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  private catView: CatView | null = null;
  private state: State = { tag: "loading" };
  parseDate = parseDate

  async created() {
    try {
      this.catView = await getCatView(this.category);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }
}
</script>
