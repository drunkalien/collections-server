import { Types } from "mongoose";

import { CustomFieldsRepo } from "../repo/customFieldsRepo";
import CustomFields, { ICustomFields } from "../../models/CustomFields";
import AppError from "../../utils/AppError";

export class CustomFieldsService implements CustomFieldsRepo {
  async create(payload: any): Promise<ICustomFields> {
    try {
      console.log(payload);
      const customFields = await CustomFields.create({
        customFields: payload.customFields,
        parent: payload.parent,
      });

      return customFields.toObject();
    } catch (error) {
      console.log(payload);
      throw error;
    }
  }

  async getCollectionCustomFields(id: Types.ObjectId): Promise<ICustomFields> {
    try {
      const customFields = await CustomFields.findOne({ parent: id });

      if (!customFields) {
        throw new AppError(404, "Not found");
      }

      return customFields.toObject();
    } catch (error) {
      throw error;
    }
  }
}
