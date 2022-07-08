import { IComment } from "../../models/Comment";
import { RoleType } from "../../models/User";
import { Types } from "mongoose";

export interface CommentRepo {
  create(
    item: Types.ObjectId,
    author: Types.ObjectId,
    payload: IComment
  ): Promise<IComment>;
  update(
    id: string,
    userId: Types.ObjectId,
    role: RoleType,
    payload: object
  ): Promise<IComment>;
  delete(id: string, userId: Types.ObjectId, role: RoleType): Promise<void>;
  get(id: string): Promise<IComment>;
}
