import express from "express";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import userRouter from "./user.js";

export const router = express.Router({ mergeParams: true });

router.use("/", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);

export default router;
