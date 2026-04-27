import { conectarDB } from "../database/database.js";

export async function listarMensagens(req, res) {
  const db = await conectarDB();
  const mensagens = await db.all("SELECT * FROM mensagens ORDER BY data DESC");
  res.json(mensagens);
}

export async function enviarMensagem(req, res) {
  const { nome, email, mensagem } = req.body;
  const db = await conectarDB();
  await db.run(
    "INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)",
    [nome, email, mensagem]
  );
  res.json({ mensagem: "Mensagem enviada!" });
}