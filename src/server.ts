import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { Order, OrderStore } from "./models/order";

config();

const app: Application = express();
const port: number = (process.env.SERVER_PORT as unknown as number) || 8001;

let store = new OrderStore()

app.use(express.json())

app.get("/", async (req: Request, res: Response) => {
  let order = await store.index();
  res.json(order)
});

app.get("/:id", async (req: Request, res: Response) => {
  let order = await store.show(+ req.params.id);
  res.json(order)
});

app.post("/", async (req: Request, res: Response) => {

  let newOrder: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }

  let order = await store.create(newOrder);
  res.json(order)
});

app.put("/:id", async (req: Request, res: Response) => {
  
  let newOrder: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }

  let order = await store.update(newOrder.status, + req.params.id);
  res.json(order)
});

app.delete("/:id", async (req: Request, res: Response) => {
  let order = await store.delete(+ req.params.id);
  res.json(order)
});

app.listen(port, () => console.log(`App running on port ${port}`));
