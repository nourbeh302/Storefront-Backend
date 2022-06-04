import client from '../database';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id, firstName, lastName FROM users;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot retrieve all users, error: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id, firstName, lastName FROM users WHERE id = ($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot retrieve user with id ${id}, error: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING id, firstName, lastName;`;
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create new user, error: ${error}`);
    }
  }

  async update(newUser: User, oldUserId: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET firstName = ($2), lastName = ($3), password = ($4) WHERE id = ($1) RETURNING id, firstName, lastName;`;
      const result = await conn.query(sql, [
        oldUserId,
        newUser.firstName,
        newUser.lastName,
        newUser.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update user with id ${oldUserId}, error: ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE id = ($1) RETURNING id, firstName, lastName;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete user with id ${id}, error: ${error}`);
    }
  }
}