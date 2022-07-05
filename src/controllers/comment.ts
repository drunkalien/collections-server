import { Request, Response } from "express";
import { service } from "../storage/main";
import { RoleType } from "../models/User";

export class CommentController {
  async create(req: Request, res: Response) {
    try {
      const comment = await service.comment.create(req.body);

      res.status(201).json({
        success: true,
        ...comment,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const comment = await service.comment.get(req.params.id);
      res.status(200).json({
        success: true,
        comment,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { role, userId } = req.query;
      const comment = await service.comment.update(
        req.params.id,
        userId?.toString() as any,
        role?.toString() as RoleType,
        req.body
      );

      res.status(200).json({
        success: true,
        comment,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId, role } = req.query;
      await service.comment.delete(
        req.params.id,
        userId?.toString() as any,
        role as RoleType
      );

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
