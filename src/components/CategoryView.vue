<template>
  <div class="catview">
    <h2>Spirit</h2>
    <p v-if="state.tag == 'loading'">Loading...</p>
    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>
    <div v-else-if="state.tag == 'loaded'">
      <h1>{{ category }}</h1>
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
import { getCatView, CatView } from "@/modules/repo.ts";
import { Loading, Loaded, Errored, State } from "@/modules/state.ts";
import dayjs from "dayjs";

@Component
export default class CategoryView extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  private catView: CatView | null = null;
  private state: State = { tag: "loading" };

  async created() {
    try {
      this.catView = await getCatView(this.category);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }

  parseDate(date: Date): string {
    return dayjs(date).format("MMM D YYYY hh:mm a");
  }
}
</script>
