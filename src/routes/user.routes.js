import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/refresh-token").get(refreshAccessToken);

router.route("/change-password").post(isAuthenticated, changeCurrentPassword);

router.route("/user-details").get(isAuthenticated, getCurrentUser);

router.route("/update-account").patch(isAuthenticated, updateAccountDetails);

router
  .route("/update-avatar")
  .patch(isAuthenticated, upload.single("avatar"), updateUserAvatar);

router
  .route("/update-cover")
  .patch(isAuthenticated, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(isAuthenticated, getUserChannelProfile);

router.route("/history").get(isAuthenticated, getWatchHistory);

export default router;