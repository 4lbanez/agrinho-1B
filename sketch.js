function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let cesta;
let macas = [];
let pontuacao = 0;
let jogoAtivo = false;

function setup() {
  createCanvas(400, 600);
  cesta = new Cesta();
  textFont('Arial');
  textSize(24);
  frameRate(60);
}

function draw() {
  background(173, 216, 230); // azul clarinho

  if (!jogoAtivo) {
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Clique para começar", width / 2, height / 2);
    return;
  }

  cesta.mostrar();
  cesta.mover();

  if (frameCount % 60 === 0) {
    macas.push(new Maca());
  }

  for (let i = macas.length - 1; i >= 0; i--) {
    macas[i].atualizar();
    macas[i].mostrar();

    if (macas[i].pegou(cesta)) {
      macas.splice(i, 1);
      pontuacao++;
    } else if (macas[i].y > height) {
      macas.splice(i, 1);
    }
  }

  fill(255);
  stroke(0);
  strokeWeight(2);
  textAlign(LEFT, TOP);
  textSize(24);
  text("Pontuação: " + pontuacao, 10, 10);
}

function mousePressed() {
  if (!jogoAtivo) {
    jogoAtivo = true;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    cesta.direcao = -1;
  } else if (keyCode === RIGHT_ARROW) {
    cesta.direcao = 1;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    cesta.direcao = 0;
  }
}

class Cesta {
  constructor() {
    this.largura = 100;
    this.altura = 20;
    this.x = width / 2;
    this.y = height - this.altura * 2;
    this.vel = 5;
    this.direcao = 0;
  }

  mover() {
    this.x += this.direcao * this.vel;
    this.x = constrain(this.x, 0, width - this.largura);
  }

  mostrar() {
    textSize(48);
    text("🧺", this.x, this.y);
  }
}

class Maca {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 0;
    this.vel = 3;
    this.tamanho = 32;
  }

  atualizar() {
    this.y += this.vel;
  }

  mostrar() {
    textSize(this.tamanho);
    text("🍎", this.x, this.y);
  }

  pegou(cesta) {
    return this.y + this.tamanho / 2 > cesta.y &&
           this.x > cesta.x &&
           this.x < cesta.x + cesta.largura;
  }
}