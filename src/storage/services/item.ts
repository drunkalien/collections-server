import AppError from "../../utils/AppError";
import Item, { IItem } from "../../models/Item";
import { ItemRepo } from "../repo/itemRepo";

export class ItemService implements ItemRepo {
  async get(id: string): Promise<IItem> {
    try {
      const item = await Item.findById(id);
      if (!item) {
        throw new AppError(404, "Item not found");
      }

      return item;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: IItem): Promise<IItem> {
    try {
      const item = await Item.create(payload);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: object): Promise<IItem> {
    try {
      const item = await Item.findByIdAndUpdate(id, payload);

      if (!item) {
        throw new AppError(404, "Item not found");
      }

      return item;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Item.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
