import { IItem } from "../../models/Item";

export interface ItemRepo {
  get(id: string): Promise<IItem>;
  create(payload: IItem): Promise<IItem>;
  update(id: string, payload: object): Promise<IItem>;
  delete(id: string): Promise<void>;
}
