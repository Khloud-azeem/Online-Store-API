import { Order, OrderStore } from "../../models/order";

describe("test order model", () => {
  const orderStore = new OrderStore();

  const currentOrder: Order = {
    user_id: 1,
    status: "active",
  };
  const completedOrder: Order = {
    user_id: 1,
    status: "active",
  };
  it("showCurrentOrder", async () => {
    const user_id = 1;
    const result = await orderStore.showCurrentOrder(user_id);
    expect(result).toBe(currentOrder);
  });
  it("showCompletedOrders", async () => {
    const user_id = 1;
    const result = await orderStore.showCompletedOrders(user_id);
    expect(result).toBe([completedOrder]);
  });
  it("create", async () => {
    const result = await orderStore.create(currentOrder);
    expect(result).toBe(currentOrder);
  });
});
