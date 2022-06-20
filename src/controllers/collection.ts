import { Request, Response } from "express";
import { service } from "../storage/main";

export class CollectionController {
  async create(req: Request, res: Response) {
    const { collection } = await service.collection.create(req.body);

    console.log("BEFORE RESPONSE", collection);

    res.status(201).json({
      success: true,
      collection,
    });
    try {
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const collection = await service.collection.update(
        userId?.toString()!,
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        ...collection,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async getCollection(req: Request, res: Response) {
    try {
      const collection = await service.collection.getCollection(req.params.id);

      res.status(200).json({
        success: true,
        ...collection,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async deleteCollection(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      await service.collection.delete(userId?.toString()!, req.params.id);

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
