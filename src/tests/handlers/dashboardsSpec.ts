import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
import { User, UserStore } from "../../models/user";

const request = supertest(app);

describe("test /dashboards endpoint", () => {
  const userStore = new UserStore();

  let token: string;
  beforeAll(async () => {
    const user: User = {
      first_name: "khloud",
      last_name: "abdelazeem",
      password: "password123",
    };
    token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    return await request.post('/users')
      .set('Authorization', 'Bearer' + token)
      .send(user);
  });

  it("get /products/category/:category should return 200 status code", async () => {
    const category = "extra";
    const response = await request.get(`/products/category/${category}`);
    expect(response.status).toBe(200);
  });
  it("get /orders/:user_id/completed should return 200 status code", async () => {
    const user_id = 1;
    const response = await request
      .get(`/orders/${user_id}/completed`)
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    return await userStore.delete_(1);
  });
});
