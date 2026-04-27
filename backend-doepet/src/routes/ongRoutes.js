import express from "express";
import controller from "../controllers/ongController.js"; 
import validar from "../middlewares/validator.js";     
import { body } from "express-validator";

const router = express.Router();

router.post(
 "/",
 [
  body("nome").notEmpty().withMessage("Nome obrigatório"),
  body("latitude").isFloat().withMessage("Latitude inválida"),
  body("longitude").isFloat().withMessage("Longitude inválida"),
  body("urgencia").isInt({min:1,max:5}).withMessage("Urgência deve ser 1 a 5")
 ],
 validar,
 controller.criar
);

router.get("/", controller.listar);

export default router; 