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
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    const error = new AppError(401, "Unauthorized!");
    res.status(401).json({
      success: false,
      error,
    });
  }

  const decoded: any = jwt.verify(token, "secret");
  const user = await service.user.findById(decoded.id);

  if (user && user.isBlocked) {
    const error = new AppError(403, "Permission denied!");

    res.status(403).json({
      success: false,
      error,
    });
  }

  if (user) {
    next();
  }
}
