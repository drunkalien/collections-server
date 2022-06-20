import { IComment } from "../../models/Comment";
import { RoleType } from "../../models/User";
import { Types } from "mongoose";

export interface CommentRepo {
  create(payload: IComment): Promise<IComment>;
  update(
    id: string,
    userId: Types.ObjectId,
    role: RoleType,
    payload: object
  ): Promise<IComment>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<IComment>;
}
