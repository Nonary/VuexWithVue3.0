import { createStore, useStore, Store } from "vuex";
import { ref, reactive, computed } from "vue";

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  }
});

export default store;

export function compositeStore() {
  const _store: typeof store = useStore();

  const count = computed(() => _store.state.count);

  function increase() {
    _store.commit("increment");
  }

  function decrease() {
    _store.commit("decrement");
  }

  return {
    count,
    increase,
    decrease
  };
}
