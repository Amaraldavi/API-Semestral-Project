const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // 🔹 para criptografar senhas
const db = require("./db"); // sua conexão sqlite (db.js)
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Receitas Culinárias - by Davi 🍲");
});

// 🔹===================== AUTENTICAÇÃO =====================

// Cadastro de usuário
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  // Criptografar a senha
  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
  db.run(sql, [nome, email, senhaCriptografada], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
      }
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", id: this.lastID });
  });
});

// Login de usuário
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha e-mail e senha." });
  }

  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  db.get(sql, [email], (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario)
      return res.status(401).json({ error: "Usuário não encontrado." });

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  });
});

// 🔹 Middleware de autenticação simples
function autenticarUsuario(req, res, next) {
  const { usuarioId } = req.body; // pode vir no body
  if (!usuarioId) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

  db.get("SELECT * FROM usuarios WHERE id = ?", [usuarioId], (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario)
      return res.status(401).json({ error: "Usuário não encontrado." });

    req.usuario = usuario; // usuário autenticado disponível na requisição
    next();
  });
}

// 🔹===================== RECEITAS =====================

app.get("/receitas", (req, res) => {
  const { nome, ingredientes } = req.query;

  db.all("SELECT * FROM receitas", [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar receitas:", err);
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
      filtered = filtered.filter((r) =>
        (r.nome || "").toLowerCase().includes(q)
      );
    }

    if (ingredientes) {
      let terms = [];
      if (Array.isArray(ingredientes)) {
        terms = ingredientes.flatMap((t) => String(t).split(","));
      } else {
        terms = String(ingredientes).split(",");
      }
      terms = terms.map((t) => t.trim().toLowerCase()).filter(Boolean);

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
      filtered = filtered.filter((r) =>
        (r.nome || "").toLowerCase().includes(q)
      );
    }

    if (Array.isArray(ingredientes) && ingredientes.length) {
      const terms = ingredientes
        .map((t) => String(t).trim().toLowerCase())
        .filter(Boolean);
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

app.get("/receitas/ingrediente/:ingrediente", (req, res) => {
  const { ingrediente } = req.params;

  db.all("SELECT * FROM receitas", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

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

// 🔹 Inserir nova receita (só usuário logado)
app.post("/receitas", autenticarUsuario, (req, res) => {
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
      res
        .status(201)
        .json({ id: this.lastID, mensagem: "Receita adicionada!" });
    }
  );
});

app.delete("/receitas/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM receitas WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Erro ao deletar receita:", err);
      return res.status(500).json({ erro: err.message });
    }

    if (this.changes === 0) {
      return res
        .status(404)
        .json({ mensagem: "Receita não encontrada para exclusão" });
    }

    res.json({ mensagem: "Receita deletada com sucesso!" });
  });
});

app.put("/receitas/:id", (req, res) => {
  const { id } = req.params;
  const { nome, imagem, modo_preparo, ingredientes } = req.body;

  if (!nome || !ingredientes) {
    return res.status(400).json({ mensagem: "Nome e ingredientes são obrigatórios" });
  }

  // garante que ingredientes seja um array serializável
  let ingredientesJson = "[]";
  try {
    ingredientesJson = JSON.stringify(ingredientes);
  } catch (e) {
    return res.status(400).json({ mensagem: "Ingredientes inválidos" });
  }

  const sql =
    "UPDATE receitas SET nome = ?, imagem = ?, modo_preparo = ?, ingredientes = ? WHERE id = ?";

  db.run(sql, [nome, imagem || "", modo_preparo || "", ingredientesJson, id], function (err) {
    if (err) {
      console.error("Erro ao atualizar receita:", err);
      return res.status(500).json({ erro: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ mensagem: "Receita não encontrada" });
    }

    // buscar e retornar a receita atualizada
    db.get("SELECT * FROM receitas WHERE id = ?", [id], (err2, row) => {
      if (err2) return res.status(500).json({ erro: err2.message });
      if (!row) return res.status(404).json({ mensagem: "Receita não encontrada" });

      let ingredientesArr = [];
      try {
        ingredientesArr = row.ingredientes ? JSON.parse(row.ingredientes) : [];
      } catch (e) {
        ingredientesArr = [];
      }

      const receita = {
        id: row.id,
        nome: row.nome,
        imagem: row.imagem,
        modo_preparo: row.modo_preparo,
        ingredientes: ingredientesArr,
      };

      return res.json(receita);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});

