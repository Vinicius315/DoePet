import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Padrão "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
  }

  try {
    const verificado = jwt.verify(token, "segredo"); // Use o mesmo segredo do authController
    req.userId = verificado.id;
    next();
  } catch (err) {
    res.status(400).json({ erro: "Token inválido ou expirado." });
  }
};