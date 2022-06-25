import { IUser } from "../../models/User";
import { service } from "../main";
import { AdminRepo } from "../repo/adminRepo";
import AppError from "../../utils/AppError";

export class AdminService implements AdminRepo {
  async addAdmin(id: string): Promise<IUser> {
    try {
      const user = await service.user.update(id, { role: "Admin" });
      if (!user) {
        throw new AppError(404, "Not found!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async removeAdmin(id: string): Promise<IUser> {
    try {
      const user = await service.user.update(id, { role: "User" });
      if (!user) {
        throw new AppError(404, "Not found!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async block(id: string): Promise<IUser> {
    try {
      const user = await service.user.update(id, { isBlocked: true });
      if (!user) {
        throw new AppError(404, "Not found!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async unblock(id: string): Promise<IUser> {
    try {
      const user = await service.user.update(id, { isBlocked: false });
      if (!user) {
        throw new AppError(404, "Not found!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
