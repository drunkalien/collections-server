import { Types } from "mongoose";

import { ICustomFields } from "../../models/CustomFields";

export interface CustomFieldsRepo {
  create(payload: object): Promise<ICustomFields>;
  getCollectionCustomFields(id: Types.ObjectId): Promise<ICustomFields[]>;
}
