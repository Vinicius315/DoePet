import { validationResult } from "express-validator";

const validar = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ 
      erro: "Dados inválidos", 
      detalhes: erros.array() 
    });
  }
  next();
};

export default validar;