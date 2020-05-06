<template>
  <div class="home">
    <CategoryList/>
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue"

export default {
  name: "Home",
  components: {
    CategoryList
  }
}
</script>
