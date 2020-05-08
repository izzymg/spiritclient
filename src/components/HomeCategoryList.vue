<template>
  <div class="home-category-list">
    <div class="category" v-for="cat of cats" :key="cat.name">
      <router-link class="category-link" :to="'/' + cat.name">
        <span class="category-name">{{ cat.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCategories, Category } from "@/modules/repo";
@Component
export default class HomeCategoryList extends Vue {
  @Prop({ required: true })
  private cats!: Category;
}
</script>

<style>
.home-category-list {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 60%;
  margin: 0 auto;
}

.home-category-list .category {
  margin: 0 0 0.3em 0;
  border-bottom: 2px solid hsl(0, 0%, 80%);

  cursor: pointer;

  transition-property: border-bottom;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.home-category-list .category:hover {
  border-bottom: 2px solid hsl(138, 38%, 68%);
}

.home-category-list .category .category-link {
  display: block;
  padding: 1em;
  width: 100%;
}

</style>