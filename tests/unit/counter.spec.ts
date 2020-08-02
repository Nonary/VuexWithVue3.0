import setupCounter, { clicks, resetClicks } from "@/composition/counter";

describe("Counter tests", () => {
  let counter = setupCounter();

  beforeEach(() => {
    counter = setupCounter();
    resetClicks();
  });

  it("On increase, should increase count by one", () => {
    counter.increase();

    expect(counter.count.value).toEqual(1);
  });

  it("On getting doubled, should multiply the count by 2", () => {
    counter.count.value = 10;

    expect(counter.doubled.value).toEqual(20);
  });

  it("On decrease, should decrease count by one", () => {
    counter.decrease();

    expect(counter.count.value).toEqual(-1);
  });

  it("On increasing, should increment clicks by one", () => {
    counter.increase();

    expect(clicks.value).toEqual(1);
  });

  it("On decreasing, should increment clicks by one", () => {
    counter.decrease();

    expect(clicks.value).toEqual(1);
  });

  it("On resetting clicks, should set clicks to zero", () => {
    clicks.value = 1;

    resetClicks();

    expect(clicks.value).toEqual(0);
  });
});
