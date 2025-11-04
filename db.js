const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho do arquivo do banco local
const dbPath = path.resolve(__dirname, "receitas.db");

// Cria conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao banco:", err.message);
  } else {
    console.log("✅ Banco de dados SQLite conectado!");
  }
});

// Criação e verificação de tabelas
db.serialize(() => {
  // 🔹 Tabela de receitas
  db.run(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      imagem TEXT,
      modo_preparo TEXT,
      ingredientes TEXT,
      usuario_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
`);

  // 🔹 Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela usuarios:", err.message);
  });

  // 🔧 Adiciona coluna 'tipo' se ainda não existir
  db.all("PRAGMA table_info(usuarios)", (err, rows) => {
    if (err) {
      console.error("Erro ao verificar colunas de usuarios:", err);
      return;
    }

    const hasTipo = rows.some(col => col.name === "tipo");
    if (!hasTipo) {
      db.run("ALTER TABLE usuarios ADD COLUMN tipo TEXT DEFAULT 'normal'", (err2) => {
        if (err2) {
          console.error("Erro ao adicionar coluna 'tipo':", err2.message);
        } else {
          console.log("✅ Coluna 'tipo' adicionada à tabela 'usuarios'");
        }
      });
    }
  });
});

module.exports = db;
