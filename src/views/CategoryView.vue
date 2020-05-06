<template>
  <div class="catview">
    <h3>Spirit</h3>
    <h1>{{ categoryName }}</h1>
    <div class="catview-thread">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
//import { getCategories, Category } from "@/modules/repo.ts";
import { Loading, Loaded, Errored, State } from "@/modules/state.ts";



export default class CategoryView extends Vue {
  private categoryName = this.$route.params["category"];
  private state: State = { tag: "loading" };
}
</script>
