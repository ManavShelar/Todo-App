import express from "express"
import { login, logout, signup, checkAuth } from "../controllers/authController.js"
import { protectRoute } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/login", login)

router.post("/signup", signup)

router.post("/logout", logout)

router.get("/check", protectRoute, checkAuth);

export default router