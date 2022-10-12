import bcrypt from "bcrypt";
import Pool from "../database";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Pool.connect();
      const sql = "SELECT * FROM users;";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await Pool.connect();
      const sql = `SELECT * FROM users WHERE id = ${id};`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = process.env.SALT_ROUNDS;
      const hashedPass = bcrypt.hashSync(
        user.password + (pepper as string),
        parseInt(saltRounds as string)
      );
      const conn = await Pool.connect();
      const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *;`;
      const res = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hashedPass,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
}
