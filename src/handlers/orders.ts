import { Application, Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';

const store = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.show(+ req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const order = await store.create(newOrder);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const order = await store.update(newOrder.status, + req.params.id);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.delete(+ req.params.id);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const { quantity, productId } = req.body;
  const orderId = +req.params.id;

  try {
    const newProduct = await store.addProduct(quantity, orderId, productId);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const ordersRoutes = (app: Application) => {
  app.get('/orders', getAllOrders);
  app.get('/orders/:id', getSingleOrder);
  app.post('/orders', createOrder);
  app.put('/orders/:id', updateOrder);
  app.delete('/orders/:id', deleteOrder);
  app.post('/orders/:id/products', addProduct);
};

export default ordersRoutes;