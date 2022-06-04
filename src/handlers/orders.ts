import { Application, Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';
import { verifyToken } from '../middlewares/verifyToken';

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
  app.get('/orders', verifyToken, getAllOrders);
  app.get('/orders/:id', verifyToken, getSingleOrder);
  app.post('/orders', verifyToken, createOrder);
  app.put('/orders/:id', verifyToken, updateOrder);
  app.delete('/orders/:id', verifyToken, deleteOrder);
  app.post('/orders/:id/products', verifyToken, addProduct);
};

export default ordersRoutes;