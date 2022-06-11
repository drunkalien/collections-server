import mongoose, { Document } from "mongoose";

interface IItem extends Document {
  name: string;
  tags: string[];
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
  itemCollection: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customFields: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
