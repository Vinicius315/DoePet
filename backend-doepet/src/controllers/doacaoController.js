import { conectarDB } from "../database/database.js";

export async function registrarDoacao(req, res) {

  const { item, quantidade, ponto, ong } = req.body;

  const db = await conectarDB();

  await db.run(

    `INSERT INTO doacoes 
    (item, quantidade, ponto_coleta, ong_destino, status)
    VALUES (?, ?, ?, ?, ?)`,
    
    [item, quantidade, ponto, ong, "em_transporte"]

  );

  res.json({ mensagem: "Doação registrada" });

}