import express from "express";
import {
  getNews,
  postNews,
  getOneArticle,
  getComments,
  postComment,
} from "../controller/news.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getOneArticle);
router.post("/", postNews);

router.get("/comments/:id", getComments);
router.post("/comments/:id", postComment);

export default router;
