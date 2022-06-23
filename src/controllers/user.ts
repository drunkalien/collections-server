import { Request, Response } from "express";
import { service } from "../storage/main";
import { buffTo64 } from "../utils/buffTo64";
import { cloudinaryUpload } from "../utils/cloudinaryUpload";

export class UserController {
  async findOne(req: Request, res: Response) {
    try {
      const { username } = req.query;
      const user = await service.user.findOne(username?.toString()!);

      res.status(200).json({
        success: true,
        ...user,
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
      let file64;
      let avatar = "";
      if (req.file) {
        file64 = buffTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64);
        avatar = uploadResult.url;
      }
      const user = await service.user.create({ ...req.body, avatar });

      res.status(201).json({
        success: true,
        ...user,
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
      let file64;
      let avatar = "";
      let user;
      if (req.file) {
        file64 = buffTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64);
        avatar = uploadResult.url;
        user = await service.user.update(req.params.id, {
          ...req.body,
          avatar,
        });
      } else {
        user = await service.user.update(req.params.id, req.body);
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const user = await service.user.signIn(req.body);

      res.status(201).json({
        success: true,
        ...user,
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
      await service.user.delete(req.body);

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }

  async getUserCollections(req: Request, res: Response) {
    try {
      const collections = await service.user.getUserCollections(req.params.id);

      res.status(201).json({
        success: true,
        collections,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
