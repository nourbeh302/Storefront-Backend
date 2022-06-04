import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot retrieve all products`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id = ($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot retrieve product with id ${id}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;`;
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create new product`);
    }
  }

  async update(newProduct: Product, oldProductId: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products SET name = ($2), price = ($3) WHERE id = ($1) RETURNING *;`;
      const result = await conn.query(sql, [
        oldProductId,
        newProduct.name,
        newProduct.price,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update product with id ${oldProductId}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE id = ($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete product with id ${id}`);
    }
  }
}
