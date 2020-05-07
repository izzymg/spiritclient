<template>
  <div class="hello">
    <p>Modernized imageboard.</p>

    <h2>Categories</h2>

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

<style>
.hello .categories {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 60%;
  margin: 0 auto;
}

.hello .categories .category {
  margin: 0 0 0.3em 0;
  border-bottom: 2px solid hsl(0, 0%, 80%);
  padding: 0.5em;

  cursor: pointer;

  transition-property: border-bottom;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.hello .categories .category:hover {
  border-bottom: 2px solid hsl(138, 38%, 68%);
}
</style>