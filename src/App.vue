<template>
  <div id="app">
    <counter></counter>
    <vuex-counter></vuex-counter>

    <h1>Total clicks is {{ clicks }}</h1>
    <button @click="resetClicks">Reset clicks</button>
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import VuexCounter from "@/components/VuexCounter.vue";
import { clicks, resetClicks } from "@/composition/counter";
import store from "@/store/index";

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
