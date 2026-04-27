import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function conectarDB() {
  return open({
    filename: "./database/doepet.db",
    driver: sqlite3.Database
  });
}

export async function criarTabelas() {
  const db = await conectarDB();

  await db.exec(`
  CREATE TABLE IF NOT EXISTS ongs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT,
    endereco TEXT,
    urgencia INTEGER,
    latitude REAL,
    longitude REAL
  );

  CREATE TABLE IF NOT EXISTS itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    categoria TEXT,
    quantidade INTEGER,
    ong_id INTEGER
  );

  CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    mensagem TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  `);
  //
}