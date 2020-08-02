import { ref, computed, reactive, Ref } from "vue";

export default function tableComponent(
  this: any,
  items: any[],
  perPage: number,
  search?: Ref<string | undefined>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  const sortedKeys = ref(new Map<string, number>());
  const currentPage = ref(1);
  const clonedItems = ref(items.slice(0));
  const filteredItems = computed(() => {
    console.log("Filter function invoked");
    if (search?.value == undefined) {
      return clonedItems.value;
    }
    // Setting page to 1 so filter doesn't hide results when paginated.
    currentPage.value = 1;
    return clonedItems.value.filter(item => {
      const found = Object.keys(item).map(key => {
        const value = item[key];
        if (typeof value == "string") {
          return value
            .toLowerCase()
            .includes((search.value as string).toLowerCase());
        }
        if (typeof value == "number") {
          return item[key] == parseInt(search.value as string, 10);
        }

        return false;
      });
      return found.includes(true);
    });
  });
  const pages = computed(() => Math.ceil(filteredItems.value.length / perPage));

  const paginatedItems = computed(() =>
    filteredItems.value.slice(
      currentPage.value * perPage - perPage,
      perPage * currentPage.value
    )
  );

  function _resetSortingForOtherKeys(key: string) {
    Array.from(sortedKeys.value.keys()).forEach(sortKey => {
      if (sortKey != key) {
        sortedKeys.value.set(sortKey, 0);
      }
    });
  }

  function sortTableByKey(key: string) {
    let currentOrder = sortedKeys.value.get(key) ?? 1;
    if (currentOrder == 0) {
      currentOrder = 1;
    }
    sortedKeys.value.set(key, currentOrder * -1);

    _resetSortingForOtherKeys(key);

    clonedItems.value = clonedItems.value.slice(0).sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) {
        return -1 * currentOrder;
      }
      if (aValue > bValue) {
        return 1 * currentOrder;
      }
      return 0;
    });
  }

  function nextPage() {
    if (currentPage.value + 1 <= pages.value) {
      currentPage.value += 1;
    }
  }

  function previousPage() {
    if (currentPage.value - 1 >= 1) {
      currentPage.value -= 1;
    }
  }

  return {
    currentPage,
    paginatedItems,
    sortedKeys,
    sortTableByKey,
    nextPage,
    previousPage
  };
}
