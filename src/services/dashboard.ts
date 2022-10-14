import Pool from "../database";
import { Order } from "../models/order";
import { Product } from "../models/product";

export class Dashboard{
    async showProductsByCategory(category: string): Promise<Product[]> {
        try {
          const conn = await Pool.connect();
          const sql = `SELECT * FROM products WHERE category = $1;`;
          const res = await conn.query(sql, [category]);
          conn.release();
          return res.rows;
        } catch (err) {
          console.log(err);
          throw new Error(`${err}`);
        }
      }
      async showTop5Products() {
        try {
          const conn = await Pool.connect();
          const sql = `SELECT name FROM products INNER JOIN orders_products ON products.id = orders_products.product_id LIMIT 5;`;
          const res = await conn.query(sql);
          conn.release();
          return res.rows;
        } catch (err) {
          console.log(err);
          throw new Error(`${err}`);
        }
      }
      async showCompletedOrders(user_id: number): Promise<Order[]> {
        try {
          const conn = await Pool.connect();
          const sql = `SELECT * FROM orders WHERE (user_id = $1 AND status = 'complete');`;
          const res = await conn.query(sql, [user_id]);
          conn.release();
          return res.rows;
        } catch (err) {
          console.log(err);
          throw new Error(`${err}`);
        }
      }
}