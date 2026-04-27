import express from "express";
import { listarItens, criarItem, excluirItem, editarItem } from "../controllers/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.get("/", listarItens); 
router.post("/", authMiddleware, criarItem); 
router.delete("/:id", authMiddleware, excluirItem);
router.put("/:id", authMiddleware, editarItem); 

export default router;