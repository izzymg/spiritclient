<template>
  <div class="catview">
    <p v-if="state.tag == 'loading'">Loading...</p>

    <h1 v-else-if="state.tag == 'error'">Sorry! {{ state.error }}</h1>

    <div v-else-if="state.tag == 'loaded'">

      <h1>{{ category }}</h1>
      <PostForm :category="category"/>

      <div class="catview-threads-wrap">
        <div class="catview-thread" v-for="thread in catView.threads" :key="thread.num">
          <router-link :to="'/' + category + '/' + thread.num">
            <p class="thread-title">
              <span class="op-tag">Op</span>
              <span class="num">no.{{ thread.num }}</span>
              <span class="timestamp">{{ parseDate(thread.createdAt) }}</span>
            </p>
            <p class="content">{{ thread.content }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCatView, CatView } from "@/modules/repo";
import { Loading, Loaded, Errored, State } from "@/modules/state";
import { parseDate } from "@/modules/fmt";

import PostForm from "@/components/PostForm.vue";

@Component({
  components: {
    PostForm,
  }
})
export default class CategoryView extends Vue {
  @Prop({required: true, type: String})
  private category!: string;

  private catView: CatView | null = null;
  private state: State = { tag: "loading" };
  parseDate = parseDate

  async created() {
    try {
      this.catView = await getCatView(this.category);
      this.state = { tag: "loaded" };
    } catch(err) {
      this.state = { tag: "error", error: err }
    }
  }
}
</script>

<style>
.catview .catview-threads-wrap {
  display: flex;
  flex-flow: column wrap;
}

.catview .catview-threads-wrap .catview-thread {
  margin: 0.8em;
  padding: 0.3em;
  max-width: 70%;
  max-height: 400px;
  overflow-y: hidden;

  text-align: left;
  cursor: pointer;

  border: 1px solid hsl(0, 0%, 89%);

  word-break: break-all;

  transition-property: border;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.catview .catview-threads-wrap .catview-thread:hover {
  border: 1px solid #d3bcae;
}
.catview .catview-threads-wrap .catview-thread .thread-title {
  margin: 0;
}

.catview .catview-threads-wrap .catview-thread .thread-title .op-tag {
  float: right;
  color: hsl(0, 0%, 50%);
  font-size: smaller;
}
.catview .catview-threads-wrap .catview-thread .thread-title .num {
  margin-right: 5px;
  font-size: 0.85em;
  color: #489248;
}

.catview .catview-threads-wrap .catview-thread .thread-title .timestamp {
  color: #5a4e4e;
  font-size: 0.9em;
}

</style>