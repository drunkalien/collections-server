import { CollectionRepo } from "../repo/collectionRepo";
import Collection, { ICollection } from "../../models/Collection";
import AppError from "../../utils/AppError";
import { canAlter } from "../../utils/canAlter";

export class CollectionService implements CollectionRepo {
  async create(payload: object): Promise<ICollection> {
    try {
      const collection = await Collection.create(payload);

      return collection.toObject();
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: string,
    collectionId: string,
    payload: object
  ): Promise<ICollection> {
    try {
      let collection = await this.getCollection(collectionId);

      if (collection && canAlter(userId, collection)) {
        collection = await Collection.findByIdAndUpdate(collectionId, payload);
      }

      if (!collection) {
        throw new AppError(404, "Collection not found");
      }

      return collection;
    } catch (error) {
      throw error;
    }
  }

  async getCollection(id: string): Promise<ICollection | null> {
    try {
      const collection = await Collection.findById(id);

      if (!collection) {
        throw new AppError(404, "Collection not found");
      }

      return collection;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string, collectionId: string): Promise<void> {
    try {
      const collection = await this.getCollection(collectionId);
      if (!collection) {
        throw new AppError(404, "Collection not found");
      }

      if (collection && canAlter(userId, collection)) {
        await Collection.findByIdAndDelete();
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserCollections(userId: string): Promise<ICollection[]> {
    try {
      const collections = Collection.find({ author: userId });

      return collections;
    } catch (error) {
      throw error;
    }
  }
}
