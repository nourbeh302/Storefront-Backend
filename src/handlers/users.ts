import { Application, Request, Response } from "express";
import { UserStore, User } from "../models/user";
import { sign } from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken";

const store = new UserStore();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await store.show(+req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    const user = await store.create(newUser);
    const token = sign(user, process.env.SECRET_TOKEN as unknown as string);
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    const user = await store.update(newUser, +req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await store.delete(+req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const usersRoutes = (app: Application) => {
  app.get("/users", verifyToken, getAllUsers);
  app.get("/users/:id", verifyToken, getSingleUser);
  app.post("/users", createUser);
  app.put("/users/:id", verifyToken, updateUser);
  app.delete("/users/:id", verifyToken, deleteUser);
};

export default usersRoutes;
