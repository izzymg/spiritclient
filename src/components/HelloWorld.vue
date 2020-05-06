<template>
  <div class="hello">
    <h1>Spirit</h1>
    <p>Modernized BBS/imageboard.</p>

    <h3>Categories</h3>
    <div v-if="loaded" class="categories">
      <div class="category" v-for="cat of cats" :key="cat.name">
        <router-link :to="'/' + cat.name">
          <span class="category-name">{{ cat.name }}</span>
        </router-link>
      </div>
    </div>
    <p v-else>Loading..</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCategories, category } from "@/modules/repo.ts";

@Component
export default class HelloWorld extends Vue {
  private cats: category[] = [];
  private loaded = false;

  async created() {
    this.cats = await getCategories();
    console.log(this.cats);
    this.loaded = true;
  }
}
</script>
