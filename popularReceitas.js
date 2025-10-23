const db = require("./db");

const receitas = [
  {
    nome: "Bolo de Chocolate",
    imagem: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
    modo_preparo:
      "Misture todos os ingredientes e leve ao forno por 40 minutos.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "2 xícaras" },
      { ingrediente: "Chocolate em pó", medida: "1 xícara" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Leite", medida: "1 xícara" },
    ],
  },
  {
    nome: "Panqueca",
    imagem: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    modo_preparo: "Misture os ingredientes e frite em frigideira antiaderente.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 xícara" },
      { ingrediente: "Ovo", medida: "1 unidade" },
      { ingrediente: "Sal", medida: "1 pitada" },
    ],
  },
  {
    nome: "Omelete",
    imagem: "https://www.themealdb.com/images/media/meals/0wryxq1560452256.jpg",
    modo_preparo: "Bata os ovos, adicione temperos e frite em frigideira.",
    ingredientes: [
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Sal", medida: "1 pitada" },
      { ingrediente: "Queijo", medida: "50g" },
    ],
  },
  {
    nome: "Salada de Tomate",
    imagem: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    modo_preparo: "Corte os tomates, tempere com azeite, sal e ervas.",
    ingredientes: [
      { ingrediente: "Tomate", medida: "2 unidades" },
      { ingrediente: "Azeite", medida: "1 colher de sopa" },
      { ingrediente: "Sal", medida: "1 pitada" },
      { ingrediente: "Manjericão", medida: "a gosto" },
    ],
  },
  {
    nome: "Mousse de Maracujá",
    imagem: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    modo_preparo:
      "Bata todos os ingredientes no liquidificador, leve à geladeira por 2 horas.",
    ingredientes: [
      { ingrediente: "Polpa de maracujá", medida: "1 xícara" },
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Creme de leite", medida: "1 lata" },
      { ingrediente: "Gelatina incolor", medida: "1 envelope" },
    ],
  },
  {
    nome: "Lasanha de Frango",
    imagem: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
    modo_preparo:
      "Monte as camadas de massa, molho e frango, e leve ao forno por 40 minutos.",
    ingredientes: [
      { ingrediente: "Massa de lasanha", medida: "500g" },
      { ingrediente: "Frango desfiado", medida: "300g" },
      { ingrediente: "Molho de tomate", medida: "2 xícaras" },
      { ingrediente: "Queijo mussarela", medida: "200g" },
      { ingrediente: "Requeijão", medida: "1 copo" },
    ],
  },
  {
    nome: "Espaguete à Bolonhesa",
    imagem: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
    modo_preparo:
      "Cozinhe a massa, prepare o molho com carne moída e tomate, misture e sirva.",
    ingredientes: [
      { ingrediente: "Espaguete", medida: "300g" },
      { ingrediente: "Carne moída", medida: "250g" },
      { ingrediente: "Molho de tomate", medida: "2 xícaras" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Alho", medida: "2 dentes" },
    ],
  },
  {
    nome: "Frango Grelhado com Legumes",
    imagem: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    modo_preparo:
      "Tempere o frango, grelhe e sirva com legumes cozidos no vapor.",
    ingredientes: [
      { ingrediente: "Peito de frango", medida: "2 unidades" },
      { ingrediente: "Abobrinha", medida: "1 unidade" },
      { ingrediente: "Cenoura", medida: "1 unidade" },
      { ingrediente: "Azeite", medida: "2 colheres de sopa" },
      { ingrediente: "Sal e pimenta", medida: "a gosto" },
    ],
  },
  {
    nome: "Quiche de Espinafre",
    imagem: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
    modo_preparo:
      "Misture ovos, creme de leite e espinafre, coloque na massa e asse por 30 minutos.",
    ingredientes: [
      { ingrediente: "Massa pronta para quiche", medida: "1 unidade" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Creme de leite", medida: "200ml" },
      { ingrediente: "Espinafre", medida: "200g" },
      { ingrediente: "Queijo ralado", medida: "50g" },
    ],
  },
  {
    nome: "Sushi de Salmão",
    imagem: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
    modo_preparo: "Monte os sushis com arroz, nori e salmão fresco.",
    ingredientes: [
      { ingrediente: "Arroz para sushi", medida: "1 xícara" },
      { ingrediente: "Nori", medida: "2 folhas" },
      { ingrediente: "Salmão fresco", medida: "100g" },
      { ingrediente: "Vinagre de arroz", medida: "2 colheres de sopa" },
      { ingrediente: "Sal", medida: "1 pitada" },
    ],
  },
  {
    nome: "Feijoada",
    imagem:
      "https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/feijoada-1920w.jpg",
    modo_preparo:
      "Cozinhe as carnes salgadas até ficarem macias, adicione o feijão preto e temperos. Deixe apurar até o caldo engrossar.",
    ingredientes: [
      { ingrediente: "Feijão preto", medida: "500 g" },
      { ingrediente: "Carne seca", medida: "300 g" },
      { ingrediente: "Linguiça calabresa", medida: "2 unidades" },
      { ingrediente: "Cebola", medida: "1 unidade picada" },
      { ingrediente: "Alho", medida: "3 dentes picados" },
    ],
  },
  {
    nome: "Feijoada",
    imagem:
      "https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/feijoada-1920w.jpg",
    modo_preparo:
      "Cozinhe as carnes salgadas até ficarem macias, adicione o feijão preto e temperos. Deixe apurar até o caldo engrossar.",
    ingredientes: [
      { ingrediente: "Feijão preto", medida: "500 g" },
      { ingrediente: "Carne seca", medida: "300 g" },
      { ingrediente: "Linguiça calabresa", medida: "2 unidades" },
      { ingrediente: "Cebola", medida: "1 unidade picada" },
      { ingrediente: "Alho", medida: "3 dentes picados" },
    ],
  },
  {
    nome: "Pão de Queijo",
    imagem:
      "https://amopaocaseiro.com.br/wp-content/uploads/2022/08/yt-069_pao-de-queijo_receita-840x560.jpg",
    modo_preparo:
      "Misture todos os ingredientes até formar uma massa homogênea. Modele bolinhas e asse em forno médio por 25 minutos.",
    ingredientes: [
      { ingrediente: "Polvilho doce", medida: "2 xícaras" },
      { ingrediente: "Queijo minas ralado", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1/2 xícara" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Óleo", medida: "1/4 xícara" },
    ],
  },
  {
    nome: "Escondidinho de Carne Seca",
    imagem:
      "https://sabores-new.s3.amazonaws.com/public/2024/11/escondidinho-com-carne-seca-1024x494.jpg",
    modo_preparo:
      "Refogue a carne seca com temperos. Monte camadas de purê de mandioca e carne, finalize com queijo e leve ao forno.",
    ingredientes: [
      { ingrediente: "Carne seca", medida: "500 g" },
      { ingrediente: "Mandioca", medida: "1 kg" },
      { ingrediente: "Queijo mussarela", medida: "200 g" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Manteiga", medida: "2 colheres de sopa" },
    ],
  },
  {
    nome: "Coxinha",
    imagem:
      "https://canaldareceita.com.br/wp-content/uploads/2024/09/COXINHA-FIT.jpg",
    modo_preparo:
      "Cozinhe o frango e desfie. Faça uma massa com caldo e farinha, recheie, modele e frite até dourar.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "3 xícaras" },
      { ingrediente: "Caldo de frango", medida: "2 xícaras" },
      { ingrediente: "Frango desfiado", medida: "300 g" },
      { ingrediente: "Requeijão", medida: "2 colheres de sopa" },
      { ingrediente: "Farinha de rosca", medida: "para empanar" },
    ],
  },
  {
    nome: "Moqueca de Peixe",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDMB4bmLFrbcNBF7y8IiryC6Yli-QaRLgxw&s",
    modo_preparo:
      "Tempere o peixe, refogue com cebola, tomate e pimentão. Cozinhe em leite de coco e azeite de dendê até o molho engrossar.",
    ingredientes: [
      { ingrediente: "Peixe em postas", medida: "1 kg" },
      { ingrediente: "Leite de coco", medida: "200 ml" },
      { ingrediente: "Azeite de dendê", medida: "2 colheres de sopa" },
      { ingrediente: "Pimentão", medida: "1 unidade" },
      { ingrediente: "Tomate", medida: "2 unidades" },
    ],
  },
  {
    nome: "Empadão de Frango",
    imagem:
      "https://static.itdg.com.br/images/360-240/8542e00db2cd0f6761670765607e6255/shutterstock-2048280131-…",
    modo_preparo:
      "Prepare a massa, forre a forma, adicione o recheio de frango e cubra com o restante da massa. Asse até dourar.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "3 xícaras" },
      { ingrediente: "Manteiga", medida: "200 g" },
      { ingrediente: "Frango desfiado", medida: "400 g" },
      { ingrediente: "Requeijão", medida: "3 colheres de sopa" },
      { ingrediente: "Gema de ovo", medida: "1 unidade para pincelar" },
    ],
  },
  {
    nome: "Canjica",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfrtKrQvQoeM9ArVZY4r1qn6Hx9BjjpOONXQ&s",
    modo_preparo:
      "Cozinhe a canjica até amolecer. Adicione leite, leite condensado e coco. Deixe ferver até engrossar.",
    ingredientes: [
      { ingrediente: "Canjica branca", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 litro" },
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Coco ralado", medida: "100 g" },
      { ingrediente: "Canela em pau", medida: "1 unidade" },
    ],
  },
  {
    nome: "Farofa de Bacon",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TDWLEGzwYQXAohieZM5i9H5U1CYbl6M66g&s",
    modo_preparo:
      "Frite o bacon até dourar, adicione cebola e farinha de mandioca. Mexa até ficar crocante.",
    ingredientes: [
      { ingrediente: "Farinha de mandioca", medida: "2 xícaras" },
      { ingrediente: "Bacon picado", medida: "150 g" },
      { ingrediente: "Cebola", medida: "1 unidade picada" },
      { ingrediente: "Manteiga", medida: "1 colher de sopa" },
      { ingrediente: "Sal", medida: "a gosto" },
    ],
  },
  {
    nome: "Quindim",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpiZTvsXfqZrjQVGOXoYiF7yov7ZDWaNBfQ&s",
    modo_preparo:
      "Misture os ingredientes, despeje em forminhas untadas e asse em banho-maria até dourar.",
    ingredientes: [
      { ingrediente: "Gem as de ovo", medida: "10 unidades" },
      { ingrediente: "Açúcar", medida: "1 e 1/2 xícara" },
      { ingrediente: "Coco ralado", medida: "100 g" },
      { ingrediente: "Manteiga derretida", medida: "1 colher de sopa" },
    ],
  },
  {
    nome: "Brigadeiro de Colher",
    imagem:
      "https://static.itdg.com.br/images/360-240/d3eef984db9b069cf9876ede374b9f46/358934-original.jpg",
    modo_preparo:
      "Leve os ingredientes ao fogo mexendo até engrossar e desgrudar do fundo da panela.",
    ingredientes: [
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Chocolate em pó", medida: "3 colheres de sopa" },
      { ingrediente: "Manteiga", medida: "1 colher de sopa" },
      { ingrediente: "Granulado", medida: "para decorar" },
    ],
  },
  {
    nome: "Acarajé",
    imagem:
      "https://guiadacozinha.com.br/wp-content/uploads/2008/01/acaraje.jpg",
    modo_preparo:
      "Bata o feijão fradinho até formar uma massa, frite em azeite de dendê e sirva com vatapá e camarão seco.",
    ingredientes: [
      { ingrediente: "Feijão fradinho", medida: "500 g" },
      { ingrediente: "Cebola", medida: "1 unidade picada" },
      { ingrediente: "Sal", medida: "a gosto" },
      { ingrediente: "Azeite de dendê", medida: "para fritar" },
      { ingrediente: "Camarão seco", medida: "100 g" },
    ],
  },
  {
    nome: "Vatapá",
    imagem:
      "https://static.itdg.com.br/images/640-440/3dbfc74d0db01bb5ee5ab39598dbbc02/105327-original.jpg",
    modo_preparo:
      "Bata os ingredientes no liquidificador, leve ao fogo e cozinhe até engrossar, mexendo sempre.",
    ingredientes: [
      { ingrediente: "Pão amanhecido", medida: "4 unidades" },
      { ingrediente: "Leite de coco", medida: "400 ml" },
      { ingrediente: "Amendoim torrado", medida: "1/2 xícara" },
      { ingrediente: "Castanha de caju", medida: "1/2 xícara" },
      { ingrediente: "Azeite de dendê", medida: "2 colheres de sopa" },
    ],
  },
  {
    nome: "Tutu de Feijão",
    imagem:
      "https://www.estadao.com.br/resizer/v2/7BJ7FGF7FJNTVNEW4ZLFORY4IE.jpg?quality=80&auth=040999597a…",
    modo_preparo:
      "Refogue alho, cebola e bacon, adicione feijão batido e farinha de mandioca até engrossar.",
    ingredientes: [
      { ingrediente: "Feijão cozido", medida: "2 xícaras" },
      { ingrediente: "Farinha de mandioca", medida: "1 xícara" },
      { ingrediente: "Bacon", medida: "100 g" },
      { ingrediente: "Cebola", medida: "1 unidade picada" },
      { ingrediente: "Alho", medida: "2 dentes picados" },
    ],
  },
  {
    nome: "Arroz Carreteiro",
    imagem:
      "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/f4322f4b99edd0f839d72ddf8908df79.…",
    modo_preparo:
      "Refogue carne seca com alho e cebola, adicione arroz e cozinhe até ficar soltinho.",
    ingredientes: [
      { ingrediente: "Arroz", medida: "2 xícaras" },
      { ingrediente: "Carne seca", medida: "300 g" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Alho", medida: "2 dentes" },
      { ingrediente: "Cheiro-verde", medida: "a gosto" },
    ],
  },
  {
    nome: "Bobó de Camarão",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZo6V5pJ8QwQRbkLI8iOKwEKPQup3Y4c1sug&s",
    modo_preparo:
      "Cozinhe a mandioca e bata com leite de coco. Refogue o camarão e misture tudo com azeite de dendê.",
    ingredientes: [
      { ingrediente: "Camarão", medida: "500 g" },
      { ingrediente: "Mandioca", medida: "500 g" },
      { ingrediente: "Leite de coco", medida: "200 ml" },
      { ingrediente: "Azeite de dendê", medida: "1 colher de sopa" },
      { ingrediente: "Cebola", medida: "1 unidade" },
    ],
  },
  {
    nome: "Arroz Doce",
    imagem:
      "https://cdn0.tudoreceitas.com/pt/posts/8/0/6/arroz_doce_tradicional_portugues_6608_orig.jpg",
    modo_preparo:
      "Cozinhe o arroz com água, adicione leite, açúcar e leite condensado, e mexa até engrossar.",
    ingredientes: [
      { ingrediente: "Arroz", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 litro" },
      { ingrediente: "Açúcar", medida: "1/2 xícara" },
      { ingrediente: "Leite condensado", medida: "1/2 lata" },
      { ingrediente: "Canela em pó", medida: "a gosto" },
    ],
  },
  {
    nome: "Bolinho de Chuva",
    imagem:
      "https://www.receiteria.com.br/wp-content/uploads/bolinho-de-chuva-capa.png",
    modo_preparo:
      "Misture os ingredientes até formar uma massa. Frite em óleo quente e polvilhe açúcar e canela.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "2 xícaras" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Leite", medida: "1/2 xícara" },
      { ingrediente: "Açúcar", medida: "3 colheres de sopa" },
      { ingrediente: "Fermento em pó", medida: "1 colher de chá" },
    ],
  },
  {
    nome: "Pudim de Leite Condensado",
    imagem:
      "https://static.itdg.com.br/images/360-240/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-…",
    modo_preparo:
      "Bata tudo no liquidificador, despeje em forma caramelizada e asse em banho-maria por 1 hora.",
    ingredientes: [
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Leite", medida: "2 medidas da lata" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Açúcar", medida: "1 xícara (para o caramelo)" },
    ],
  },
  {
    nome: "Carne de Panela com Batata",
    imagem:
      "https://s2-receitas.glbimg.com/Sekdv7EdPfw90fD-CiGEhXfhTjw=/0x0:1280x800/984x0/smart/filters:strip_…",
    modo_preparo:
      "Refogue a carne com alho e cebola, adicione água e cozinhe até ficar macia. Acrescente as batatas e finalize o cozimento.",
    ingredientes: [
      { ingrediente: "Carne bovina (acem ou músculo)", medida: "500 g" },
      { ingrediente: "Batata", medida: "3 unidades médias" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Alho", medida: "3 dentes" },
      { ingrediente: "Sal", medida: "a gosto" },
    ],
  },
  {
    nome: "Panqueca de Carne Moída",
    imagem:
      "https://sabores-new.s3.amazonaws.com/public/2024/11/panquecas-de-carne-moida.jpg",
    modo_preparo:
      "Prepare a massa com leite, ovos e farinha. Recheie com carne moída e cubra com molho de tomate. Leve ao forno para gratinar.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 xícara" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Carne moída", medida: "300 g" },
      { ingrediente: "Molho de tomate", medida: "1 xícara" },
    ],
  },
  {
    nome: "Pastel de Feira",
    imagem:
      "https://minhasreceitinhas.com.br/wp-content/uploads/2023/05/Pastel-de-feira-caseiro-1200x692.jpg",
    modo_preparo:
      "Prepare a massa, recheie com carne, queijo ou palmito, feche bem e frite em óleo quente até dourar.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "3 xícaras" },
      { ingrediente: "Água morna", medida: "1 xícara" },
      { ingrediente: "Óleo", medida: "2 colheres de sopa" },
      { ingrediente: "Sal", medida: "1 colher de chá" },
      { ingrediente: "Recheio a gosto", medida: "200 g" },
    ],
  },
  {
    nome: "Mousse de Maracujá",
    imagem:
      "https://static.itdg.com.br/images/360-240/8fed8f60d3c8e3990396e2478cbc7f2a/shutterstock-1905617575-…",
    modo_preparo:
      "Bata todos os ingredientes no liquidificador até obter um creme homogêneo. Leve à geladeira por 2 horas.",
    ingredientes: [
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Creme de leite", medida: "1 lata" },
      { ingrediente: "Suco de maracujá concentrado", medida: "1/2 xícara" },
    ],
  },
  {
    nome: "Baião de Dois",
    imagem:
      "https://guiadacozinha.com.br/wp-content/uploads/2019/10/baiao-de-dois-pressao-768x619.jpg",
    modo_preparo:
      "Refogue alho e cebola, adicione o feijão e o arroz cozidos, misture com queijo coalho e coentro.",
    ingredientes: [
      { ingrediente: "Feijão verde", medida: "2 xícaras" },
      { ingrediente: "Arroz", medida: "2 xícaras" },
      { ingrediente: "Queijo coalho", medida: "200 g" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Coentro", medida: "a gosto" },
    ],
  },
  {
    nome: "Cuscuz Nordestino",
    imagem:
      "https://sabores-new.s3.amazonaws.com/public/2024/11/CUZCUZ_NORDESTINO_CLOSE.jpg",
    modo_preparo:
      "Misture o flocão com água e sal, deixe hidratar e cozinhe na cuscuzeira por cerca de 10 minutos.",
    ingredientes: [
      { ingrediente: "Flocão de milho", medida: "2 xícaras" },
      { ingrediente: "Água", medida: "1 xícara" },
      { ingrediente: "Sal", medida: "a gosto" },
      { ingrediente: "Manteiga", medida: "para servir" },
    ],
  },
  {
    nome: "Tapioca com Coco e Leite Condensado",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAN2_TznfnfTbu_MehnhKgCfMNH5gEgdV5-g&s",
    modo_preparo:
      "Aqueça a frigideira, espalhe a goma de tapioca e recheie com coco e leite condensado. Dobre e sirva quente.",
    ingredientes: [
      { ingrediente: "Goma de tapioca", medida: "1 xícara" },
      { ingrediente: "Coco ralado", medida: "2 colheres de sopa" },
      { ingrediente: "Leite condensado", medida: "a gosto" },
    ],
  },
  {
    nome: "Caldo Verde",
    imagem: "https://i.panelinha.com.br/i1/bk-6324-blog-caldo-verde-2-1.webp",
    modo_preparo:
      "Cozinhe as batatas, bata no liquidificador e volte à panela. Adicione a couve e a calabresa fatiada.",
    ingredientes: [
      { ingrediente: "Batata", medida: "4 unidades" },
      { ingrediente: "Couve", medida: "4 folhas" },
      { ingrediente: "Linguiça calabresa", medida: "1 unidade" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Alho", medida: "2 dentes" },
    ],
  },
  {
    nome: "Manjar Branco",
    imagem: "https://i.panelinha.com.br/i1/bk-2284-manjar.webp",
    modo_preparo:
      "Misture os ingredientes e leve ao fogo até engrossar. Despeje em forma untada e leve à geladeira.",
    ingredientes: [
      { ingrediente: "Leite", medida: "1 litro" },
      { ingrediente: "Amido de milho", medida: "6 colheres de sopa" },
      { ingrediente: "Leite de coco", medida: "200 ml" },
      { ingrediente: "Açúcar", medida: "1 xícara" },
      { ingrediente: "Calda de ameixa", medida: "para cobrir" },
    ],
  },
  {
    nome: "Bolinho de Bacalhau",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtW5CgoQ6qENnDYVJ6Rmk8yfoo5o_cxbMHiQ&s",
    modo_preparo:
      "Misture o bacalhau desfiado com batata amassada e temperos, molde os bolinhos e frite até dourar.",
    ingredientes: [
      { ingrediente: "Bacalhau dessalgado e desfiado", medida: "300 g" },
      { ingrediente: "Batata cozida", medida: "3 unidades médias" },
      { ingrediente: "Ovos", medida: "1 unidade" },
      { ingrediente: "Salsinha", medida: "a gosto" },
      { ingrediente: "Óleo", medida: "para fritar" },
    ],
  },
  {
    nome: "Beijinho",
    imagem:
      "https://www.saborbrasil.it/wp-content/uploads/2021/06/beijinho-1024x768.jpg",
    modo_preparo:
      "Misture os ingredientes e leve ao fogo até soltar do fundo da panela. Modele e passe no coco ralado.",
    ingredientes: [
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Coco ralado", medida: "100 g" },
      { ingrediente: "Manteiga", medida: "1 colher de sopa" },
      { ingrediente: "Cravo-da-índia", medida: "para decorar" },
    ],
  },
  {
    nome: "Sopa de Mandioquinha",
    imagem:
      "https://i.panelinha.com.br/i1/bk-9167-sanremo-02-26905-sopa-receita.webp",
    modo_preparo:
      "Cozinhe a mandioquinha até amolecer, bata no liquidificador e volte à panela com temperos e carne desfiada.",
    ingredientes: [
      { ingrediente: "Mandioquinha", medida: "500 g" },
      { ingrediente: "Cebola", medida: "1 unidade" },
      { ingrediente: "Alho", medida: "2 dentes" },
      { ingrediente: "Carne cozida e desfiada", medida: "200 g" },
      { ingrediente: "Sal", medida: "a gosto" },
    ],
  },
  {
    nome: "Lasanha à Bolonhesa",
    imagem:
      "https://static.itdg.com.br/images/360-240/ec2a5e38702c60bf1ace0b5f1c8e9415/shutterstock-739787011.j…",
    modo_preparo:
      "Monte camadas de massa, molho bolonhesa e queijo. Leve ao forno até gratinar.",
    ingredientes: [
      { ingrediente: "Massa de lasanha", medida: "300 g" },
      { ingrediente: "Molho bolonhesa", medida: "2 xícaras" },
      { ingrediente: "Queijo mussarela", medida: "200 g" },
      { ingrediente: "Queijo parmesão ralado", medida: "50 g" },
    ],
  },
  {
    nome: "Hambúrguer com Pão e Queijo",
    imagem:
      "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/YJX6VGWNTNDK3GLF3XWWWE2DGQ.jpg",
    modo_preparo:
      "Grelhe o hambúrguer, coloque no pão com queijo, alface, tomate e molho a gosto.",
    ingredientes: [
      { ingrediente: "Pão de hambúrguer", medida: "2 unidades" },
      { ingrediente: "Hambúrguer de carne", medida: "2 unidades" },
      { ingrediente: "Queijo", medida: "2 fatias" },
      { ingrediente: "Alface", medida: "2 folhas" },
      { ingrediente: "Tomate", medida: "2 rodelas" },
    ],
  },
  {
    nome: "Hot Dog",
    imagem:
      "https://static.itdg.com.br/images/1200-630/075596851d51833ae0375d58a9c7c1ff/116615-original.jpg",
    modo_preparo:
      "Cozinhe a salsicha, coloque no pão e cubra com ketchup, mostarda, maionese, batata palha e queijo.",
    ingredientes: [
      { ingrediente: "Pão de hot dog", medida: "2 unidades" },
      { ingrediente: "Salsicha", medida: "2 unidades" },
      { ingrediente: "Ketchup", medida: "a gosto" },
      { ingrediente: "Mostarda", medida: "a gosto" },
      { ingrediente: "Batata palha", medida: "a gosto" },
    ],
  },
  {
    nome: "Yakisoba",
    imagem:
      "https://www.lecreuset.com.br/dw/image/v2/BDRT_PRD/on/demandware.static/-/Sites-le-creuset-br-master…",
    modo_preparo:
      "Refogue macarrão com legumes variados e frango ou carne, tempere com molho shoyu e sirva quente.",
    ingredientes: [
      { ingrediente: "Macarrão para yakisoba", medida: "250 g" },
      { ingrediente: "Frango em tiras", medida: "200 g" },
      { ingrediente: "Cenoura", medida: "1 unidade" },
      { ingrediente: "Brócolis", medida: "100 g" },
      { ingrediente: "Molho shoyu", medida: "3 colheres de sopa" },
    ],
  },
  {
    nome: "Crepe de Presunto e Queijo",
    imagem:
      "https://onthelist.com.br/uploads/2016/11/shutterstock_153897920-e1389285265481.jpg",
    modo_preparo:
      "Faça a massa, recheie com presunto e queijo, dobre e grelhe até dourar.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 xícara" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Presunto", medida: "2 fatias" },
      { ingrediente: "Queijo", medida: "2 fatias" },
    ],
  },
  {
    nome: "Sushi Simples",
    imagem:
      "https://www.diadepeixe.com.br/extranet/thumbnail/crop/550x360/Receita/shutterstock_2105735288_17464…",
    modo_preparo:
      "Monte rolinhos de arroz com alga e recheio de peixe ou legumes, corte e sirva com shoyu.",
    ingredientes: [
      { ingrediente: "Arroz para sushi", medida: "1 xícara" },
      { ingrediente: "Alga nori", medida: "2 folhas" },
      { ingrediente: "Peixe fresco", medida: "100 g" },
      { ingrediente: "Pepino", medida: "1/2 unidade" },
      { ingrediente: "Shoyu", medida: "a gosto" },
    ],
  },
  {
    nome: "Espaguete à Carbonara",
    imagem: "https://cdn.urbano.com.br/uploads/espaguete-a-carbonara-800.jpg",
    modo_preparo:
      "Cozinhe o macarrão e misture com ovos batidos, queijo parmesão e bacon frito.",
    ingredientes: [
      { ingrediente: "Espaguete", medida: "200 g" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Queijo parmesão", medida: "50 g" },
      { ingrediente: "Bacon", medida: "100 g" },
      { ingrediente: "Pimenta-do-reino", medida: "a gosto" },
    ],
  },
  {
    nome: "Chow Mein",
    imagem:
      "https://takestwoeggs.com/wp-content/uploads/2025/05/Cantonese-Chow-Mein-noodle-pull.jpg",
    modo_preparo:
      "Refogue macarrão chinês com legumes e frango ou carne, tempere com molho shoyu.",
    ingredientes: [
      { ingrediente: "Macarrão chinês", medida: "200 g" },
      { ingrediente: "Frango em tiras", medida: "200 g" },
      { ingrediente: "Cenoura", medida: "1 unidade" },
      { ingrediente: "Pimentão", medida: "1 unidade" },
      { ingrediente: "Molho shoyu", medida: "3 colheres de sopa" },
    ],
  },
  {
    nome: "Tacos Brasileiros",
    imagem: "https://uploads.agorars.com/2024/04/Capas-e-fotos-Agora-RS-77.jpg",
    modo_preparo:
      "Recheie tortilhas com carne moída, queijo, alface e tomate. Dobre e sirva com molho.",
    ingredientes: [
      { ingrediente: "Tortilhas", medida: "4 unidades" },
      { ingrediente: "Carne moída", medida: "200 g" },
      { ingrediente: "Queijo", medida: "100 g" },
      { ingrediente: "Alface", medida: "2 folhas" },
      { ingrediente: "Tomate", medida: "1 unidade" },
    ],
  },
  {
    nome: "Brownie",
    imagem:
      "https://static.itdg.com.br/images/1200-630/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575…",
    modo_preparo:
      "Misture os ingredientes, despeje em forma untada e asse por 25-30 minutos. Sirva em pedaços.",
    ingredientes: [
      { ingrediente: "Chocolate meio amargo", medida: "200 g" },
      { ingrediente: "Manteiga", medida: "100 g" },
      { ingrediente: "Açúcar", medida: "1 xícara" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Farinha de trigo", medida: "1/2 xícara" },
    ],
  },
  {
    nome: "Cheesecake",
    imagem:
      "https://static.itdg.com.br/images/360-240/722816207b46644920ab0c65a7faab72/shutterstock-2202992931.…",
    modo_preparo:
      "Misture a base, pressione na forma, prepare o recheio e asse. Deixe gelar antes de servir.",
    ingredientes: [
      { ingrediente: "Cream cheese", medida: "400 g" },
      { ingrediente: "Biscoito triturado", medida: "150 g" },
      { ingrediente: "Manteiga derretida", medida: "50 g" },
      { ingrediente: "Açúcar", medida: "1/2 xícara" },
      { ingrediente: "Ovos", medida: "3 unidades" },
    ],
  },
  {
    nome: "Churros",
    imagem:
      "https://static.itdg.com.br/images/360-240/b0a2d7797c9b1174ec771c88d64d2322/324392-original.jpg",
    modo_preparo:
      "Prepare a massa, frite em óleo quente, recheie com doce de leite e passe no açúcar com canela.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "1 xícara" },
      { ingrediente: "Água", medida: "1 xícara" },
      { ingrediente: "Açúcar", medida: "2 colheres de sopa" },
      { ingrediente: "Óleo para fritar", medida: "a gosto" },
      { ingrediente: "Doce de leite", medida: "100 g" },
    ],
  },
  {
    nome: "Panquecas Americanas",
    imagem:
      "https://static.itdg.com.br/images/360-240/34e48b244df56bb8c516375eb418ed45/panqueca-americana.jpg",
    modo_preparo:
      "Misture os ingredientes da massa, aqueça a frigideira e faça as panquecas. Sirva com mel ou geleia.",
    ingredientes: [
      { ingrediente: "Farinha de trigo", medida: "1 xícara" },
      { ingrediente: "Leite", medida: "1 xícara" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Fermento em pó", medida: "1 colher de chá" },
      { ingrediente: "Manteiga", medida: "2 colheres de sopa" },
    ],
  },
  {
    nome: "Pavê de Chocolate",
    imagem:
      "https://static.itdg.com.br/images/360-240/543ffeb02eaaa8dfe47ab5042b65a908/253792-354452-original-1…",
    modo_preparo:
      "Alterne camadas de biscoito e creme de chocolate. Leve à geladeira por 4 horas antes de servir.",
    ingredientes: [
      { ingrediente: "Biscoito maisena", medida: "200 g" },
      { ingrediente: "Creme de leite", medida: "200 ml" },
      { ingrediente: "Chocolate em pó", medida: "3 colheres de sopa" },
      { ingrediente: "Leite", medida: "1/2 xícara" },
    ],
  },
  {
    nome: "Torta de Limão",
    imagem:
      "https://recipesblob.oetker.com.br/assets/d044a4ef3cfe45998593f500c00942ef/1272x764/torta-de-limo.jpg",
    modo_preparo:
      "Prepare a base de biscoito, faça o creme de limão, leve à geladeira e cubra com chantilly.",
    ingredientes: [
      { ingrediente: "Biscoito triturado", medida: "200 g" },
      { ingrediente: "Manteiga derretida", medida: "100 g" },
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Suco de limão", medida: "1/2 xícara" },
      { ingrediente: "Chantilly", medida: "200 ml" },
    ],
  },
  {
    nome: "Romeu e Julieta",
    imagem: "https://www.restodonte.com.br/recipePics/9900153.jpg?v132",
    modo_preparo: "Monte camadas de queijo e goiabada, corte em cubos e sirva.",
    ingredientes: [
      { ingrediente: "Goiabada", medida: "200 g" },
      { ingrediente: "Queijo minas", medida: "200 g" },
    ],
  },
  {
    nome: "Pudim de Leite",
    imagem:
      "https://static.itdg.com.br/images/640-440/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-…",
    modo_preparo:
      "Misture os ingredientes, despeje em forma caramelizada e asse em banho-maria. Deixe gelar antes de desenformar.",
    ingredientes: [
      { ingrediente: "Leite condensado", medida: "1 lata" },
      { ingrediente: "Leite", medida: "2 xícaras" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Açúcar", medida: "1 xícara" },
    ],
  },
  {
    nome: "Bolo de Cenoura com Chocolate",
    imagem:
      "https://static.itdg.com.br/images/360-240/b2b92774c7fec4a05604e5573ef5a294/365326-original.jpg",
    modo_preparo:
      "Bata os ingredientes, asse por 40 minutos, cubra com ganache de chocolate.",
    ingredientes: [
      { ingrediente: "Cenoura", medida: "3 unidades" },
      { ingrediente: "Farinha de trigo", medida: "2 xícaras" },
      { ingrediente: "Açúcar", medida: "2 xícaras" },
      { ingrediente: "Ovos", medida: "3 unidades" },
      { ingrediente: "Chocolate em pó", medida: "1/2 xícara" },
    ],
  },
  {
    nome: "Petit Gateau",
    imagem:
      "https://static.itdg.com.br/images/360-240/3e09b0badb98941eb18e353b7a3cd8a2/365954-original.jpg",
    modo_preparo:
      "Prepare a massa de chocolate, asse em forno bem quente por pouco tempo para ficar cremoso por dentro. Sirva com sorvete.",
    ingredientes: [
      { ingrediente: "Chocolate meio amargo", medida: "100 g" },
      { ingrediente: "Manteiga", medida: "50 g" },
      { ingrediente: "Ovos", medida: "2 unidades" },
      { ingrediente: "Açúcar", medida: "50 g" },
      { ingrediente: "Farinha de trigo", medida: "2 colheres de sopa" },
    ],
  },
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
