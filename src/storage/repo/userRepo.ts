import { IUser } from "../../models/User";
import { ICollection } from "../../models/Collection";

export interface UserRepo {
  findOne(username: string): Promise<IUser>;
  create(payload: IUser): Promise<IUser>;
  signIn(payload: { username: string; password: string }): Promise<IUser>;
  getUserCollections(userId: string): Promise<ICollection[]>;
}
