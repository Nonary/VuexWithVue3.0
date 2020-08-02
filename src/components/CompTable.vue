<template>
  <div>
    <table>
      <tr>
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
      </tr>
      <tr v-for="item in paginatedItems" :key="item">
        <td v-for="header in headers" :key="header.name">
          <slot :name="`${header.value}_cell`" v-bind="{ item }">
            {{ item[header.value] }}
          </slot>
        </td>
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
