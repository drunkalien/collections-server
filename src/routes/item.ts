import { Router } from "express";

import { ItemController } from "../controllers/item";

const controller = new ItemController();

const router = Router();

router.route("/").post(controller.create);
router
  .route("/:id")
  .patch(controller.update)
  .get(controller.get)
  .delete(controller.delete);

export default router;
