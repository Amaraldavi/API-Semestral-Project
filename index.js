const express = require("express");
const cors = require("cors");
const db = require("./db"); // seu arquivo de conexão SQLite
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint raiz
app.get("/", (req, res) => {
  res.send("API de Receitas Culinárias - by Davi 🍲");
});

// Buscar receitas por NOME
app.get("/receitas/nome/:nome", (req, res) => {
  const { nome } = req.params;
  db.all(
    "SELECT * FROM receitas WHERE nome LIKE ?",
    [`%${nome}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!rows.length)
        return res.status(404).json({ mensagem: "Receita não encontrada" });

      const receitas = rows.map((r) => ({
        id: r.id,
        nome: r.nome,
        imagem: r.imagem,
        modo_preparo: r.modo_preparo,
        ingredientes: JSON.parse(r.ingredientes),
      }));

      res.json(receitas);
    }
  );
});

// Buscar receitas por INGREDIENTE
app.get("/receitas/ingrediente/:ingrediente", (req, res) => {
  const { ingrediente } = req.params;

  db.all("SELECT * FROM receitas", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

    // Filtrar receitas que contenham o ingrediente
    const filtradas = rows.filter((r) => {
      const ingredientes = JSON.parse(r.ingredientes);
      return ingredientes.some((i) =>
        i.ingrediente.toLowerCase().includes(ingrediente.toLowerCase())
      );
    });

    if (!filtradas.length)
      return res
        .status(404)
        .json({ mensagem: "Nenhuma receita encontrada com esse ingrediente" });

    const receitas = filtradas.map((r) => ({
      id: r.id,
      nome: r.nome,
      imagem: r.imagem,
      ingredientes: JSON.parse(r.ingredientes),
      modo_preparo: r.modo_preparo,
    }));

    res.json(receitas);
  });
});

// Buscar receita por ID
app.get("/receitas/id/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM receitas WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row)
      return res.status(404).json({ mensagem: "Receita não encontrada" });

    const receita = {
      id: row.id,
      nome: row.nome,
      imagem: row.imagem,
      modo_preparo: row.modo_preparo,
      ingredientes: JSON.parse(row.ingredientes),
    };

    res.json(receita);
  });
});

// Inserir nova receita (opcional)
app.post("/receitas", (req, res) => {
  const { nome, imagem, modo_preparo, ingredientes } = req.body;

  if (!nome || !ingredientes)
    return res
      .status(400)
      .json({ mensagem: "Nome e ingredientes são obrigatórios" });

  db.run(
    "INSERT INTO receitas (nome, imagem, modo_preparo, ingredientes) VALUES (?, ?, ?, ?)",
    [nome, imagem || "", modo_preparo || "", JSON.stringify(ingredientes)],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, mensagem: "Receita adicionada!" });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
