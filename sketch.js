// Variáveis do jogador
let dinheiro = 1000;
let plantacoes = 0;
let precoVenda = 150;
let precoCompra = 100;

// Clima
let clima = "☀️ Sol";
let efeitoClima = "";

// Agricultores
let agricultores = [1, 1, 1]; // 1 = disponível

// Estado do jogo
let estado = "jogando"; // "jogando", "vitoria", "falencia"

function setup() {
  createCanvas(800, 600);
  textFont('Arial');
}

function draw() {
  background(200, 255, 200);

  if (estado === "jogando") {
    desenharJogo();
    verificarVitoriaOuFalencia();
  } else if (estado === "vitoria") {
    telaVitoria();
  } else if (estado === "falencia") {
    telaFalencia();
  }
}

function desenharJogo() {
  // Título
  fill(0);
  textSize(24);
  text("🌾 Fazenda Moderna 🌾", 280, 40);

  // Informações
  textSize(18);
  text(`Dinheiro: R$ ${dinheiro}`, 50, 100);
  text(`Plantações: ${plantacoes}`, 50, 130);
  text(`Preço de venda: R$ ${precoVenda}`, 50, 160);
  text(`Preço de compra: R$ ${precoCompra}`, 50, 190);

  // Clima
  text(`Clima Atual: ${clima}`, 50, 220);
  text(`${efeitoClima}`, 50, 240);

  // Botões
  drawButton(50, 280, 200, 50, "🌱 Plantar");
  drawButton(50, 350, 200, 50, "🌾 Colher");
  drawButton(50, 420, 200, 50, "🤝 Negociar");
  drawButton(50, 490, 200, 50, "🔄 Próximo Dia");

  // Agricultores
  text("Agricultores Disponíveis:", 300, 280);
  for (let i = 0; i < agricultores.length; i++) {
    let status = agricultores[i] === 1 ? "✅" : "❌";
    text(`Agricultor ${i + 1} ${status}`, 300, 310 + i * 30);
  }
}

function drawButton(x, y, w, h, label) {
  fill(100, 200, 100);
  rect(x, y, w, h, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x + w / 2, y + h / 2);
}

function mousePressed() {
  if (estado !== "jogando") {
    reiniciarJogo();
    return;
  }

  if (isInside(mouseX, mouseY, 50, 280, 200, 50)) {
    plantar();
  }
  if (isInside(mouseX, mouseY, 50, 350, 200, 50)) {
    colher();
  }
  if (isInside(mouseX, mouseY, 50, 420, 200, 50)) {
    negociar();
  }
  if (isInside(mouseX, mouseY, 50, 490, 200, 50)) {
    proximoDia();
  }
}

function isInside(px, py, x, y, w, h) {
  return px > x && px < x + w && py > y && py < y + h;
}

function plantar() {
  if (dinheiro >= precoCompra) {
    plantacoes++;
    dinheiro -= precoCompra;
  }
}

function colher() {
  if (plantacoes > 0) {
    plantacoes--;
    dinheiro += precoVenda;
  }
}

function negociar() {
  let indice = floor(random(agricultores.length));
  if (agricultores[indice] === 1) {
    precoVenda += floor(random(10, 30));
    precoCompra = max(10, precoCompra - floor(random(5, 15)));
    agricultores[indice] = 0;
  }
}

function proximoDia() {
  // Resetar agricultores
  agricultores = [1, 1, 1];

  // Sorteia o clima
  let climaSorteado = random(["☀️ Sol", "🌧️ Chuva", "🔥 Seca", "🐛 Praga"]);
  clima = climaSorteado;

  // Aplicar efeito do clima
  if (clima === "☀️ Sol") {
    efeitoClima = "Tempo bom, tudo normal.";
  } else if (clima === "🌧️ Chuva") {
    efeitoClima = "Chuva abundante! +1 plantação grátis.";
    plantacoes += 1;
  } else if (clima === "🔥 Seca") {
    efeitoClima = "Seca! Preço de venda sobe, mas perde 1 plantação.";
    precoVenda += 20;
    plantacoes = max(0, plantacoes - 1);
  } else if (clima === "🐛 Praga") {
    efeitoClima = "Praga! Perde 2 plantações!";
    plantacoes = max(0, plantacoes - 2);
  }
}

function verificarVitoriaOuFalencia() {
  if (dinheiro >= 5000) {
    estado = "vitoria";
  } else if (dinheiro <= 0 && plantacoes === 0) {
    estado = "falencia";
  }
}

function telaVitoria() {
  background(150, 250, 150);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("🎉 Você venceu! 🎉", width / 2, height / 2 - 30);
  textSize(20);
  text("Clique para jogar novamente", width / 2, height / 2 + 20);
}

function telaFalencia() {
  background(250, 150, 150);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("💀 Você faliu! 💀", width / 2, height / 2 - 30);
  textSize(20);
  text("Clique para tentar novamente", width / 2, height / 2 + 20);
}

function reiniciarJogo() {
  dinheiro = 1000;
  plantacoes = 0;
  precoVenda = 150;
  precoCompra = 100;
  agricultores = [1, 1, 1];
  clima = "☀️ Sol";
  efeitoClima = "";
  estado = "jogando";
}
