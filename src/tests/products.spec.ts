import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

describe('Products spec', () => {
  describe('testing product methods', () => {
    it('gets all products', () => {
      expect(store.index).toBeDefined();
    });

    it('gets single product', () => {
      expect(store.show).toBeDefined();
    });

    it('creates new product', () => {
      expect(store.show).toBeDefined();
    });

    it('updates an existing product', () => {
      expect(store.update).toBeDefined();
    });

    it('deletes a product', () => {
      expect(store.delete).toBeDefined();
    });
  });
})