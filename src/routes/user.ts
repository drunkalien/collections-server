import { Router } from "express";

import { UserController } from "../controllers/user";
import { auth } from "../middlewares/auth";

const controller = new UserController();

const router = Router();

router.route("/signup").post(controller.create);
router.route("/signin").post(controller.signIn);
router
  .route("/:username")
  .get(controller.findOne)
  .delete(auth, controller.delete);
router.route("/:id/collections").get(controller.getUserCollections);
router.route("/user/me").get(controller.getCurrentUser);
router.route("/user-by-id/:id").get(controller.getCurrentUser);

export default router;
