import mongoose from "mongoose";

import { CollectionRepo } from "../repo/collectionRepo";
import Collection, { ICollection } from "../../models/Collection";
import Item, { IItem } from "../../models/Item";
import AppError from "../../utils/AppError";
import { canAlter } from "../../utils/canAlter";
import { RoleType } from "../../models/User";
import { service } from "../main";

type TCollection = {
  name: string;
  tags?: string[];
  description: string;
  author: mongoose.Schema.Types.ObjectId;
  image?: string;
  customFields: string;
};

export class CollectionService implements CollectionRepo {
  async create(payload: TCollection): Promise<ICollection> {
    try {
      let customFields;

      const collection = await Collection.create({
        name: payload.name,
        description: payload.description,
        author: payload.author,
        image: payload.image ? payload.image : "",
      });

      if (payload.customFields) {
        customFields = await service.customFields.create({
          customFields: JSON.parse(payload.customFields),
          parent: collection._id,
        });
      }

      if (customFields) {
        collection.customFields = customFields._id;
        await collection.save();
      }
      console.log(payload);

      return collection.toObject();
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: string,
    role: RoleType,
    collectionId: string,
    payload: object
  ): Promise<ICollection> {
    try {
      let collection = await this.getCollection(collectionId);

      if ((collection && canAlter(userId, collection)) || role === "Admin") {
        collection = await Collection.findByIdAndUpdate(collectionId, payload, {
          new: true,
        });
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

      return collection.toObject();
    } catch (error) {
      throw error;
    }
  }

  async delete(
    userId: string,
    role: RoleType,
    collectionId: string
  ): Promise<void> {
    try {
      const collection = await this.getCollection(collectionId);
      if (!collection) {
        throw new AppError(404, "Collection not found");
      }

      if ((collection && canAlter(userId, collection)) || role === "Admin") {
        await Collection.findByIdAndDelete();
      }
    } catch (error) {
      throw error;
    }
  }

  async getCollectionItems(collectionId: string): Promise<IItem[]> {
    try {
      const items = await Item.find({ itemCollection: collectionId });

      return items;
    } catch (error) {
      throw error;
    }
  }

  async largestCollections(): Promise<ICollection[]> {
    try {
      const collections = await Collection.find()
        .sort({ numberOfItems: -1 })
        .limit(5);

      return collections;
    } catch (error) {
      throw error;
    }
  }
}
