const express = require("express");
const cors = require("cors");
const db = require("./db"); // sua conexão sqlite (db.js)
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Receitas Culinárias - by Davi 🍲");
});

/**
 * GET /receitas
 * - Se sem query params: retorna todas as receitas
 * - Aceita query params:
 *    nome: string (busca por LIKE %nome%)
 *    ingredientes: lista separada por vírgula (ex: ingredientes=ovo,farinha)
 *
 * Ex: GET /receitas?nome=bolo&ingredientes=ovo,farinha
 */
app.get("/receitas", (req, res) => {
  const { nome, ingredientes } = req.query;

  db.all("SELECT * FROM receitas", [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar receitas:", err);
      return res.status(500).json({ erro: err.message });
    }

    // parse das receitas e aplicação de filtros
    const parsed = rows.map((r) => {
      let ingredientesArr = [];
      try {
        ingredientesArr = r.ingredientes ? JSON.parse(r.ingredientes) : [];
      } catch (e) {
        ingredientesArr = [];
      }
      return {
        id: r.id,
        nome: r.nome,
        imagem: r.imagem,
        modo_preparo: r.modo_preparo,
        ingredientes: ingredientesArr,
      };
    });

    // aplicar filtro por nome (se presente)
    let filtered = parsed;
    if (typeof nome === "string" && nome.trim() !== "") {
      const q = nome.trim().toLowerCase();
      filtered = filtered.filter((r) => (r.nome || "").toLowerCase().includes(q));
    }

    // aplicar filtro por ingredientes (se presente) — AND: todos os termos devem existir
    // ingredientes query pode ser "ovo,farinha" ou "ovo" (string). suportamos array também se for form-data.
    if (ingredientes) {
      // normalizar entrada em array de termos
      let terms = [];
      if (Array.isArray(ingredientes)) {
        // ?ingredientes=a&ingredientes=b  (unlikely but handle)
        terms = ingredientes.flatMap((t) => String(t).split(","));
      } else {
        terms = String(ingredientes).split(",");
      }
      terms = terms.map((t) => t.trim().toLowerCase()).filter(Boolean);

      if (terms.length) {
        filtered = filtered.filter((r) => {
          // lowercased ingredient strings from recipe
          const lowerIngredients = (r.ingredientes || []).map((ing) =>
            String(ing?.ingrediente || "").toLowerCase()
          );
          // todos os termos devem ser substrings de pelo menos um ingrediente
          return terms.every((term) =>
            lowerIngredients.some((li) => li.includes(term))
          );
        });
      }
    }

    // Retornamos 200 com array (vazio se nada encontrado)
    return res.json(filtered);
  });
});

/**
 * POST /receitas/search
 * body: { nome?: string, ingredientes?: string[] }
 * Alternativa para queries longas / arrays via body.
 */
app.post("/receitas/search", (req, res) => {
  const { nome, ingredientes } = req.body;

  db.all("SELECT * FROM receitas", [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar receitas (search):", err);
      return res.status(500).json({ erro: err.message });
    }

    const parsed = rows.map((r) => {
      let ingredientesArr = [];
      try {
        ingredientesArr = r.ingredientes ? JSON.parse(r.ingredientes) : [];
      } catch (e) {
        ingredientesArr = [];
      }
      return {
        id: r.id,
        nome: r.nome,
        imagem: r.imagem,
        modo_preparo: r.modo_preparo,
        ingredientes: ingredientesArr,
      };
    });

    let filtered = parsed;

    if (typeof nome === "string" && nome.trim() !== "") {
      const q = nome.trim().toLowerCase();
      filtered = filtered.filter((r) => (r.nome || "").toLowerCase().includes(q));
    }

    if (Array.isArray(ingredientes) && ingredientes.length) {
      const terms = ingredientes.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
      if (terms.length) {
        filtered = filtered.filter((r) => {
          const lowerIngredients = (r.ingredientes || []).map((ing) =>
            String(ing?.ingrediente || "").toLowerCase()
          );
          return terms.every((term) =>
            lowerIngredients.some((li) => li.includes(term))
          );
        });
      }
    }

    return res.json(filtered);
  });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});