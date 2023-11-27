import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router()

//will call controller func
router.post("/api/users", userControllers.createUser);
router.get("/api/users", userControllers.getUserAllUsers);

export const UsersRoutes = router;