import { IComment } from "../../models/Comment";

export interface CommentRepo {
  create(payload: IComment): Promise<IComment>;
  update(id: string, payload: object): Promise<IComment>;
  delete(id: string): Promise<void>;
}
