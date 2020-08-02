import tableFunction from "@/composition/table";
import { ref, Ref } from "vue";

describe("Table tests", () => {
  it("On sorting by key, should default to ascending first", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 2);

    table.sortTableByKey("name");

    expect(table.paginatedItems.value).toEqual([{ name: "A" }, { name: "B" }]);
  });

  it("On sorting by key, if key is sorted twice should be descending order", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 2);

    table.sortTableByKey("name");
    table.sortTableByKey("name");

    expect(table.paginatedItems.value).toEqual([{ name: "B" }, { name: "A" }]);
  });

  it("On sorting by key, all other keys should be reset", () => {
    const table = tableFunction(
      [
        { name: "A", duration: 0 },
        { name: "B", duration: 1 }
      ],
      2
    );

    table.sortTableByKey("name");
    table.sortTableByKey("duration");
    table.sortTableByKey("name");

    expect(table.paginatedItems.value).toEqual([
      { name: "A", duration: 0 },
      { name: "B", duration: 1 }
    ]);
  });

  it("On searching, items should filter out based off all keys", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 2, ref("B"));

    expect(table.paginatedItems.value).toEqual([{ name: "B" }]);
  });

  it("On nextPage, should remove previous items in the offset", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1);

    table.nextPage();

    expect(table.paginatedItems.value.length).toEqual(1);

    expect(table.paginatedItems.value[0].name).toEqual("B");
  });

  it("On nextPage, if page exceeds maximum, should return back same items", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1);

    let result = table.nextPage();
    result = table.nextPage();

    expect(table.paginatedItems.value.length).toEqual(1);
  });

  it("On previousPage, if page is less than 1, should return back same items", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1);

    table.previousPage();

    expect(table.paginatedItems.value.length).toEqual(1);
  });

  it("On previousPage, should reduce page by 1", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1);

    table.nextPage();
    table.previousPage();

    expect(table.currentPage.value).toEqual(1);
  });

  it("On nextPage, should increase currentPage by 1", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1);

    table.nextPage();

    expect(table.currentPage.value).toEqual(2);
  });

  it("On filtering, if page is above 1, should set back to 1", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1, ref("B"));

    table.nextPage();

    expect(table.currentPage.value).toEqual(1);
  });

  it("On filtering, if value is string, should not be case sensitive", () => {
    const table = tableFunction([{ name: "A" }, { name: "B" }], 1, ref("a"));

    expect(table.paginatedItems.value.length).toEqual(1);
  });

  it("On filtering, if value is number, should filter based off equality after parsing", () => {
    const table = tableFunction(
      [
        { name: "A", duration: 2 },
        { name: "B", duration: 1 }
      ],
      1,
      ref("1")
    );

    expect(table.paginatedItems.value.length).toEqual(1);
  });
});
