import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

describe('Orders spec', () => {
  describe('testing order methods', () => {
    it('gets all orders', () => {
      expect(store.index).toBeDefined();
    });

    it('gets single order', () => {
      expect(store.show).toBeDefined();
    });

    it('creates new order', () => {
      expect(store.show).toBeDefined();
    });

    it('updates an existing order', () => {
      expect(store.update).toBeDefined();
    });

    it('deletes an order', () => {
      expect(store.delete).toBeDefined();
    });

    it('adds a product to an order', () => {
      expect(store.delete).toBeDefined();
    });
  });
})