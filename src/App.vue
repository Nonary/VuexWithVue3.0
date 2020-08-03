<template>
  <div id="app" class="container">
    <h1>Compositional Counter</h1>
    <counter></counter>
    <h1>Total clicks is {{ clicks }}</h1>
    <button @click="resetClicks">Reset clicks</button>

    <h1>Counter via Vuex and Composition API</h1>
    <vuex-counter></vuex-counter>

    <comp-table
      :items="sampleItems"
      :headers="headers"
      :perPage="2"
      :search="search"
      :currentPage="currentPage"
      expandable
      selectable
      v-model:expanded="expanded"
    >
      <template #sorter="direction">{{ formatDirection(direction) }}</template>
      <template #duration_cell="{item}">
        <h1>{{ item.duration }}</h1>
      </template>

      <template #expanded="{item}">
        <h6>{{ item }}</h6>
      </template>
    </comp-table>

    <input v-model="search" />
    <h1>{{ search }}</h1>

    <button @click="clearExpanded">Clear Expanded Items</button>
  </div>
</template>

<script lang="ts">
import Counter from "@/components/Counter.vue";
import VuexCounter from "@/components/VuexCounter.vue";
import CompTable from "@/components/CompTable.vue";
import { clicks, resetClicks } from "@/composition/counter";
import { ref, reactive } from "vue";

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

    function formatDirection(index: number) {
      if (index == 0) {
        return "=";
      }
      if (index == -1) {
        return "-";
      }
      if (index == 1) {
        return "+";
      }

      return "=";
    }

    const search = ref("");
    const currentPage = ref(0);
    const expanded = reactive({ value: [] });

    function clearExpanded() {
      expanded.value = [];
    }

    return {
      clicks,
      search,
      expanded,
      resetClicks,
      formatDirection,
      currentPage,
      sampleItems,
      headers,
      clearExpanded
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
