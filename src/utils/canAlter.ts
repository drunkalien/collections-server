import { ICollection } from "../models/Collection";

export function canAlter(user: string, collection: ICollection): boolean {
  return user === collection.author.toString();
}
