<template>
  <div class="content-aside-slot">
    <div class="aside-wrap">
      <slot name="aside"/>
    </div>
    <div class="content-wrap">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

/**
Wraps some main content and an aside in a responsive column
layout. 
*/
@Component
export default class ContentAsideWrap extends Vue {

}
</script>

<style>
.content-aside-slot {
  display: flex;
  flex-flow: row;
}

.content-aside-slot .aside-wrap {
  flex: 1 0;
}

.content-aside-slot .content-wrap {
  flex: 2 0;
}

/* Wrap content vertically on small screens */
@media screen and (max-width: 600px) {
  .content-aside-slot {
    flex-flow: column-reverse;
  }

  .content-aside-slot .aside-wrap {
    max-height: 35vh;
    overflow: auto;
  }
}

</style>