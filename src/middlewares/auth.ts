import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError";
import { service } from "../storage/main";

export async function auth(req: Request, res: Response, next: NextFunction) {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split("")[1];
  }

  if (!token) {
    throw new AppError(401, "Unauthorized!");
  }

  const decoded: any = jwt.verify(token, "secret");
  const user = await service.user.findById(decoded.id);

  if (user) {
    next();
  }
}
