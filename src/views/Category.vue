<template>
  <div class="category">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the category! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <ContentAsideSlot>
        <template v-slot:content>
          <CategoryThreadList :threads="catView.threads"/>
        </template>
        <template v-slot:aside>
          <CategoryAside
            @refresh="loadCatView"
            :meta="meta"
            :catName="catView.category.name"
          />
        </template>
      </ContentAsideSlot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ContentAsideSlot from "@/components/ContentAsideSlot.vue"
import CategoryThreadList from "@/components/CategoryThreadList.vue"
import CategoryAside from "@/components/CategoryAside.vue";

import { getCatView, CatView } from "@/modules/repo";
import { Loading, Loaded, Errored, State, Meta } from "@/modules/state";

/**
Category view, renders a list of threads on the category. 
*/
@Component({
  components: {
    ContentAsideSlot,
    CategoryThreadList,
    CategoryAside,
  },
})
export default class Category extends Vue {
  private state: State = { tag: "loading" };
  private catView: CatView | null = null;

  private meta: Meta = {
    categoryThreads: 0,
  };

  created() {
    this.loadCatView();
  }

  async loadCatView() {
    try {
      this.catView = await getCatView(this.$route.params["category"]);
      this.state = { tag: "loaded" };
      this.meta.categoryThreads = this.catView.threads.length;
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }
}
</script>

