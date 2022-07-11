import mongoose, { Document } from "mongoose";

export interface ICustomFields extends Document {
  customFields: object[];
  parent: mongoose.Schema.Types.ObjectId;
}

const CustomFieldsSchema = new mongoose.Schema<ICustomFields>(
  {
    customFields: [],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const CustomFields = mongoose.model<ICustomFields>(
  "CustomFields",
  CustomFieldsSchema
);

export default CustomFields;
