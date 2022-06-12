import Comment, { IComment } from "../../models/Comment";
import AppError from "../../utils/AppError";
import { CommentRepo } from "../repo/commentRepo";

export class CommentService implements CommentRepo {
  async create(payload: IComment): Promise<IComment> {
    try {
      const comment = await Comment.create(payload);

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: object): Promise<IComment> {
    try {
      const comment = await Comment.findByIdAndUpdate(id, { payload });

      if (!comment) {
        throw new AppError(404, "Comment not found");
      }

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Comment.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
