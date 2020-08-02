<template>
  <div id="app">
    <h1>Compositional Counter</h1>
    <counter></counter>
    <h1>Total clicks is {{ clicks }}</h1>
    <button @click="resetClicks">Reset clicks</button>

    <h1>Counter via Vuex and Composition API</h1>
    <vuex-counter></vuex-counter>
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import VuexCounter from "@/components/VuexCounter.vue";
import { clicks, resetClicks } from "@/composition/counter";

export default {
  setup() {
    return {
      clicks,
      resetClicks
    };
  },
  components: {
    Counter,
    VuexCounter
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
