"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products;";
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id = ${id};`;
            const res = await conn.query(sql);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
            const res = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async showTop5() {
        try {
            const conn = await database_1.default.connect();
            const sql = ``;
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async showByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE category = $1;`;
            const res = await conn.query(sql, [category]);
            conn.release();
            return res.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
