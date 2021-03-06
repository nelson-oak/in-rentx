import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX', NOW())
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const test = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest 1",
        description: "Category Supertest Description 1",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(test.status).toBe(201);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest 1");
  });
});
