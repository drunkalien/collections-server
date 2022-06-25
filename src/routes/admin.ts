import { Router } from "express";
import { AdminController } from "../controllers/admin";
import { admin } from "../middlewares/admin";

const router = Router();
const controller = new AdminController();

router.route("/add").post(admin, controller.addAdmin);
router.route("/remove").post(admin, controller.removeAdmin);
router.route("/block").post(admin, controller.block);
router.route("/unblock").post(admin, controller.unblock);

export default router;
