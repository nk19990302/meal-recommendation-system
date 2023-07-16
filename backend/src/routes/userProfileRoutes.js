import { Router } from "express";
import userProfileController from "../controllers/userProfileController.js";
const userProfileRoute = Router();

userProfileRoute.get("/:userId", userProfileController.get);
userProfileRoute.post("/", userProfileController.add);
userProfileRoute.put("/", userProfileController.update);

export default userProfileRoute;
