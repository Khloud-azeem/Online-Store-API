"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('test /orders endpoint', () => {
    const order = {
        prod_id: 1,
        user_id: 1,
        quantity: 1,
        status: "active"
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoia2hsb3VkIiwibGFzdF9uYW1lIjoiYWJkZWxhemVlbSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRJbUdzdTN1T25lVUNRMW5Ta2wwdXcuLnJTcEhnQ3Y2cnVkWDBJV0Ryb24xdE4yR2F6dXEuLiJ9LCJpYXQiOjE2NjU2MDg2Njd9.J6HxdhWOryB-x4csqOp2TruaUTmBcAJAoGb_FgpYgAE";
    it('should return 200 status code and a list of current orders of a specific user given the user id ', async () => {
        const user_id = 1;
        const response = await request
            .get(`/orders/${user_id}`)
            .set({ "authorization": token });
        expect(response.status).toBe(200);
    });
});
