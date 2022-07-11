import { RoleType } from "../../models/User";
import { ICollection } from "../../models/Collection";
import { IItem } from "../../models/Item";

export interface CollectionRepo {
  create(payload: object): Promise<ICollection>;
  update(
    userId: string,
    role: RoleType,
    collectionId: string,
    payload: object
  ): Promise<ICollection>;
  delete(userId: string, role: RoleType, collectionId: string): Promise<void>;
  getCollection(id: string): Promise<ICollection | null>;
  getCollectionItems(collectionId: string): Promise<IItem[]>;
  largestCollections(): Promise<ICollection[]>;
}
