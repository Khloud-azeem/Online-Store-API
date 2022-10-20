import { Product, ProductStore } from "../../models/product";

describe("test product model", () => {
  const productStore = new ProductStore();

  const product: Product = {
    name: "chocolate",
    price: 2,
    category: "extra",
  };

  it("create", async () => {
    const result = await productStore.create(product);
    expect(result).toEqual({
      id: 2,
      name: "chocolate",
      price: 2,
      category: "extra",
    });
  });
  it("index", async () => {
    const result = await productStore.index();
    expect(result).toEqual([{
      id: 2,
      name: "chocolate",
      price: 2,
      category: "extra",
    }]);
  });
  it("show", async () => {
    const prod_id = 2;
    const result = await productStore.show(prod_id);
    expect(result).toEqual({
      id: 2,
      name: "chocolate",
      price: 2,
      category: "extra",
    });
  });
  it("delete", async () => {
    expect(productStore.delete_).toBeDefined();
  });

  afterAll(async () => {
    await productStore.delete_(2);
  })
});
