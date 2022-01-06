import { v4 as uuid } from "uuid";

export interface Item {
  id: string;
}

// Using Promises to mimic adapter-like client
export interface DataStorageInterface<T> {
  addItem: (itemData: T) => Promise<T & Item>;
  getAllItems: () => Promise<ReadonlyArray<T & Item>>;
  updateItem: (id: Item["id"], itemData: T) => Promise<T & Item>;
  removeItem: (id: Item["id"]) => Promise<boolean>;
}

export class DataStorage<T> implements DataStorageInterface<T> {
  #items: Record<Item["id"], T & Item> = {};

  addItem(itemData: T) {
    const item = {
      ...itemData,
      id: uuid(),
    };

    this.#items[item.id] = item;

    return Promise.resolve(item);
  }

  getAllItems() {
    return Promise.resolve(Object.values(this.#items));
  }

  updateItem(id: Item["id"], itemData: T) {
    this.#items[id] = {
      ...this.#items[id],
      ...itemData,
    };

    return Promise.resolve(this.#items[id]);
  }

  removeItem(id: Item["id"]) {
    const itemIsInDB = Boolean(this.#items[id]);

    if (itemIsInDB) {
      delete this.#items[id];
    }

    return Promise.resolve(itemIsInDB);
  }
}
