import { Order, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";
import { Dashboard } from "../../services/dashboard";

describe("test dashboard", () => {
  const dashBoard = new Dashboard();
  const productStore = new ProductStore();
  const orderStore = new OrderStore();
  const userStore = new UserStore();

  it("showCompletedOrders", async () => {
    const user: User = {
      first_name: "Khloud",
      last_name: "Abdelazeem",
      password: "pasword123"
    };
    await userStore.create(user);

    const completedOrder: Order = {
      user_id: 1,
      status: "complete",
    };
    await orderStore.create(completedOrder);

    const user_id = 1;
    const result = await dashBoard.showCompletedOrders(user_id);
    expect(result).toEqual([{
      id: 1,
      user_id: 1,
      status: "complete",
    }]);
  });

  it("showProductsByCategory", async () => {
    const product: Product = {
      name: "chocolate",
      price: 2,
      category: "extra",
    };
    await productStore.create(product)

    const category = "extra";
    const result = await dashBoard.showProductsByCategory(category);
    expect(result).toEqual([{
      id: 1,
      name: "chocolate",
      price: 2,
      category: "extra",
    }]);

  });

  afterAll(async () => {
    await orderStore.delete_(1);
    await productStore.delete_(1);
    await userStore.delete_(1);
  })
});
