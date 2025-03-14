import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const isAuthenticated = asyncHandler(async(req, _, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodeToken._id);
        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Does not have permission");
    }
})