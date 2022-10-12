"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users;";
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE id = ${id};`;
            const res = await conn.query(sql);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(user) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            const hashedPass = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *;`;
            const res = await conn.query(sql, [
                user.first_name,
                user.last_name,
                hashedPass,
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
exports.UserStore = UserStore;
