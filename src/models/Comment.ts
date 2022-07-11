import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  author: mongoose.Schema.Types.ObjectId;
  commentedTo: mongoose.Schema.Types.ObjectId;
  body: string;
  docType: "comment";
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    body: {
      type: String,
      required: true,
    },
    docType: {
      type: String,
      default: "comment",
    },
  },
  {
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

CommentSchema.index({ "$**": "text" });

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
