import { UserRepo } from "../repo/userRepo";
import User, { IUser } from "../../models/User";
import Collection, { ICollection } from "../../models/Collection";
import AppError from "../../utils/AppError";

export class UserService implements UserRepo {
  async findOne(username: string): Promise<IUser> {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AppError(404, "Invalid user");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: IUser): Promise<IUser> {
    try {
      const user = await User.create(payload);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<IUser> {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AppError(404, "Invalid username or password");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserCollections(userId: string): Promise<ICollection[]> {
    try {
      const collections = Collection.find({ author: userId });

      return collections;
    } catch (error) {
      throw error;
    }
  }
}
