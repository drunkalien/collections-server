import mongoose, { Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  tags: string[];
  author: mongoose.Schema.Types.ObjectId;
  image: string;
  comments: mongoose.Schema.Types.ObjectId[];
  customFields: mongoose.Schema.Types.ObjectId;
}

const CollectionSchema = new mongoose.Schema<ICollection>({
  name: {
    type: String,
    required: true,
  },
  tags: [],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  customFields: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomFields",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
