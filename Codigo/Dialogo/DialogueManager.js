export class DialogueManager {
  constructor(scene) {
    this.scene = scene;
    this.mostrando = false; 
    const camWidth = scene.cameras.main.width;
    const camHeight = scene.cameras.main.height;
    const x = camWidth * 0.1;
    const y = camHeight - 180;
    const width = camWidth * 0.8;
    const height = 150;

    this.textBox = scene.add.text(x, y, "", {
      fontSize: "32px",               
      fontFamily: "Arial, sans-serif", 
      fill: "#ffffff",               
      backgroundColor: "rgba(0, 0, 0, 0.7)", 
      padding: { left: 160, right: 150, top: 20, bottom: 20 }, 
      wordWrap: { width: width - 300 },
      stroke: "#000000",
      strokeThickness: 6,      
    })
    .setFixedSize(width, height)
    .setScrollFactor(0)    
    .setDepth(100)    
    .setVisible(false);

    this.nextButton = scene.add.text(x + width - 90, y + height - 65, "CONTINUAR", {
      align: "center",
      fontSize: "28px",
      fontFamily: "Times New Roman, serif",
      fill: "#ffffff",
      padding: { x: 10, y: 25 }
    })
    .setScrollFactor(0)
    .setDepth(1100)
    .setInteractive({ useHandCursor: true })
    .setVisible(false);
    this.nextButton.setDepth(2000);
    this.avatar = scene.add.image(x + 30, y + 10, 'avatar')
      .setOrigin(0, 0)
      .setDisplaySize(130, 130)
      .setScrollFactor(0)
      .setDepth(101) 
      .setVisible(false);

    this.border = scene.add.graphics();
    this.border.lineStyle(6, 0x000000, 1);
    this.border.strokeRect(x, y, width, height);
    this.border.setScrollFactor(0).setDepth(102).setVisible(false); 


    const bx = x + width - 90;
    const by = y + height - 65;
    const btnWidth = 250;
    const btnHeight = 80;

    this.botonBorde = scene.add.graphics();
    this.botonBorde.lineStyle(6, 0xffffff, 1);
    this.botonBorde.strokeRect(bx, by, btnWidth, btnHeight);
    this.botonBorde.setScrollFactor(0).setDepth(1099).setVisible(false);
    this.nextButton.on('pointerover', () => {
      this.nextButton.setStyle({ backgroundColor: '#4a2e00', color: '#eeb710' });
      this.dibujarBorde(0xeeb710);
    });

    this.nextButton.on('pointerout', () => {
      this.nextButton.setStyle({ backgroundColor: '#000000', color: '#ffffff' });
      this.dibujarBorde(0xffffff);
      this.nextButton.borderColor = '#ffffff';
    });
   
  }

  start(dialogues, onComplete, showFull) {
    let index = 0;
    if(this.mostrando){
      return;
    }
    this.mostrando = true;
    this.botonBorde.setVisible(true);
    this.textBox.setVisible(true);
    this.avatar.setVisible(showFull);
    this.border.setVisible(showFull);
    this.nextButton.setVisible(true);
    
    this.textBox.setText(dialogues[index]);
    this.nextButton.off('pointerdown');

    this.nextButton.on('pointerdown', (pointer, localX, localY, event) => {
      if (this.scene.panel && this.scene.panel.visible) return;
      if (event) event.stopPropagation();

      index++;
      if (index < dialogues.length) {
        this.textBox.setText(dialogues[index]);
      } else {
        this.hide();
        if (onComplete) onComplete();
      }
    });
  }

  hide() {
    this.mostrando = false;
    this.textBox.setVisible(false);
    this.avatar.setVisible(false);
    this.border.setVisible(false);
    this.nextButton.setVisible(false);
    this.botonBorde.setVisible(false); 
  }

  reset(){
    this.mostrando = false;
    this.hide();
  }

  moverBoton(px, py, bw, bh) {
    this.nextButton.setPosition(px, py).setFixedSize(bw, bh);
        this._bx = px; 
    this._by = py; 
    this._bw = bw; 
    this._bh = bh;
    this.dibujarBorde(0xffffff);
  }
  dibujarBorde(color) {
    this.botonBorde.clear();
    this.botonBorde.lineStyle(6, color, 1);
    this.botonBorde.strokeRect(this._bx, this._by, this._bw, this._bh);
  }
}