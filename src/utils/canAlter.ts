import { ICollection } from "../models/Collection";

export function canAlter(user: string, collection: ICollection): boolean {
  if (user !== collection.author.toString()) {
    return false;
  }
  return true;
}
