import { Router } from "express";

import { ItemController } from "../controllers/item";
import { auth } from "../middlewares/auth";

const controller = new ItemController();

const router = Router();

router.route("/").post(controller.create);
router
  .route("/:id")
  .patch(auth, controller.update)
  .get(controller.get)
  .delete(auth, controller.delete);
router.route("/like-unlike/:id").post(auth, controller.likeUnlike);
router.route("/:id/comments").get(controller.getItemComments);
router.route("/get/latest").get(controller.latestItems);

export default router;
