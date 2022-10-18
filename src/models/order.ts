import Pool from "../database";

export type Order = {
  id?: number;
  user_id: number;
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
  async create(order: Order): Promise<Order> {
    try {
      const conn = await Pool.connect();
      //ensure user exists
      const sql1 = `SELECT id from users WHERE id = ${order.user_id};`;
      const user = await conn.query(sql1);
      console.log(user);
      if (user.rows.length == 0) {
        throw new Error("Couldn't find a user with this user id");
      }
      const sql2 = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;`;
      const res = await conn.query(sql2, [order.user_id, order.status]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
  async addProduct(
    product_id: number,
    order_id: number,
    quantity: number
  ) {
    try {
      const conn = await Pool.connect();
      //ensure product isn't added to a completed order
      const sql1 = `SELECT status FROM orders WHERE id = ${order_id}`;
      const status = await conn.query(sql1);
      if (status.rows[0].status == "complete") {
        throw new Error(
          "Couldn't add product because order status is complete"
        );
      }
      const sql2 = `INSERT INTO orders_products (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;`;
      const res = await conn.query(sql2, [product_id, order_id, quantity]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
}
