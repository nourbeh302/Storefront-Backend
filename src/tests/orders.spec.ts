import supertest from "supertest";
import app from "../server";
import { User } from "../models/user";
import { sign } from "jsonwebtoken";
import { Order, OrderStore } from "../models/order";

const request = supertest(app);

const store = new OrderStore();
const newUser: User = {
  firstName: "Nour Eldin",
  lastName: "Samir",
  password: "nourbeh302",
};

const token = sign(newUser, process.env.SECRET_TOKEN as string);

describe("Orders spec", () => {
  describe("testing order methods", () => {
    it("gets all orders", () => {
      expect(store.index).toBeDefined();
    });

    it("gets single order", () => {
      expect(store.show).toBeDefined();
    });

    it("creates new order", () => {
      expect(store.create).toBeDefined();
    });

    it("updates an existing order", () => {
      expect(store.update).toBeDefined();
    });

    it("deletes a order", () => {
      expect(store.delete).toBeDefined();
    });

    it("adds a product to an order", () => {
      expect(store.addProduct).toBeDefined();
    });
  });

  describe("testing order endpoints", () => {
    describe("GET /", () => {
      it("gets all orders without giving out token", async () => {
        const response = await request.get("/orders");
        expect(response.status).toBe(401);
      });

      it("gets all orders by giving out the token", async () => {
        const response = await request
          .get("/orders")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    describe("GET /:id", () => {
      it("gets order with id of 2 without giving out token", async () => {
        const response = await request.get("/orders/2");
        expect(response.status).toBe(401);
      });

      it("gets order with id of 2 by giving out token", async () => {
        const response = await request
          .get("/orders/2")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    beforeAll(async () => {
      const testOrder: Order = {
        status: "Ongoing",
        userId: 2,
      };
      const response = await request.post("/orders").send(testOrder);
      expect(response.status).toBe(401);
    });

    beforeAll(async () => {
      const testOrder: Order = {
        status: "Ongoing",
        userId: 2,
      };
      const response = await request
        .post("/orders")
        .send(testOrder)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(201);
    });

    describe("PUT /:id", () => {
      it("updates a order without the token", async () => {
        const testOrder: Order = {
          status: "Completed",
          userId: 1,
        };
        const response = await request.put("/orders/1").send(testOrder);
        expect(response.status).toBe(401);
      });

      it("updates a order by giving token", async () => {
        const testOrder: Order = {
          status: "Completed",
          userId: 1,
        };
        const response = await request
          .put("/orders/1")
          .send(testOrder)
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    afterAll(async () => {
      const response = await request.delete("/orders/1");
      expect(response.status).toBe(401);
    });

    afterAll(async () => {
      const response = await request
        .delete("/orders/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
