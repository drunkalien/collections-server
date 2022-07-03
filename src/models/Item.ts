import mongoose, { Document, Schema, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  tags: string[];
  numberOfLikes: number;
  likedBy: mongoose.Schema.Types.ObjectId[];
  itemCollection: mongoose.Schema.Types.ObjectId;
  customFields: mongoose.Schema.Types.ObjectId;
}

const ItemSchema = new mongoose.Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      default: [],
    },
  ],
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  itemCollection: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customFields: [],
});

ItemSchema.index({ "$**": "text" });

const Item = mongoose.model("Item", ItemSchema);

export default Item;
