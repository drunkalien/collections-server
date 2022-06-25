import mongoose, { Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description: string;
  tags: string[];
  author: mongoose.Schema.Types.ObjectId;
  image: string;
  customFields: mongoose.Schema.Types.ObjectId;
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
  customFields: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomFields",
  },
});

CollectionSchema.index({ "$**": "text" });

const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
