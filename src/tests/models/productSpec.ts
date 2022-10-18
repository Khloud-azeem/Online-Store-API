import { Product, ProductStore } from "../../models/product";

describe("test order model", () => {
  const productStore = new ProductStore();

  const product: Product = {
    name: "chocolate",
    price: 2,
    category: "extra",
  };

  it("create", async () => {
    const result = await productStore.create(product);
    expect(result).toBe(product);
  });
  it("index", async () => {
    const result = await productStore.index();
    expect(result).toBe([product]);
  });
  it("show", async () => {
    const prod_id = 1;
    const result = await productStore.show(prod_id);
    expect(result).toBe(product);
  });
});
