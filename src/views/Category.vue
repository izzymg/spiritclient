<template>
  <div class="category">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the category! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'">
      <ContentAsideSlot>
        <template v-slot:content>
          <Toolbar @refresh="loadCatView"/>
          <CategoryThreadList :threads="catView.threads"/>
        </template>
        <template v-slot:aside>
          <CategoryAside :catName="catView.category.name"/>
        </template>
      </ContentAsideSlot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ContentAsideSlot from "@/components/ContentAsideSlot.vue"
import Toolbar from "@/components/Toolbar.vue";
import CategoryThreadList from "@/components/CategoryThreadList.vue"
import CategoryAside from "@/components/CategoryAside.vue";

import { getCatView, CatView } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";

/**
Category view, renders a list of threads on the category. 
*/
@Component({
  components: {
    ContentAsideSlot,
    Toolbar,
    CategoryThreadList,
    CategoryAside,
  },
})
export default class Category extends Vue {
  private state: State = { tag: "loading" };
  private catView!: CatView;

  created() {
    this.loadCatView();
  }

  async loadCatView() {
    try {
      this.catView = await getCatView(this.$route.params["category"]);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }
}
</script>

