import { User, UserStore } from "../models/user";

const store = new UserStore();

describe('Testing suite for user model', () => {
  describe('testing user methods', () => {
    it('gets all users', () => {
      expect(store.index).toBeDefined();
    });

    it('gets single user', () => {
      expect(store.show).toBeDefined();
    });

    it('creates new user', async () => {
      expect(store.show).toBeDefined();
    });

    it('updates an existing user', () => {
      expect(store.update).toBeDefined();
    });

    it('deletes a user', async () => {
      expect(store.delete).toBeDefined();
    });
  });
})