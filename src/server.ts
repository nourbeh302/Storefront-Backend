import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { Order, OrderStore } from "./models/order";
import usersRoutes from "./handlers/users";
import productsRoutes from "./handlers/products";
import ordersRoutes from "./handlers/orders";

config();

const app: Application = express();
const port: number = (process.env.SERVER_PORT as unknown as number) || 8001;

let store = new OrderStore()

app.use(express.json())

usersRoutes(app)
productsRoutes(app)
ordersRoutes(app)

app.listen(port, () => console.log(`App running on port ${port}`));
