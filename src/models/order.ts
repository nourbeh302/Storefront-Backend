import client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot retrieve all orders, error: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id = ($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot retrieve order with id ${id}, error: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;`;
      const result = await conn.query(sql, [order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create new order, error: ${error}`);
    }
  }

  async update(status: string, oldOrderId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders SET status = ($2) WHERE id = ($1) RETURNING *;`;
      const result = await conn.query(sql, [oldOrderId, status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot update order with id ${oldOrderId}, error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete order with id ${id}, error: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;`;
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot add product with product_id of ${productId} to order_id of ${orderId}, ${error}`
      );
    }
  }
}