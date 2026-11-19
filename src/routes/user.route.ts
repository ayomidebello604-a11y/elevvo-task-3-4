import { Router } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../controllers/user.controller.ts";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.ts";
import { RegisterLimit } from "../middleware/ratelimiter.middleware.ts";

const route = Router();
route.use(authenticateToken)

route.get("/", getAllUsers);
route.post("/register",RegisterLimit, createUser);
route.get("/:id", getUserById);
route.patch("/:id", updateUser);
route.delete("/:id",authorizeRole("ADMIN"), deleteUser);

export default route;

