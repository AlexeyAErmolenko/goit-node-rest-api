// За допомогою Jest
// • відповідь повина мати статус-код 200
// • у відповіді повинен повертатися токен
// • у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

// const { DB_URI } = process.env;
const DB_URI = process.env.DB_URI;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");

    // await UserActivation.deleteMany();
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_URI);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "ivan@vbydke.net",
      password: "123456789",
    });

    console.log("🚀 ~ response:", response);

    const user = {
      email: response.body.data.user.email,
      subscription: response.body.data.user.subscription,
    };

    expect(response.statusCode).toBe(200);
    // expect(response.body.data.user.token).toBe("");
    expect(user).toBe({ email: "ivan@vbydke.net", subscription: "starter" });
    // expect(response.body.data.user.subscription).toBe("starter");
  });
});
