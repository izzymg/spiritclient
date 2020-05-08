<template>
  <div class="cat-thread-list">
    <div class="cat-thread-preview" v-for="thread in threads" :key="thread.num">
      <RouterLink :to="{ name: 'Thread', params: { thread: thread.num } }">
        <ThreadPost isPreview :post="thread"/>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Post } from "@/modules/repo";

import ThreadPost from "@/components/ThreadPost.vue";

/**
Lists a preview of all threads in a category. 
*/
@Component({
  components: {
    ThreadPost,
  }
})
export default class CategoryThreadList extends Vue {
  @Prop({required: true})
  private threads!: Post[];
}
</script>

<style>
.cat-thread-list {
  display: flex;
  flex-flow: row wrap;
  text-align: left;
}

.cat-thread-list .cat-thread-preview {
  flex-basis: 15%;
  margin: 0.5em;
}

</style>