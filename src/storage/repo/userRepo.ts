import { IUser } from "../../models/User";
import { ICollection } from "../../models/Collection";
import AuthResponseType from "../../types/AuthResponseType";

export interface UserRepo {
  findOne(username: string): Promise<IUser>;
  create(payload: IUser): Promise<AuthResponseType>;
  signIn(payload: {
    username: string;
    password: string;
  }): Promise<AuthResponseType>;
  delete(userId: string): Promise<void>;
  getUserCollections(userId: string): Promise<ICollection[]>;
}
