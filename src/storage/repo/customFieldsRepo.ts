import { ICustomFields } from "../../models/CustomFields";

export interface CustomFieldsRepo {
  create(payload: object): Promise<ICustomFields>;
}
