import { Request, Response } from "express";
import { RoleType } from "../models/User";

import { service } from "../storage/main";

export class ItemController {
  async get(req: Request, res: Response) {
    try {
      const item = await service.item.get(req.params.id);

      res.status(200).json({
        success: true,
        ...item,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { collectionId, userId } = req.query;
      const item = await service.item.create(
        userId?.toString()!,
        collectionId?.toString()!,
        req.body
      );

      res.status(201).json({
        success: true,
        ...item,
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
      const { collectionId, userId, role } = req.query;
      const item = await service.item.update(
        userId?.toString()!,
        role?.toString()! as RoleType,
        collectionId?.toString()!,
        req.body
      );

      res.status(200).json({
        success: true,
        ...item,
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
      await service.item.delete(
        userId?.toString()!,
        role?.toString()! as RoleType,
        req.body
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

  async likeUnlike(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      console.log(userId, req.params.id);
      await service.item.likeUnlike(userId as any, req.params.id);

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error,
      });
    }
  }

  async getItemComments(req: Request, res: Response) {
    try {
      const comments = await service.item.getItemCommetns(req.params.id);
      res.status(200).json({
        success: true,
        comments,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
