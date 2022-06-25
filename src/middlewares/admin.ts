import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { service } from "../storage/main";

export async function admin(req: Request, res: Response, next: NextFunction) {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(401, "Unauthorized!");
  }

  const decoded: any = jwt.verify(token, "secret");
  const user = await service.user.findById(decoded.id);

  if (user && user.role === "User") {
    throw new AppError(403, "Permission denied!");
  }

  if (user && user.role === "Admin") {
    next();
  }
}
