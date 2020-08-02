import { ref, computed } from "vue";

export const clicks = ref(0);

export default function useCounter() {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);

  function increase() {
    count.value++;
    clicks.value++;
  }

  function decrease() {
    count.value--;
    clicks.value++;
  }

  return {
    count,
    doubled,
    increase,
    decrease
  };
}

export function resetClicks() {
  clicks.value = 0;
}
