import express from "express";
import { listarMensagens, enviarMensagem } from "../controllers/mensagemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", enviarMensagem); 
router.get("/", authMiddleware, listarMensagens); // Privado para o seu painel

export default router;
