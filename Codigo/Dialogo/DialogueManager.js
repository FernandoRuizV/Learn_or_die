export class DialogueManager {
  constructor(scene) {
    this.scene = scene;
    
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
      padding: { left: 200, right: 25, top: 20, bottom: 20 }, 
      wordWrap: { width: width - 180 },
      stroke: "#000000",
      strokeThickness: 6,      
    })
    .setFixedSize(width, height)
    .setScrollFactor(0)    
    .setDepth(100)    
    .setVisible(false);

    this.avatar = scene.add.image(x+30, y + 10, 'avatar')
      .setOrigin(0, 0)
      .setDisplaySize(130, 130)
      .setScrollFactor(0)
      .setDepth(101) 
      .setVisible(false);

    this.border = scene.add.graphics();
    this.border.lineStyle(6, 0x000000, 1);
    this.border.strokeRect(x, y, width, height);
    this.border.setScrollFactor(0).setDepth(102).setVisible(false);
  }

  start(dialogues, onComplete) {
    let index = 0;
    this.textBox.setVisible(true);
    this.avatar.setVisible(true);
    this.border.setVisible(true); 
    
    this.textBox.setText(dialogues[index]);

    const handlePointer = () => {
      index++;
      if (index < dialogues.length) {
        this.textBox.setText(dialogues[index]);
        this.scene.input.once("pointerdown", handlePointer);
      } else {
        this.textBox.setVisible(false);
        this.avatar.setVisible(false);
        this.border.setVisible(false);
        if (onComplete) onComplete();
      }
    };

    this.scene.input.once("pointerdown", handlePointer);
  }
}