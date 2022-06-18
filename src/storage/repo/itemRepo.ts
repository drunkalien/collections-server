import { IItem } from "../../models/Item";

export interface ItemRepo {
  get(id: string): Promise<IItem>;
  create(userId: string, colelctionId: string, payload: IItem): Promise<IItem>;
  update(userId: string, id: string, payload: object): Promise<IItem>;
  delete(userId: string, id: string): Promise<void>;
}
