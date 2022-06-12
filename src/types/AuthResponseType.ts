import { IUser } from "../models/User";

type AuthResponseType = {
  token: string;
  user: IUser;
};

export default AuthResponseType;
