import { conectarDB } from "../database/database.js";
import bcrypt from "bcryptjs"; 
export async function popularBanco() {
  const db = await conectarDB();


  /*await db.run("DELETE FROM ongs");
  await db.run("DELETE FROM pontos_coleta");
  await db.run("DELETE FROM itens");
  await db.run("DELETE FROM doacoes"); */

 
  const ongs = [
    "Amigos dos Animais", "Patinhas Felizes", "SOS Pets", "Vida Animal",
    "Lar dos Bichinhos", "Resgate Pet", "Mundo Animal", "Abrigo Esperança",
    "Cuidado Animal", "Proteção Pet"
  ];

  const senhaHash = await bcrypt.hash("123456", 10);

  // ... dentro do loop das ONGs no seed.js
for (let nome of ongs) {
  await db.run(
    `INSERT INTO ongs (nome, email, senha, endereco, urgencia, latitude, longitude)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      nome,
      nome.toLowerCase().replace(/\s/g, "") + "@email.com",
      senhaHash,
      "Rua Central",
      Math.floor(Math.random() * 5),
      -23.5505, // Exemplo: São Paulo
      -46.6333
    ]
  );
}

  const pontos = ["PetShop Central", "Mercado Animal", "Clínica VetCare", "PetStore Amigo", "SuperPet"];
  for (let ponto of pontos) {
    await db.run(
      `INSERT INTO pontos_coleta (nome,endereco,horario) VALUES (?,?,?)`,
      [ponto, "Centro da Cidade", "08:00 - 18:00"]
    );
  }

 
  const categorias = ["ração", "medicamento", "limpeza"];
  for (let i = 0; i < 30; i++) {
    await db.run(
      `INSERT INTO itens (nome,categoria,quantidade,ong_id) VALUES (?,?,?,?)`,
      ["Item " + (i + 1), categorias[Math.floor(Math.random() * 3)], Math.floor(Math.random() * 50), Math.floor(Math.random() * 10) + 1]
    );
  }

  
  const status = ["em_coleta", "em_transporte", "entregue"];
  for (let i = 0; i < 20; i++) {
    await db.run(
      `INSERT INTO doacoes (item,quantidade,ponto_coleta,ong_destino,status) VALUES (?,?,?,?,?)`,
      ["Ração", Math.floor(Math.random() * 10), "PetShop Central", "Amigos dos Animais", status[Math.floor(Math.random() * 3)]]
    );
  }

}