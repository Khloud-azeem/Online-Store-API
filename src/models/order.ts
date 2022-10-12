import Pool from "../database";

export type Order = {
  id?: number;
  prod_id: number;
  user_id: number;
  quantity: number;
  status: string;
};

export class OrderStore {
  async showCurrentOrder(user_id: number): Promise<Order> {
    try {
      const conn = await Pool.connect();
      const sql = `SELECT * FROM orders WHERE (user_id = $1 AND status = 'active');`;
      const res = await conn.query(sql, [user_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
  async showCompletedOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await Pool.connect();
      const sql = `SELECT * FROM orders WHERE (user_id = ${user_id} AND status = 'complete');`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await Pool.connect();
      const sql = `INSERT INTO orders (product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *;`;
      const res = await conn.query(sql, [
        order.prod_id,
        order.user_id,
        order.quantity,
        order.status,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
}
