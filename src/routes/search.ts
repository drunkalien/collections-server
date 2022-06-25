import { Router } from "express";

import { SearchController } from "../controllers/search";

const controller = new SearchController();
const router = Router();

router.route("/search").get(controller.search);

export default router;
