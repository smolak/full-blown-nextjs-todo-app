import { v4 as uuid } from "uuid";

export interface Item {
  id: string;
}

export type ItemId = Item["id"];

// Using Promises to mimic adapter-like client
export interface DataStorageInterface<T> {
  addItem: (itemData: T) => Promise<T & Item>;
  getItem: (id: ItemId) => Promise<(T & Item) | undefined>;
  getAllItems: () => Promise<ReadonlyArray<T & Item>>;
  updateItem: (id: ItemId, itemData: T) => Promise<T & Item>;
  removeItem: (id: ItemId) => Promise<boolean>;
}

export class DataStorage<T> implements DataStorageInterface<T> {
  #items: Record<ItemId, T & Item> = {};

  addItem(itemData: T) {
    const item = {
      ...itemData,
      id: uuid(),
    };

    this.#items[item.id] = item;

    return Promise.resolve(item);
  }

  getItem(id: ItemId) {
    return Promise.resolve(this.#items[id]);
  }

  getAllItems() {
    return Promise.resolve(Object.values(this.#items));
  }

  updateItem(id: ItemId, itemData: T) {
    this.#items[id] = {
      ...this.#items[id],
      ...itemData,
    };

    return Promise.resolve(this.#items[id]);
  }

  removeItem(id: ItemId) {
    const itemIsInDB = Boolean(this.#items[id]);

    if (itemIsInDB) {
      delete this.#items[id];
    }

    return Promise.resolve(itemIsInDB);
  }
}
