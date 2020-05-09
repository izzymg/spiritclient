<template>
  <aside class="category-aside">
    <RouterLink :to="{ name: 'Category', params: { category: catName } }">
      <h1 class="category-name">{{ catName }}</h1>
    </RouterLink>
    <PostForm :catName="catName" :threadNum="threadNum"/>
    <Toolbar @refresh="emitRefresh"/>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Toolbar from "@/components/Toolbar.vue";
import PostForm from "@/components/PostForm.vue";

@Component({
  components: {
    PostForm,
    Toolbar,
  },
})
export default class CategoryAside extends Vue {
  @Prop({ required: true })
  private catName!: string;
  @Prop({ required: false })
  private threadNum!: number | undefined;

  emitRefresh() {
    this.$emit("refresh");
  }
}
</script>

<style>
.category-aside {
  --top-offset: 1%;
  top: var(--top-offset);
  transform: translateY(--top-offset);
  position: sticky;
  padding: 0 1em;
}

.category-aside .category-name {
  font-size: 2.1em;
  color: var(--link);
  margin: 0;
}
</style>