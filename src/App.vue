<template>
  <div id="app">
    <h1>Compositional Counter</h1>
    <counter></counter>
    <h1>Total clicks is {{ clicks }}</h1>
    <button @click="resetClicks">Reset clicks</button>

    <h1>Counter via Vuex and Composition API</h1>
    <vuex-counter></vuex-counter>

    <comp-table
      :items="sampleItems"
      :headers="headers"
      :perPage="1"
      :search="search"
      :currentPage="currentPage"
    >
      <template #duration_cell="{item}">
        <h1>{{ item.duration }}</h1>
      </template>
    </comp-table>

    <input v-model="search" />
    <h1>{{ search }}</h1>
    <h1>{{ currentPage }}</h1>
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import VuexCounter from "@/components/VuexCounter.vue";
import CompTable from "@/components/CompTable.vue";
import { clicks, resetClicks } from "@/composition/counter";
import { ref } from "vue";

export default {
  setup() {
    const sampleItems = [
      {
        name: "Chase",
        duration: 0
      },
      {
        name: "John",
        duration: 1
      }
    ];

    const headers = [
      {
        name: "Name",
        value: "name"
      },
      {
        name: "Duration",
        value: "duration"
      }
    ];

    const search = ref("");
    const currentPage = ref(0);

    return {
      clicks,
      search,
      resetClicks,
      currentPage,
      sampleItems,
      headers
    };
  },
  components: {
    Counter,
    VuexCounter,
    CompTable
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
