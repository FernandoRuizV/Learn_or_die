export class QuestionManager {
  constructor(scene) {
    this.scene = scene;
  }

  ask(questionText, options, correctIndex, onComplete) {
    const container = this.scene.add.container(0, 0);
    container.setScrollFactor(0);
    container.setDepth(100);

    // --- DIMENSIONES NUEVAS (Cuadrado 200x200) ---
    const anchoCaja = 300; // Aumentado un poco de 200 para que quepa el texto grande
    const altoCaja = 350; 
    const centroX = this.scene.scale.width / 2;
    const centroY = this.scene.scale.height / 2;

    // 1. Fondo Cuadrado Blanco
    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff, 1);
    // Dibujamos centrado: x, y, ancho, alto
    background.fillRoundedRect(centroX - (anchoCaja / 2), centroY - (altoCaja / 2), anchoCaja, altoCaja, 15);
    background.lineStyle(4, 0x000000, 1);
    background.strokeRoundedRect(centroX - (anchoCaja / 2), centroY - (altoCaja / 2), anchoCaja, altoCaja, 15);
    container.add(background);

    // 2. Texto de la Pregunta (Más Grande)
    const txt = this.scene.add.text(centroX, centroY - 80, questionText, {
      fontSize: '32px', // Texto más grande
      color: '#000',
      align: 'center',
      fontStyle: 'bold',
      wordWrap: { width: anchoCaja - 40 }
    }).setOrigin(0.5);
    container.add(txt);

    // 3. Botones Grandes (Verticales para abarcar la caja)
    const buttons = options.slice(0, 2).map((opt, i) => {
      // Posición vertical: uno debajo del otro
      const btnGroup = this.scene.add.container(centroX, centroY + 40 + (i * 90));
      
      const btnAncho = anchoCaja - 40; // Casi todo el ancho de la caja
      const btnAlto = 70; // Botones más altos

      const btnBg = this.scene.add.graphics();
      btnBg.fillStyle(0x333333, 1);
      btnBg.fillRoundedRect(-(btnAncho / 2), -(btnAlto / 2), btnAncho, btnAlto, 10);
      
      const btnTxt = this.scene.add.text(0, 0, opt, {
        fontSize: '24px', // Letras de botones más grandes
        color: '#fff',
        wordWrap: { width: btnAncho - 20 },
        align: 'center'
      }).setOrigin(0.5);

      btnGroup.add([btnBg, btnTxt]);
      btnGroup.setSize(btnAncho, btnAlto);
      btnGroup.setInteractive(new Phaser.Geom.Rectangle(-(btnAncho / 2), -(btnAlto / 2), btnAncho, btnAlto), Phaser.Geom.Rectangle.Contains);

      btnGroup.on('pointerdown', () => {
        const isCorrect = (i === correctIndex);
        container.destroy(); 
        if (onComplete) onComplete(isCorrect);
      });

      btnGroup.on('pointerover', () => btnBg.alpha = 0.8);
      btnGroup.on('pointerout', () => btnBg.alpha = 1);

      return btnGroup;
    });

    container.add(buttons);
  }
}