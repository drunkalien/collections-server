import Router from "express";

import { CommentController } from "../controllers/comment";
import { auth } from "../middlewares/auth";

const controller = new CommentController();
const router = Router();

router.route("/").post(auth, controller.create);
router
  .route("/:id")
  .get(controller.get)
  .patch(auth, controller.update)
  .delete(auth, controller.delete);

export default router;
