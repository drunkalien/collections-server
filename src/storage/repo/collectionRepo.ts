import { ICollection } from "../../models/Collection";

export interface CollectionRepo {
  create(payload: object): Promise<ICollection>;
  update(id: string, payload: object): Promise<ICollection>;
  getCollection(id: string): Promise<ICollection | null>;
}
