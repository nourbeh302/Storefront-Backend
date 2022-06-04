import supertest from "supertest";
import app from "../server";
import { User } from "../models/user";
import { sign } from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

const request = supertest(app);

const store = new ProductStore();
const newUser: User = {
  firstName: "Nour Eldin",
  lastName: "Samir",
  password: "nourbeh302",
};

const token = sign(newUser, process.env.SECRET_TOKEN as string);

describe("Products spec", () => {
  describe("testing product methods", () => {
    it("gets all products", () => {
      expect(store.index).toBeDefined();
    });

    it("gets single product", () => {
      expect(store.show).toBeDefined();
    });

    it("creates new product", () => {
      expect(store.create).toBeDefined();
    });

    it("updates an existing product", () => {
      expect(store.update).toBeDefined();
    });

    it("deletes a product", () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe("testing product endpoints", () => {
    describe("GET /", () => {
      it("gets all products", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
      });
    });

    describe("GET /:id", () => {
      it("gets product with id of 2", async () => {
        const response = await request.get("/products/2");
        expect(response.status).toBe(200);
      });
    });

    beforeAll(async () => {
      const testProduct: Product = {
        name: "PlayStation 5 Console",
        price: 500,
      };
      const response = await request.post("/products").send(testProduct);
      expect(response.status).toBe(401);
    });

    beforeAll(async () => {
      const testProduct: Product = {
        name: "PlayStation 5 Console",
        price: 500,
      };
      const response = await request
        .post("/products")
        .send(testProduct)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(201);
    });

    it("updates a product without the token", async () => {
      const testProduct: Product = {
        name: "PlayStation 4 Console",
        price: 350,
      };
      const response = await request.put("/products/1").send(testProduct);
      expect(response.status).toBe(401);
    });

    it("updates a product by giving token", async () => {
      const testProduct: Product = {
        name: "PlayStation 4 Console",
        price: 350,
      };
      const response = await request
        .put("/products/1")
        .send(testProduct)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    afterAll(async () => {
      const response = await request.delete("/products/1");
      expect(response.status).toBe(401);
    });

    afterAll(async () => {
      const response = await request
        .delete("/products/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
