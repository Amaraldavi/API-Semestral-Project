const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "segredo_super_secreto"; // ⚠️ troque por uma env var

app.get("/", (req, res) => {
  res.send("🍲 API de Receitas Culinárias - com autenticação JWT");
});


// ===================== 🧩 AUTENTICAÇÃO =====================

// Cadastro
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  db.run(
    `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senhaCriptografada],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE"))
          return res.status(400).json({ error: "E-mail já cadastrado." });
        return res.status(500).json({ error: err.message });
      }

      const token = jwt.sign({ id: this.lastID, nome, email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        usuario: { id: this.lastID, nome, email },
        token,
      });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha e-mail e senha." });
  }

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario)
      return res.status(401).json({ error: "Usuário não encontrado." });

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta)
      return res.status(401).json({ error: "Senha incorreta." });

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
      token,
    });
  });
});


// ===================== 🧱 MIDDLEWARE JWT =====================

function autenticarUsuario(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const [, token] = authHeader.split(" ");
  if (!token) return res.status(401).json({ error: "Token inválido." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token expirado ou inválido." });
  }
}


// ===================== 🍳 RECEITAS =====================

// Listar todas
app.get("/receitas", (req, res) => {
  try {
    const { nome, ingredientes } = req.query;

    // Normaliza ingredients: pode vir como "a,b" ou como array
    let terms = [];
    if (ingredientes) {
      if (Array.isArray(ingredientes)) {
        terms = ingredientes.flatMap((t) => String(t).split(","));
      } else {
        terms = String(ingredientes).split(",");
      }
      terms = terms.map((t) => t.trim().toLowerCase()).filter(Boolean);
    }

    // Monta SQL dinâmico com WHERE conforme os filtros
    const where = [];
    const params = [];

    if (nome && String(nome).trim().length) {
      where.push("lower(nome) LIKE ?");
      params.push(`%${String(nome).trim().toLowerCase()}%`);
    }

    // Para cada termo de ingrediente adicionamos um LIKE sobre o campo ingredientes (JSON string)
    // Usamos lower() para comparações case-insensitive
    terms.forEach((term) => {
      where.push("lower(ingredientes) LIKE ?");
      params.push(`%${term}%`);
    });

    const sql = `SELECT * FROM receitas${where.length ? " WHERE " + where.join(" AND ") : ""} ORDER BY id DESC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Erro ao buscar receitas:", err);
        return res.status(500).json({ erro: err.message });
      }

      const receitas = rows.map((r) => {
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
          usuario_id: r.usuario_id,
        };
      });

      return res.json(receitas);
    });
  } catch (e) {
    console.error("GET /receitas error:", e);
    return res.status(500).json({ erro: "Erro interno" });
  }
});

// Obter por ID
app.get("/receitas/:id", (req, res) => {
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
      ingredientes: JSON.parse(row.ingredientes || "[]"),
      usuario_id: row.usuario_id,
    };

    res.json(receita);
  });
});

// Criar (apenas logado)
app.post("/receitas", autenticarUsuario, (req, res) => {
  console.log("POST /receitas - user:", req.usuario);
  console.log("body:", req.body);

  const { nome, imagem, modo_preparo, ingredientes } = req.body;
  const usuarioId = req.usuario.id;

  if (!nome || !Array.isArray(ingredientes) || !ingredientes.length) {
    return res
      .status(400)
      .json({ mensagem: "Nome e ingredientes são obrigatórios." });
  }

  db.run(
    "INSERT INTO receitas (nome, imagem, modo_preparo, ingredientes, usuario_id) VALUES (?, ?, ?, ?, ?)",
    [nome, imagem || "", modo_preparo || "", JSON.stringify(ingredientes), usuarioId],
    function (err) {
      if (err) {
        console.error("Erro ao inserir receita:", err.stack ?? err);
        return res.status(500).json({ erro: err.message });
      }

      res
        .status(201)
        .json({ id: this.lastID, mensagem: "Receita criada com sucesso!" });
    }
  );
});

// Atualizar (somente o criador)
app.put("/receitas/:id", autenticarUsuario, (req, res) => {
  const { id } = req.params;
  const { nome, imagem, modo_preparo, ingredientes } = req.body;
  const usuarioId = req.usuario.id;

  db.get("SELECT * FROM receitas WHERE id = ?", [id], (err, receita) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!receita) return res.status(404).json({ mensagem: "Receita não encontrada." });
    if (receita.usuario_id !== usuarioId)
      return res.status(403).json({ erro: "Você não pode editar esta receita." });

    const sql = `UPDATE receitas SET nome = ?, imagem = ?, modo_preparo = ?, ingredientes = ? WHERE id = ?`;
    db.run(sql, [nome, imagem || "", modo_preparo || "", JSON.stringify(ingredientes), id], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });

      res.json({ mensagem: "Receita atualizada com sucesso!" });
    });
  });
});

// Deletar (somente o criador)
app.delete("/receitas/:id", autenticarUsuario, (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  db.get("SELECT * FROM receitas WHERE id = ?", [id], (err, receita) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!receita)
      return res.status(404).json({ mensagem: "Receita não encontrada." });

    if (receita.usuario_id !== usuarioId)
      return res.status(403).json({ erro: "Você não pode deletar esta receita." });

    db.run("DELETE FROM receitas WHERE id = ?", [id], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ mensagem: "Receita excluída com sucesso!" });
    });
  });
});

app.get("/minhas-receitas", autenticarUsuario, (req, res) => {
  const usuarioId = req.usuario.id;
  const { nome, ingrediente } = req.query; // filtros opcionais

  let sql = "SELECT * FROM receitas WHERE usuario_id = ?";
  const params = [usuarioId];

  // 🔍 filtros opcionais
  if (nome) {
    sql += " AND nome LIKE ?";
    params.push(`%${nome}%`);
  }

  if (ingrediente) {
    sql += " AND ingredientes LIKE ?";
    params.push(`%${ingrediente}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

    const receitas = rows.map((r) => ({
      id: r.id,
      nome: r.nome,
      imagem: r.imagem,
      modo_preparo: r.modo_preparo,
      ingredientes: JSON.parse(r.ingredientes || "[]"),
      usuario_id: r.usuario_id,
    }));

    res.json(receitas);
  });
});


// ===================== 🚀 SERVIDOR =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API rodando na porta ${PORT}`));
