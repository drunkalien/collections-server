import mongoose, { Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description: string;
  tags: string[];
  author: mongoose.Schema.Types.ObjectId;
  image: string;
  docType: "collection";
  customFields: mongoose.Schema.Types.ObjectId;
  numberOfItems: number;
}

const CollectionSchema = new mongoose.Schema<ICollection>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  tags: [],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  docType: { type: String, default: "collection" },
  numberOfItems: {
    type: Number,
    default: 0,
  },
  customFields: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomFields",
  },
});

CollectionSchema.index({ "$**": "text" });

const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
