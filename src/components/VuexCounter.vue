<template>
  <div>
    <h1>Current count is {{ count }}</h1>
    <button @click="increase">Increase</button>
    <button @click="decrease">Decrease</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { compositeStore } from "../store";

export default defineComponent({
  setup() {
    return {
      ...compositeStore()
    };
  }
});
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
