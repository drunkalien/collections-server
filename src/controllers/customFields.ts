import { Request, Response } from "express";

import { service } from "../storage/main";

export class CustomFieldsController {
  async create(req: Request, res: Response) {
    try {
      const customFields = await service.customFields.create(req.body);

      res.status(200).json({
        success: true,
        ...customFields,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
