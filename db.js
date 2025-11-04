const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho do banco de dados (arquivo local)
const dbPath = path.resolve(__dirname, "receitas.db");

// Cria conexão
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("✅ Banco de dados SQLite conectado!");
  }
});

// Cria tabelas (se não existirem)
db.serialize(() => {
  // Tabela original de receitas (sem alterações)
  db.run(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      imagem TEXT,
      modo_preparo TEXT,
      ingredientes TEXT
    )
  `);

  // 🔹 Nova tabela de usuários (para login e cadastro)
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);
});

module.exports = db;
