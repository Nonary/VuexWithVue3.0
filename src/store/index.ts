import { createStore, useStore, Store } from "vuex";
import { ref, reactive, computed } from "vue";

const typedState = {
  count: 0,
  clicks: 0
};

const mutations = {
  increment(state: typeof typedState) {
    state.count++;
  },
  decrement(state: typeof typedState) {
    state.count--;
  }
};

const store = createStore({
  state: typedState,
  mutations
});

export default store;

export function compositeStore() {
  const _store: typeof store = useStore();

  const count = computed(() => _store.state.count);
  const clicks = computed(() => _store.state.clicks);

  function increase() {
    _store.commit("increment");
  }

  function decrease() {
    _store.commit("decrement");
  }

  return {
    count,
    clicks,
    increase,
    decrease
  };
}
