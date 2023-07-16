import { Router } from "express";
import preferencesRoutes from "./userProfileRoutes.js";
import userRoutes from "./userRoutes.js";
const mainRoutes = Router();

// attach all different routes here
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/user-profile", preferencesRoutes);

export default mainRoutes;
