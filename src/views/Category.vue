<template>
  <div class="category">
    <CategoryView :category="this.$route.params['category']"/>
  </div>
</template>

<script>
import CategoryView from "@/components/CategoryView.vue"

export default {
  name: "Category",
  components: {
    CategoryView
  }
}
</script>
