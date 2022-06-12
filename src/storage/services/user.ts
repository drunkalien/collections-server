import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepo } from "../repo/userRepo";
import User, { IUser } from "../../models/User";
import Collection, { ICollection } from "../../models/Collection";
import AppError from "../../utils/AppError";
import config from "../../config/config";
import AuthResponseType from "../../types/AuthResponseType";

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

  async create(payload: IUser): Promise<AuthResponseType> {
    try {
      const user = await User.create(payload);

      const token = await jwt.sign({ id: user?.id }, config.JwtSecret);

      return { user, token };
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
  }): Promise<AuthResponseType> {
    try {
      const user = await User.findOne({ username });

      const token = await jwt.sign({ id: user?.id }, config.JwtSecret);

      if (!user) {
        throw new AppError(404, "Invalid username or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new AppError(404, "Invalid username or password");
      }

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId);
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
