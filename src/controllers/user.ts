import { Request, Response } from "express";
import { service } from "../storage/main";

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
      const user = await service.user.create(req.body);

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
