import { conectarDB } from "../database/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { email, senha } = req.body;
  const db = await conectarDB();

  const ong = await db.get("SELECT * FROM ongs WHERE email = ?", [email]);

  if (!ong) {
    return res.status(404).json({ erro: "ONG não encontrada" });
  }

  const senhaValida = await bcrypt.compare(senha, ong.senha);

  if (!senhaValida) {
    return res.status(401).json({ erro: "Senha inválida" });
  }

  const token = jwt.sign(
    { id: ong.id },
    "segredo", 
    { expiresIn: "1d" }
  );

  return res.json({ token });
}