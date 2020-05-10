<template>
  <aside class="category-aside">
    <h1 class="category-name">
    <RouterLink class="underlined" :to="{ name: 'Category', params: { category: catName } }">{{ catName }}</RouterLink>
    <span v-if="threadNum" class="thread-num"> / #{{ threadNum }}</span>
    </h1>


    <PostForm @submitted="onSubmitted" :catName="catName" :threadNum="threadNum"/>
    <Toolbar @refresh="emitRefresh"/>
    <div class="meta">
      <p v-if="meta.categoryThreads">
        threads: {{ meta.categoryThreads }}
      </p>
      <p v-if="meta.threadReplies">
        replies: {{ meta.threadReplies }}
      </p>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Meta } from "@/modules/state";

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

  @Prop({ required: true })
  private meta!: Meta;

  onSubmitted() {
    setTimeout(() => {
      this.$emit("refresh");
    }, 2000);
  }

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
  color: hsl(0, 0%, 35%);
  margin: 0;
}
</style>