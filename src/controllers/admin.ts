import { Request, Response } from "express";
import { service } from "../storage/main";

export class AdminController {
  async addAdmin(req: Request, res: Response) {
    try {
      const user = await service.admin.addAdmin(req.params.id);

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

  async removeAdmin(req: Request, res: Response) {
    try {
      const user = await service.admin.removeAdmin(req.params.id);

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

  async block(req: Request, res: Response) {
    try {
      const user = await service.admin.block(req.params.id);

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

  async unblock(req: Request, res: Response) {
    try {
      const user = await service.admin.block(req.params.id);

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
}
