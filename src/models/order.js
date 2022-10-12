"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
var status;
(function (status) {
    status[status["active"] = 0] = "active";
    status[status["complete"] = 1] = "complete";
})(status || (status = {}));
class OrderStore {
    async showCurrentOrder(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE (user_id = $1 AND status = 'active');`;
            const res = await conn.query(sql, [user_id]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async showCompletedOrders(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE (user_id = ${user_id} AND status = 'complete');`;
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO orders (product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *;`;
            const res = await conn.query(sql, [
                order.prod_id,
                order.user_id,
                order.quantity,
                order.status,
            ]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
