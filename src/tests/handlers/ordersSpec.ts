import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import { Dashboard } from "../../services/dashboard";

const request = supertest(app);

describe("test /orders endpoint", () => {
    const userStore = new UserStore();
    const orderStore = new OrderStore();
    const dashBoard = new Dashboard();

    let token: string;
    beforeAll(async () => {
        const user: User = {
            first_name: "khloud",
            last_name: "abdelazeem",
            password: "password123",
        };
        await userStore.create(user);
        token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    });

    it("post /orders should return 200 status code", async () => {
        const order: Order = {
            user_id: 1,
            status: "active",
        };
        const response = await request
            .post(`/orders`)
            .send(order)
            .set({ authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
    });
    it("get /orders/:user_id/current should return 200 status code", async () => {
        const user_id = 1;
        const response = await request
            .get(`/orders/${user_id}/current`)
            .set({ authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
    });
    it("post /orders/:user_id/products should return 200 status code", async () => {
        const productStore = new ProductStore();
        const product: Product = {
            name: "chocolate",
            price: 2,
            category: "extra"
        }
        await productStore.create(product);

        const user_id = 1;
        const order_id = 1;
        const product_id = 1;
        const product_order = {
            order_id: order_id,
            product_id: product_id,
            quantity: 2,
        };
        const response = await request
            .post(`/orders/${user_id}/products`)
            .send(product_order)
            .set({ authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await dashBoard.deleteProductFromOrder(1)
        await orderStore.delete_(1)
        await userStore.delete_(1)
    })
});
