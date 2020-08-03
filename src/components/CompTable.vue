<template>
  <div>
    <table class="table table-sm">
      <tr>
        <th v-if="selectable"></th>
        <th
          v-for="header in headers"
          :key="header.name"
          @click="sortTableByKey(header.value)"
        >
          <slot :name="`${header.value}_header`" v-bind="{ header }">
            {{ header.name }}
          </slot>
          <span>
            <slot name="sorter" v-bind="sortedKeys.get(header.value)">{{
              headerKey(header.value)
            }}</slot>
          </span>
        </th>
        <th v-if="expandable"></th>
      </tr>
      <template v-for="item in paginatedItems">
        <tr :key="item">
          <td v-if="selectable">
            <input
              type="checkbox"
              @click="toggleCheck(item)"
              :value="selected.includes(item)"
            />
          </td>
          <td v-for="header in headers" :key="header.name">
            <slot :name="`${header.value}_cell`" v-bind="{ item }">
              {{ item[header.value] }}
            </slot>
          </td>
          <td v-if="expandable" @click="toggleExpand(item)">Expand</td>
        </tr>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <tr v-if="expandable && expanded.value.includes(item)">
          <td :colspan="headers.length + 1">
            <slot name="expanded" v-bind="{ item }">
              Replace me with a slot named expanded!
            </slot>
          </td>
        </tr>
      </template>
    </table>

    <button @click="nextPage">Next Page</button>
    <button @click="previousPage">Prev Page</button>
  </div>
</template>
<script lang="ts">
import createTable from "@/composition/table";
import {
  ref,
  reactive,
  PropType,
  Prop,
  defineComponent,
  toRef,
  Ref,
  computed
} from "vue";

interface Properties {
  headers: { name: string; value: string }[];
  items: any[];
  perPage: number;
  [key: string]: unknown;
}
export default defineComponent({
  props: {
    headers: {
      type: Array
    },
    items: {
      type: Array
    },
    perPage: Number,
    search: String,
    expandable: Boolean,
    selectable: Boolean,
    expanded: {
      type: Array,
      default: () => ref(["Default"])
    }
  },
  setup(props) {
    const table = createTable(
      props.items as any[],
      props.perPage as number,
      toRef(props, "search") as Ref<string>
    );

    const selected = ref([]);

    function headerKey(key: string) {
      const order = table.sortedKeys.value.get(key);
      if (order == undefined || order == 0) {
        return "-";
      }
      if (order == 1) {
        return "v";
      }
      return "^";
    }

    function toggleExpand(item: any) {
      if (props.expanded.value.includes(item)) {
        // eslint-disable-next-line vue/no-mutating-props
        props.expanded.value = props.expanded.value.filter(x => x != item);
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        props.expanded.value.push(item);
      }
    }

    function toggleCheck(item: any) {
      if (selected.value.includes(item)) {
        selected.value = selected.value.filter(x => x != item);
      } else {
        selected.value.push(item);
      }
    }
    return {
      headerKey,
      selected,
      toggleExpand,
      toggleCheck,
      ...table
    };
  }
});
</script>
