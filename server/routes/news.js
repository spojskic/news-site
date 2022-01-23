import express from "express";
import {
  getNews,
  postNews,
  getOneArticle,
  deleteNews,
  updateNews,
  getComments,
  postComment,
  deleteComment,
} from "../controller/news.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getOneArticle);
router.post("/", postNews);
router.delete("/:id", deleteNews);
router.patch("/:id", updateNews);

router.get("/comments/:id", getComments);
router.post("/comments/:id", postComment);
router.delete("/comments/:id", deleteComment);

export default router;
