// import supertest from "supertest";
// import { Order } from "../../models/order";
// import { User } from "../../models/user";
// import jwt from "jsonwebtoken";
// import app from "../../server";
// import { Product } from "../../models/product";

// const request = supertest(app);

// describe("test /orders endpoint", () => {
//   let token: string;
//   beforeAll(() => {
//     const user: User = {
//       first_name: "khloud",
//       last_name: "abdelazeem",
//       password: "password123",
//     };
//     token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
//   });

//   it("should return 200 status code", async () => {
//     const user_id = 1;
//     const response = await request
//       .get(`/orders/${user_id}/current`)
//       .set({ authorization: token });
//     expect(response.status).toBe(200);
//   });
//   it("should return 200 status code", async () => {
//     const order: Order = {
//       user_id: 1,
//       status: "active",
//     };
//     const response = await request
//       .post(`/orders`)
//       .send(order)
//       .set({ authorization: token });
//     expect(response.status).toBe(200);
//   });
//   it("should return 200 status code", async () => {
//     const user_id = 1;

//     const product: Product = {
//       name: "chocolate",
//       price: 2,
//       category: "extra",
//     };
//     const response = await request
//       .post(`/orders/${user_id}/products`)
//       .send(product)
//       .set({ authorization: token });
//     expect(response.status).toBe(200);
//   });
// });
