import { Request, Response } from "express";

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
      const { collectionId, userId } = req.query;
      const item = await service.item.update(
        userId?.toString()!,
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
      const { userId } = req.query;
      await service.item.delete(userId?.toString()!, req.body);

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
