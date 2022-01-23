import express from "express";
import {
  getNews,
  postNews,
  getOneArticle,
  deleteNews,
  getComments,
  postComment,
} from "../controller/news.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getOneArticle);
router.post("/", postNews);
router.delete("/:id", deleteNews);

router.get("/comments/:id", getComments);
router.post("/comments/:id", postComment);

export default router;
