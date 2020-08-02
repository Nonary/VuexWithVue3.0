<template>
  <div>
    <table>
      <tr>
        <th
          v-for="header in headers"
          :key="header.name"
          @click="sortTableByKey(header.value)"
        >
          {{ header.name }}
          <span>{{ headerKey(header.value) }}</span>
        </th>
      </tr>
      <tr v-for="item in paginatedItems" :key="item">
        <slot :name="`${item.value}_cell`" v-bind="item">
          <td v-for="header in headers" :key="header.name">
            {{ item[header.value] }}
          </td>
        </slot>
      </tr>
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
    search: String
  },
  setup(props) {
    const table = createTable(
      props.items as any[],
      props.perPage as number,
      toRef(props, "search") as Ref<string>
    );

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
    return {
      headerKey,
      ...table
    };
  }
});
</script>
