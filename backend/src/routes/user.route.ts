import express from "express";
import * as UserController from "../controller/user.controller";
import { requiresAuth } from "../Middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.SignUp);
router.post("/login", UserController.Login);

export default router;