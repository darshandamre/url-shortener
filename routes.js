import { Router } from "express";
import { body, param } from "express-validator";
const router = Router();
import { addUrl, getUrlByUrl, getUrlById } from "./controllers.js";

router.post(
  "/shorturl",
  body("url")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("invalid url"),
  getUrlByUrl,
  addUrl
);

router.get(
  "/shorturl/:id",
  param("id").isInt({ min: 1 }).withMessage("invalid input"),
  getUrlById
);

export default router;
