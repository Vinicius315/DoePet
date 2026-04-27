import { conectarDB } from "../database/database.js";

export async function listarItens(req, res) {
  const db = await conectarDB();
  const itens = await db.all("SELECT * FROM itens");
  res.json(itens);
}

export async function criarItem(req, res) {
  const { nome, categoria, quantidade, ong_id } = req.body;
  const db = await conectarDB();
  
  try {
    await db.run(
      "INSERT INTO itens (nome, categoria, quantidade, ong_id) VALUES (?, ?, ?, ?)",
      [nome, categoria, quantidade, ong_id]
    );
    res.status(201).json({ mensagem: "Item criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar item no banco." });
  }
}

export async function excluirItem(req, res) {
  const { id } = req.params;
  const db = await conectarDB();
  
  try {
    await db.run("DELETE FROM itens WHERE id = ?", [id]);
    res.json({ mensagem: "Item removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir item." });
  }
}

export async function editarItem(req, res) {
  const { id } = req.params;
  const { nome, categoria, quantidade } = req.body;
  const db = await conectarDB();
  
  try {
    await db.run(
      "UPDATE itens SET nome = ?, categoria = ?, quantidade = ? WHERE id = ?",
      [nome, categoria, quantidade, id]
    );
    res.json({ mensagem: "Item atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar item." });
  }
}