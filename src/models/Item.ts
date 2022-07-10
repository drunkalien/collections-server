import mongoose, { Document, Schema, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  tags: string[];
  numberOfLikes: number;
  likedBy: string[];
  itemCollection: mongoose.Schema.Types.ObjectId;
  customFields: [];
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
      type: String,
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
