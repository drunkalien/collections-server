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
    console.log(req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
  } else {
    const error = new AppError(401, "Unauthorized!");
    res.status(401).json({
      success: false,
      error,
    });
    return;
  }

  const decoded: any = jwt.verify(token, "secret");

  if (!decoded) {
    const error = new AppError(403, "Permission denied!");
    res.status(403).json({
      success: false,
      error,
    });
    return;
  }

  const user = await service.user.findById(decoded.id);

  if (user && user.isBlocked) {
    const error = new AppError(403, "Permission denied!");

    res.status(403).json({
      success: false,
      error,
    });

    return;
  }

  if (user) {
    next();
  }
}
