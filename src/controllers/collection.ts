import { Request, Response } from "express";
import { service } from "../storage/main";
import { buffTo64 } from "../utils/buffTo64";
import { cloudinaryUpload } from "../utils/cloudinaryUpload";

export class CollectionController {
  async create(req: Request, res: Response) {
    let file64;
    let image = "";
    if (req.file) {
      file64 = buffTo64(req.file);
      const uploadResult = await cloudinaryUpload(file64);
      image = uploadResult.url;
    }
    const { collection } = await service.collection.create({
      ...req.body,
      image,
    });

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

  async getCollectionItems(req: Request, res: Response) {
    try {
      const items = await service.collection.getCollectionItems(req.params.id);

      res.status(200).json({
        success: true,
        items,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
