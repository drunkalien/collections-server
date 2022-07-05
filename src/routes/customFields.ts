import { Router } from "express";

import { CustomFieldsController } from "../controllers/customFields";
import { auth } from "../middlewares/auth";

const router = Router();
const controller = new CustomFieldsController();

router.route("/create").post(auth, controller.create);

export default router;
