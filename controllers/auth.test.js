// За допомогою Jest
// • відповідь повина мати статус-код 200
// • у відповіді повинен повертатися токен
// • у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

import mongoose, { isValidObjectId } from "mongoose";
import { app } from "../app.js";
import supertest from "supertest";

mongoose.set("strictQuery", false);

const { DB_URI } = process.env;
if (!DB_URI) {
  console.error("Помилка: Змінна середовища DB_URI не визначена.");
  process.exit(1); // Завершуємо процес з помилкою
}

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_URI);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "ivan@vbydke.net",
      password: "123456789",
    });

    const user = {
      email: response.body.user.email,
      subscription: response.body.user.subscription,
    };

    expect(response.statusCode).toBe(200);
    expect(response.body.token).isValidObjectId;
    expect(user).toStrictEqual({
      email: "ivan@vbydke.net",
      subscription: "starter",
    });
  });
});
