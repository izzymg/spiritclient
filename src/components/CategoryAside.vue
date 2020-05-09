<template>
  <aside class="category-aside">
    <RouterLink :to="{ name: 'Category', params: { category: catName } }">
      <h1 class="category-name">{{ catName }}</h1>
    </RouterLink>
    <PostForm :catName="catName" :threadNum="threadNum"/>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import PostForm from "@/components/PostForm.vue";

@Component({
  components: {
    PostForm
  },
})
export default class CategoryAside extends Vue {
  @Prop({ required: true })
  private catName!: string;
  @Prop({ required: false })
  private threadNum!: number | undefined;
}
</script>

<style>
.category-aside {
  padding: 0 1em;
}

.category-aside .category-name {
  font-size: 2.1em;
  color: var(--link);
  margin: 0;
}
</style>