import { conectarDB } from "../database/database.js";
import bcrypt from "bcryptjs";

export async function criar(req, res) {
  const { nome, email, senha, endereco, urgencia, latitude, longitude } = req.body;
  const db = await conectarDB();

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    await db.run(
      `INSERT INTO ongs (nome, email, senha, endereco, urgencia, latitude, longitude) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, senhaHash, endereco, urgencia, latitude, longitude]
    );

    res.status(201).json({ mensagem: "ONG cadastrada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar ONG no banco de dados." });
  }
}

export async function listar(req, res) {
  const db = await conectarDB();
  try {
    const ongs = await db.all("SELECT id, nome, email, endereco, urgencia, latitude, longitude FROM ongs");
    res.json(ongs);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar ONGs." });
  }
}

export default { criar, listar };