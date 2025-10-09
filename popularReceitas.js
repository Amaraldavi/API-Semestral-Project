const db = require("./db");

const receitas = [
  { nome: "Bolo de Chocolate", imagem: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg", modo_preparo: "Misture todos os ingredientes e leve ao forno por 40 minutos.", ingredientes: [ { ingrediente: "Farinha de trigo", medida: "2 xícaras" }, { ingrediente: "Chocolate em pó", medida: "1 xícara" }, { ingrediente: "Ovos", medida: "3 unidades" }, { ingrediente: "Leite", medida: "1 xícara" } ] },
  { nome: "Panqueca", imagem: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg", modo_preparo: "Misture os ingredientes e frite em frigideira antiaderente.", ingredientes: [ { ingrediente: "Farinha de trigo", medida: "1 xícara" }, { ingrediente: "Leite", medida: "1 xícara" }, { ingrediente: "Ovo", medida: "1 unidade" }, { ingrediente: "Sal", medida: "1 pitada" } ] },
  { nome: "Omelete", imagem: "https://www.themealdb.com/images/media/meals/0wryxq1560452256.jpg", modo_preparo: "Bata os ovos, adicione temperos e frite em frigideira.", ingredientes: [ { ingrediente: "Ovos", medida: "2 unidades" }, { ingrediente: "Sal", medida: "1 pitada" }, { ingrediente: "Queijo", medida: "50g" } ] },
  { nome: "Salada de Tomate", imagem: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg", modo_preparo: "Corte os tomates, tempere com azeite, sal e ervas.", ingredientes: [ { ingrediente: "Tomate", medida: "2 unidades" }, { ingrediente: "Azeite", medida: "1 colher de sopa" }, { ingrediente: "Sal", medida: "1 pitada" }, { ingrediente: "Manjericão", medida: "a gosto" } ] },
  { nome: "Mousse de Maracujá", imagem: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg", modo_preparo: "Bata todos os ingredientes no liquidificador, leve à geladeira por 2 horas.", ingredientes: [ { ingrediente: "Polpa de maracujá", medida: "1 xícara" }, { ingrediente: "Leite condensado", medida: "1 lata" }, { ingrediente: "Creme de leite", medida: "1 lata" }, { ingrediente: "Gelatina incolor", medida: "1 envelope" } ] },
  { nome: "Lasanha de Frango", imagem: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg", modo_preparo: "Monte as camadas de massa, molho e frango, e leve ao forno por 40 minutos.", ingredientes: [ { ingrediente: "Massa de lasanha", medida: "500g" }, { ingrediente: "Frango desfiado", medida: "300g" }, { ingrediente: "Molho de tomate", medida: "2 xícaras" }, { ingrediente: "Queijo mussarela", medida: "200g" }, { ingrediente: "Requeijão", medida: "1 copo" } ] },
  { nome: "Espaguete à Bolonhesa", imagem: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg", modo_preparo: "Cozinhe a massa, prepare o molho com carne moída e tomate, misture e sirva.", ingredientes: [ { ingrediente: "Espaguete", medida: "300g" }, { ingrediente: "Carne moída", medida: "250g" }, { ingrediente: "Molho de tomate", medida: "2 xícaras" }, { ingrediente: "Cebola", medida: "1 unidade" }, { ingrediente: "Alho", medida: "2 dentes" } ] },
  { nome: "Frango Grelhado com Legumes", imagem: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg", modo_preparo: "Tempere o frango, grelhe e sirva com legumes cozidos no vapor.", ingredientes: [ { ingrediente: "Peito de frango", medida: "2 unidades" }, { ingrediente: "Abobrinha", medida: "1 unidade" }, { ingrediente: "Cenoura", medida: "1 unidade" }, { ingrediente: "Azeite", medida: "2 colheres de sopa" }, { ingrediente: "Sal e pimenta", medida: "a gosto" } ] },
  { nome: "Quiche de Espinafre", imagem: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg", modo_preparo: "Misture ovos, creme de leite e espinafre, coloque na massa e asse por 30 minutos.", ingredientes: [ { ingrediente: "Massa pronta para quiche", medida: "1 unidade" }, { ingrediente: "Ovos", medida: "3 unidades" }, { ingrediente: "Creme de leite", medida: "200ml" }, { ingrediente: "Espinafre", medida: "200g" }, { ingrediente: "Queijo ralado", medida: "50g" } ] },
  { nome: "Sushi de Salmão", imagem: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg", modo_preparo: "Monte os sushis com arroz, nori e salmão fresco.", ingredientes: [ { ingrediente: "Arroz para sushi", medida: "1 xícara" }, { ingrediente: "Nori", medida: "2 folhas" }, { ingrediente: "Salmão fresco", medida: "100g" }, { ingrediente: "Vinagre de arroz", medida: "2 colheres de sopa" }, { ingrediente: "Sal", medida: "1 pitada" } ] },

];

// Função para inserir receita se ainda não existir
receitas.forEach((r) => {
  db.get("SELECT * FROM receitas WHERE nome = ?", [r.nome], (err, row) => {
    if (err) {
      console.error("Erro ao verificar receita:", err.message);
    } else if (row) {
      console.log(`⚠️ Receita '${r.nome}' já existe. Pulando...`);
    } else {
      db.run(
        `INSERT INTO receitas (nome, imagem, modo_preparo, ingredientes) VALUES (?, ?, ?, ?)`,
        [r.nome, r.imagem, r.modo_preparo, JSON.stringify(r.ingredientes)],
        (err) => {
          if (err) console.error("Erro ao inserir receita:", err.message);
          else console.log(`✅ Receita '${r.nome}' adicionada!`);
        }
      );
    }
  });
});
