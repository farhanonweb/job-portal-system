import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getAllStudents, getLoggedInUser, updateProfile } from "../controllers/userController.js";


import { upload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = express.Router();

userRouter.get("/me", isAuthenticated, getLoggedInUser);

userRouter.put(
  "/update-profile/:id",
  isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

userRouter.get("/all-students", isAuthenticated,isAdmin, getAllStudents);

export default userRouter;