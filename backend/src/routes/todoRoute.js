import express from "express"
import { protectRoute } from "../middlewares/authMiddleware.js"
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todoController.js";

const router  = express.Router();

router.post("/", protectRoute, createTodo);
router.get("/", protectRoute, getTodos);
router.put("/:id", protectRoute, updateTodo);
router.delete("/:id", protectRoute, deleteTodo);

export default router