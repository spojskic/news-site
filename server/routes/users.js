import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  changeUserStatus,
  deleteUser,
} from "../controller/users.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/status/:id", changeUserStatus);
router.delete("/:id", deleteUser);

export default router;
