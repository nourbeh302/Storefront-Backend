import { Application, Request, Response } from 'express';
import { ProductStore, Product } from '../models/product';
import { verifyToken } from '../middlewares/verifyToken';

const store = new ProductStore();

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.show(+ req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const product = await store.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const product = await store.update(newProduct, + req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.delete(+ req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const productsRoutes = (app: Application) => {
  app.get('/products', getAllProducts);
  app.get('/products/:id', getSingleProduct);
  app.post('/products', verifyToken, createProduct);
  app.put('/products/:id', verifyToken, updateProduct);
  app.delete('/products/:id', verifyToken, deleteProduct);
};

export default productsRoutes;