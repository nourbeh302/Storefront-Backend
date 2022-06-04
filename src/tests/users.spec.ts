import supertest from "supertest";
import app from "../server";
import { User, UserStore } from "../models/user";
import { sign } from "jsonwebtoken";

const request = supertest(app);

const store = new UserStore();
const newUser: User = {
  firstName: "Nour Eldin",
  lastName: "Samir",
  password: "nourbeh302",
};

const token = sign(newUser, process.env.SECRET_TOKEN as string);

describe("Users spec", () => {
  describe("testing user methods", () => {
    it("gets all users", () => {
      expect(store.index).toBeDefined();
    });

    it("gets single user", () => {
      expect(store.show).toBeDefined();
    });

    it("creates new user", async () => {
      expect(store.create).toBeDefined();
    });

    it("updates an existing user", () => {
      expect(store.update).toBeDefined();
    });

    it("deletes a user", async () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe("testing user endpoints", () => {
    describe("GET /", () => {
      it("gets all users without giving out token", async () => {
        const response = await request.get("/users");
        expect(response.status).toBe(401);
      });

      it("gets all users giving the token", async () => {
        const response = await request
          .get("/users")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    describe("GET /:id", () => {
      it("gets user with id of 2 without giving out token", async () => {
        const response = await request.get("/users/2");
        expect(response.status).toBe(401);
      });

      it("gets user with id of 2 using the token", async () => {
        const response = await request
          .get("/users/2")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    beforeAll(async () => {
      const testUser: User = {
        firstName: "Stephanie",
        lastName: "Cole",
        password: "cscs2004",
      };
      const response = await request.post("/users").send(testUser);
      expect(response.status).toBe(201);
    });

    describe("PUT /:id", () => {
      it("updates a user without the token", async () => {
        const testUser: User = {
          firstName: "Marry",
          lastName: "Cole",
          password: "mcmc2004",
        };
        const response = await request.put("/users/4").send(testUser);
        expect(response.status).toBe(401);
      });

      it("updates a user by giving token", async () => {
        const testUser: User = {
          firstName: "Marry",
          lastName: "Cole",
          password: "mcmc2004",
        };
        const response = await request
          .put("/users/4")
          .send(testUser)
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });

    afterAll(async () => {
      const response = await request
        .delete("/users/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    afterAll(async () => {
      const response = await request
        .delete("/users/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
