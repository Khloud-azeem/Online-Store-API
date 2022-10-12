import supertest from "supertest";
import { Order } from "../../models/order";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import app from "../../server";

const request = supertest(app);

describe("test /orders endpoint", () => {
  let token: string;
  beforeAll(() => {
    const user: User = {
      first_name: "khloud",
      last_name: "abdelazeem",
      password: "password123",
    };
    token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
  });

  it("should return 200 status code", async () => {
    const user_id = 1;
    const response = await request
      .get(`/orders/${user_id}`)
      .set({ authorization: token });
    expect(response.status).toBe(200);
  });
  it("should return 200 status code", async () => {
    const user_id = 1;
    const response = await request
      .get(`/orders/completed/${user_id}`)
      .set({ authorization: token });
    expect(response.status).toBe(200);
  });
  it("should return 200 status code", async () => {
    const order: Order = {
      prod_id: 1,
      user_id: 1,
      quantity: 1,
      status: "active",
    };
    const response = await request
      .post(`/orders`)
      .send(order)
      .set({ authorization: token });
    expect(response.status).toBe(200);
  });
});
