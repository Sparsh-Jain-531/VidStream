import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]),registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(isAuthenticated, logoutUser)

router.route("/refresh-token").get(refreshAccessToken)

router.route("/change-password").post(isAuthenticated, changeCurrentPassword)

router.route("/user-details").get(isAuthenticated, getCurrentUser)

router.route("/update-account").post(isAuthenticated, updateAccountDetails)

router.route("/update-avatar").post(isAuthenticated, updateUserAvatar)

router.route("/update-cover").post(isAuthenticated, updateUserCoverImage)

export default router;