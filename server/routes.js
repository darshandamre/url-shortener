import { Router } from "express";
const router = Router();
import { addUrl, duplicateKeyErrorHandler, getUrlById } from "./controllers.js";

router.post("/shorturl", addUrl);
router.use(duplicateKeyErrorHandler);

router.get("/shorturl/:id", getUrlById);

export default router;
