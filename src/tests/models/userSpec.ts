import { UserStore, User } from "../../models/user";
import bcrypt from "bcrypt";

describe("test user model", () => {
    const userStore = new UserStore();

    const user: User = {
        first_name: "Khloud",
        last_name: "Abdelazeem",
        password: "pasword123"
    };
    beforeAll(async () => {
        await userStore.create(user);
    })

    it("create", async () => {
        expect(userStore.create).toBeDefined();
    });
    it("show", async () => {
        const user_id = 3;
        const result = await userStore.show(user_id);
        expect(result).toBeDefined();
    });
    it("index", async () => {
        const result = await userStore.index();
        expect(result).toBeDefined();
    });
    it("delete", async () => {
        expect(userStore.delete_).toBeDefined();
    });
});