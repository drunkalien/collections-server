import { Router } from "express";

import { CollectionController } from "../controllers/collection";

const controller = new CollectionController();

const router = Router();

router.route("/").post(controller.create);
router
  .route("/:id")
  .patch(controller.update)
  .get(controller.getCollection)
  .delete(controller.deleteCollection);

export default router;
