<template>
  <div class="cat-thread-list">
    <div class="cat-thread-preview" v-for="thread in threads" :key="thread.num">
      <RouterLink :to="{ name: 'Thread', params: { thread: thread.num } }">
        <Post isPreview :post="thread"/>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post as PostType } from "@/modules/repo";

import Post from "@/components/Post.vue";

/**
Lists a preview of all threads in a category. 
*/
@Component({
  components: {
    Post,
  }
})
export default class CategoryThreadList extends Vue {
  @Prop({required: true})
  private threads!: PostType[];
}
</script>

<style>
.cat-thread-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 500px));
  align-items: center;
  text-align: left;

  margin: 0 5px;

  gap: 1.5em;
}

</style>