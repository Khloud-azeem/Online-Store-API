import { Order } from "../../models/order";
import { Product } from "../../models/product";
import { Dashboard } from "../../services/dashboard";

describe("test dashboard", () => {
  const dashBoard = new Dashboard();

  const completedOrder: Order = {
    user_id: 1,
    status: "active",
  };
  it("showCompletedOrders", async () => {
    const user_id = 1;
    const result = await dashBoard.showCompletedOrders(user_id);
    expect(result).toBe([completedOrder]);
  });
  it("showProductsByCategory", async () => {
    const product: Product = {
      name: "chocolate",
      price: 2,
      category: "extra",
    };
    const category = "extra";
    const result = await dashBoard.showProductsByCategory(category);
    expect(result).toBe([product]);
  });
});
