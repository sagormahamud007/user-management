import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router()

//will call controller func
router.post("/api/users", userControllers.createUser);
router.get("/api/users", userControllers.getUserAllUsers);
router.get("/api/users/:userId", userControllers.getSIngleSpecificUser);
router.get("/api/users/:userId/orders", userControllers.getAllOrderData);
router.get("/api/users/:userId/orders/total-price", userControllers.userOrderTotalPrice);
router.put("/api/users/:userId", userControllers.updateSpacificUserData);
router.put('/api/users/:userId/orders', userControllers.addOrderFromDb);
router.delete("/api/users/:userId", userControllers.deletedSingleSpacificuUser);

export const UsersRoutes = router;