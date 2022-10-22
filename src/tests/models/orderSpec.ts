import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";

describe("test order model", () => {
  const orderStore = new OrderStore();
  const userStore = new UserStore();

  beforeAll(async () => {
    const user: User = {
      first_name: "Khloud",
      last_name: "Abdelazeem",
      password: "pasword123",
    };
    await userStore.create(user);
  });

  const currentOrder: Order = {
    user_id: 2,
    status: "active",
  };

  it("create", async () => {
    const result = await orderStore.create(currentOrder);
    expect(result).toEqual({
      id: 2,
      user_id: 2,
      status: "active",
    });
  });
  it("showCurrentOrder", async () => {
    const user_id = 2;
    const result = await orderStore.showCurrentOrder(user_id);
    expect(result).toEqual({
      id: 2,
      user_id: 2,
      status: "active",
    });
  });
  afterAll(async () => {
    await orderStore.delete_(2);
    await userStore.delete_(2);
  });
});
