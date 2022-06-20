import { Router } from "express";

import { UserController } from "../controllers/user";

const controller = new UserController();

const router = Router();

router.route("/signup").post(controller.create);
router.route("/signin").post(controller.signIn);
router.route("/:id").get(controller.findOne).delete(controller.delete);
router.route("/:id/collections").get(controller.getUserCollections);

export default router;
