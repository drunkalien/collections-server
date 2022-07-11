import { Router } from "express";

import { CollectionController } from "../controllers/collection";
import { singleUploadCtrl } from "../middlewares/multer";
import { auth } from "../middlewares/auth";

const controller = new CollectionController();
const router = Router();

router.route("/").post(auth, singleUploadCtrl, controller.create);
router
  .route("/:id")
  .patch(auth, controller.update)
  .get(controller.getCollection)
  .delete(auth, controller.deleteCollection);
router.route("/:id/items").get(controller.getCollectionItems);
router.route("/get/largest").get(controller.largestCollections);

export default router;
