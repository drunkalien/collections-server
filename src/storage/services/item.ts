import AppError from "../../utils/AppError";
import Item, { IItem } from "../../models/Item";
import { ItemRepo } from "../repo/itemRepo";
import { service } from "../main";
import { canAlter } from "../../utils/canAlter";
import { Schema, Types } from "mongoose";

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

  async create(
    userId: string,
    collectionId: string,
    payload: IItem
  ): Promise<IItem> {
    try {
      const collection = await service.collection.getCollection(collectionId);

      if (!collection) {
        throw new AppError(404, "Collection not found!");
      }

      if (!canAlter(userId, collection)) {
        throw new AppError(
          403,
          "Permission denied for altering the collection!"
        );
      }

      const item = await Item.create(payload);

      return item.toObject();
    } catch (error) {
      throw error;
    }
  }

  async update(userId: string, id: string, payload: object): Promise<IItem> {
    try {
      let item: IItem | null = await this.get(id);
      let collection;

      if (item) {
        collection = await service.collection.getCollection(
          item.itemCollection.toString()
        );
      }

      if (!collection) {
        throw new AppError(404, "Collection not found!");
      }

      if (item && collection && canAlter(userId, collection)) {
        item = await Item.findByIdAndUpdate(id, payload);
      }

      if (!item) {
        throw new AppError(404, "Item not found");
      }

      return item;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string, id: string): Promise<void> {
    try {
      const item = await this.get(id);
      let collection;

      if (item) {
        collection = await service.collection.getCollection(
          item.itemCollection.toString()
        );
      }

      if (!item) throw new AppError(404, "Item not found!");
      if (!collection) throw new AppError(404, "Collection not found!");

      if (item && collection && canAlter(userId, collection)) {
        await Item.findByIdAndDelete(id);
      }
    } catch (error) {
      throw error;
    }
  }

  async likeUnlike(userId: Schema.Types.ObjectId, id: string): Promise<void> {
    try {
      const item = await this.get(id);

      if (!item) {
        throw new AppError(404, "Item not found!");
      }

      if (!item.likedBy.includes(userId)) {
        item.likedBy.push(userId);
        item.numberOfLikes++;
        await item.save();
      } else {
        item.numberOfLikes--;
        await Item.findOneAndUpdate(
          { _id: id },
          {
            $pull: {
              likedBy: userId,
            },
          }
        ).exec();
        await item.save();
      }
    } catch (error) {
      throw error;
    }
  }
}
