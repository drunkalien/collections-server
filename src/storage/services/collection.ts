import { CollectionRepo } from "../repo/collectionRepo";
import Collection, { ICollection } from "../../models/Collection";
import AppError from "../../utils/AppError";

export class CollectionService implements CollectionRepo {
  async create(payload: object): Promise<ICollection> {
    try {
      const collection = await Collection.create(payload);

      return collection;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: object): Promise<ICollection> {
    try {
      const collection = await Collection.findByIdAndUpdate(id, payload);

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
      const collection = Collection.findById(id);

      if (!collection) {
        throw new AppError(404, "Collection not found");
      }

      return collection;
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
