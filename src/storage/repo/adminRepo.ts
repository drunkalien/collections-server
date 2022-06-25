import { IUser } from "../../models/User";

export interface AdminRepo {
  addAdmin(id: string): Promise<IUser>;
  removeAdmin(id: string): Promise<IUser>;
  block(id: string): Promise<IUser>;
  unblock(id: string): Promise<IUser>;
}
