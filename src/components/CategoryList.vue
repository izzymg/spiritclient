<template>
  <div class="hello">
    <p>Modernized BBS/imageboard.</p>

    <h3>Categories</h3>

    <p v-if="state.tag == 'loading'">Loading...</p>
    <p v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</p>

    <div v-else-if="state.tag == 'loaded'" class="categories">      
      <div class="category" v-for="cat of cats" :key="cat.name">
        <router-link :to="'/' + cat.name">
          <span class="category-name">{{ cat.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCategories, Category } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";
@Component
export default class CategoryList extends Vue {
  private cats: Category[] = [];
  private state: State = { tag: "loading" };

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
