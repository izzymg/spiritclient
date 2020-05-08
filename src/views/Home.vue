<template>
  <div class="home">
    <p>Modernized imageboard.</p>

    <h2>Categories</h2>

    <p v-if="state.tag == 'loading'">Loading...</p>
    <p v-else-if="state.tag == 'error'">
      Sorry, couldn't load the categories! {{ state.error }}
    </p>

    <div v-else-if="state.tag == 'loaded'" class="categories">      
      <HomeCategoryList :cats="cats"/>
    </div>
  </div>
</template>

<script lang="ts">
import HomeCategoryList from "@/components/HomeCategoryList.vue"

import { Vue, Component } from "vue-property-decorator";
import { getCategories, Category } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";

/**
Home view, fetches all categories and render a list of them.
*/
@Component({
  components: {
    HomeCategoryList,
  },
})
export default class Home extends Vue {
  private state: State = { tag: "loading" };
  private cats: Category[] = [];
  
  async created() {
    try {
      this.cats = await getCategories();
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err };
    }
  }
}
</script>
