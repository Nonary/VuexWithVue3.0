<template>
  <div>
    <h1>Current count is {{ count }}</h1>
    <button @click="increase">Increase</button>
    <button @click="decrease">Decrease</button>
  </div>
</template>

<script>
import setupCounter from "@/composition/counter";

export default {
  setup() {
    return { ...setupCounter() };
  }
};
</script>
