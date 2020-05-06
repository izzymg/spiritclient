<template>
  <div class="thread">
    <ThreadPosts :category="this.$route.params['category']" :thread="parseInt(this.$route.params['thread'])"/>
  </div>
</template>

<script>
import ThreadPosts from "@/components/ThreadPosts.vue"

export default {
  name: "Thread",
  components: {
    ThreadPosts
  }
}
</script>
