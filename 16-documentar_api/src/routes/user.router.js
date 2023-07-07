import { Router } from "express";
import { changeRole } from "../controllers/user.controller.js";
import { authorizeRole, authentication } from "../middlewares/auth.js";

const router = Router();

router.post("/premium/:id", authentication(), authorizeRole(["admin"]), changeRole);

export default router;
