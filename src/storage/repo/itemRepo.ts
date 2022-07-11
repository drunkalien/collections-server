import { IItem } from "../../models/Item";
import { IComment } from "../../models/Comment";
import { Schema } from "mongoose";
import { RoleType } from "../../models/User";

export interface ItemRepo {
  get(id: string): Promise<IItem>;
  create(userId: string, colelctionId: string, payload: IItem): Promise<IItem>;
  update(
    userId: string,
    role: RoleType,
    id: string,
    payload: object
  ): Promise<IItem>;
  delete(userId: string, role: RoleType, id: string): Promise<void>;
  likeUnlike(userId: Schema.Types.ObjectId, id: string): Promise<void>;
  getItemCommetns(id: string): Promise<IComment[]>;
  latestItems(): Promise<IItem[]>;
}
