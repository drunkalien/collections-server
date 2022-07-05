import { RoleType } from "../../models/User";
import Comment, { IComment } from "../../models/Comment";
import AppError from "../../utils/AppError";
import { CommentRepo } from "../repo/commentRepo";
import { Types } from "mongoose";

export class CommentService implements CommentRepo {
  async create(payload: IComment): Promise<IComment> {
    try {
      const comment = await Comment.create(payload);

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<IComment> {
    try {
      const comment = await Comment.findById(id);

      if (!comment) {
        throw new AppError(404, "Comment not found!");
      }

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    userId: Types.ObjectId,
    role: RoleType,
    payload: object
  ): Promise<IComment> {
    try {
      let commentToUpdate = await this.get(id);
      let comment;

      if (
        (commentToUpdate &&
          userId.toString() === commentToUpdate.author.toString()) ||
        role === "Admin"
      ) {
        comment = await Comment.findByIdAndUpdate(id, payload, { new: true });
      } else {
        throw new AppError(
          403,
          "You have no permission to alter the comments!"
        );
      }

      if (!commentToUpdate) {
        throw new AppError(404, "Comment not found!");
      }

      if (!comment) {
        throw new AppError(404, "Comment not found!");
      }

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async delete(
    id: string,
    userId: Types.ObjectId,
    role: RoleType
  ): Promise<void> {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new AppError(404, "Comment not found");
      }

      if (comment.author.toString() === userId.toString() || role === "Admin") {
        await Comment.findByIdAndDelete(id);
      } else {
        throw new AppError(403, "You cannot delete this comment");
      }
    } catch (error) {
      throw error;
    }
  }
}
