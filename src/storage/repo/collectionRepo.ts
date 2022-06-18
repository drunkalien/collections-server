import { ICollection } from "../../models/Collection";

export interface CollectionRepo {
  create(payload: object): Promise<ICollection>;
  update(
    userId: string,
    collectionId: string,
    payload: object
  ): Promise<ICollection>;
  delete(userId: string, collectionId: string): Promise<void>;
  getCollection(id: string): Promise<ICollection | null>;
}
