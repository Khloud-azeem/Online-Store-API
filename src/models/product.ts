import Pool from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Pool.connect();
      const sql = "SELECT * FROM products;";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await Pool.connect();
      const sql = `SELECT * FROM products WHERE id = ${id};`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await Pool.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
      const res = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
}
