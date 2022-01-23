import express from "express";
import { registerUser, loginUser } from "../controller/users.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", loginUser);

export default router;
