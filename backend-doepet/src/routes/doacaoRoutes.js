import express from "express";
import { registrarDoacao } from "../controllers/doacaoController.js";

const router = express.Router();

router.post("/", registrarDoacao);

export default router;