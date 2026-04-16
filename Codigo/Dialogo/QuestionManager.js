export class QuestionManager {
  constructor(scene) {
    this.scene = scene;
    this.preguntas = [];
    this.indiceActual = 0;
  }

  cargarPreguntas(jsonKey) {
    const data = this.scene.cache.json.get(jsonKey);
    this.preguntas = data;
    this.indiceActual = 0;
  }

  ask(jsonKey, onComplete) {
  if (this.preguntas.length === 0) {
    this.cargarPreguntas(jsonKey);
  }

  if (this.indiceActual >= this.preguntas.length) {
    if (onComplete) onComplete(null);
    return;
  }

  const preguntaData = this.preguntas[this.indiceActual];
  this.indiceActual++;

  const questionText = preguntaData["Pregunta"];
  const options = [preguntaData["Inciso A"], preguntaData["Inciso B"]];
  const correctIndex = preguntaData["Index correcto"] - 1;

  this._mostrarPregunta(questionText, options, correctIndex, (isCorrect) => {
    if (onComplete) onComplete(isCorrect); 
    
    if (this.scene.combateActivo) {
      this.ask(jsonKey, onComplete);
    }

  });
}

  _mostrarPregunta(questionText, options, correctIndex, onComplete) {
    const camWidth = this.scene.cameras.main.width;
    const camHeight = this.scene.cameras.main.height;

    const width = camWidth * 0.4;
    const x = camWidth * 0.55;
    const y = camHeight - 600;
    const height = 350;

    const elementos = [];

    const background = this.scene.add.graphics();
    background.fillStyle(0x000000, 0.7);
    background.fillRect(x, y, width, height);
    background.lineStyle(6, 0xffffff, 1);
    background.strokeRect(x, y, width, height);
    background.setScrollFactor(0).setDepth(100);
    elementos.push(background);

    const txt = this.scene.add.text(x + width / 2, y + 60, questionText, {
      fontSize: "28px",
      fontFamily: "Arial, sans-serif",
      fill: "#ffffff",
      align: 'center',
      stroke: "#000000",
      strokeThickness: 6,
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);
    elementos.push(txt);

    const btnAncho = width * 0.40;
    const btnAlto = 180;
    const gap = width * 0.04; 
    const totalBtns = btnAncho * 2 + gap; 
    const startX = x + (width - totalBtns) / 2; 

    const btnY = y + 150; 

    const btnPositions = [
      startX,
      startX + btnAncho + gap
    ];
    options.slice(0, 2).forEach((opt, i) => {
      const btnX = btnPositions[i];

      const btnBg = this.scene.add.graphics();
      btnBg.setScrollFactor(0).setDepth(102);
      elementos.push(btnBg);

      const drawBtn = (bgColor, strokeColor) => {
        btnBg.clear();
        btnBg.fillStyle(bgColor, 0.9);
        btnBg.fillRoundedRect(btnX, btnY, btnAncho, btnAlto, 8);
        btnBg.lineStyle(4, strokeColor, 1);
        btnBg.strokeRoundedRect(btnX, btnY, btnAncho, btnAlto, 8);
      };

      drawBtn(0x000000, 0xffffff);

      const btnTxt = this.scene.add.text(btnX + btnAncho / 2, btnY + btnAlto / 2, opt, {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: "Arial, sans-serif",
        fontStyle: 'bold',
        wordWrap: { width: btnAncho - 10 },
        align: 'center'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(103);
      elementos.push(btnTxt);

      const zone = this.scene.add.zone(btnX + btnAncho / 2, btnY + btnAlto / 2, btnAncho, btnAlto);
      zone.setScrollFactor(0).setDepth(104).setInteractive();
      elementos.push(zone);

      zone.on('pointerover', () => {
       drawBtn(0x4a2e00, 0xeeb710); 
       btnTxt.setStyle({ fill: '#eeb710' });
      });
      zone.on('pointerout', () => {
       drawBtn(0x000000, 0xffffff); // negro, borde blanco
       btnTxt.setStyle({ fill: '#ffffff' }); // letras blancas
      });
      zone.on('pointerdown', () => {
       if (this.scene.movimientoBloqueado) return;
       const isCorrect = (i === correctIndex);
       elementos.forEach(el => el.destroy());
       if (onComplete) onComplete(isCorrect);
      });
    });
  }
}