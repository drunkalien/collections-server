import { Request, Response } from "express";
import { service } from "../storage/main";

export class SearchController {
  async search(req: Request, res: Response) {
    try {
      const { keyword } = req.query;
      const results = await service.search.search(keyword as string);
      res.status(200).json({
        success: true,
        results,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}
