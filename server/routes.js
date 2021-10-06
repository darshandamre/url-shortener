import { Router } from "express";
const router = Router();
import { addUrl, getUrl, getUrlById } from "./controllers.js";

router.post("/shorturl", getUrl, addUrl);
// router.use(duplicateKeyErrorHandler);

router.get("/shorturl/:id", getUrlById);

export default router;
