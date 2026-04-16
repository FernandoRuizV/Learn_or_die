import { Escena_base } from "./Escena_base.js";

export class Niveles extends Escena_base {
  constructor() {
    super("Niveles", {
      dialogue: []
    });
  }
preload() {
  super.preload();
  this.load.image('mapa', 'Assets/mapa_fondo.png');
  this.load.image('menu', 'Assets/Menu.png');
}
create() {
    super.create();
    this.dialogue.border.setVisible(false);
    this.player.setVisible(false);
    this.zombie.setVisible(false);

    this.movimientoBloqueado = false;
    const { width, height } = this.sys.canvas;
    this.fondo = this.add.image(width / 2, height / 2, 'mapa');
    const escalaX = width / 2612;
    const escalaY = height / 1632;
    const escalaFinal = Math.min(escalaX, escalaY);

    this.fondo.setScale(escalaFinal);
    this.menu.setPosition(width - 60, 60).setDepth(200);

    const btnWidth = 250;
    const btnHeight = 80;
    const margin = 40;
    const posX = width - btnWidth - margin;
    const posY = height - btnHeight - margin;
    this.dialogue.textBox
        .setFixedSize(btnWidth, btnHeight)
        .setPosition(posX, posY)
        .setPadding(0) 
        .setAlign('center')
        .setStyle({
            fixedWidth: btnWidth,
            fixedHeight: btnHeight,
            halign: 'center',
            valign: 'middle'
        });
    this.dialogue.border.destroy();
    this.dialogue.avatar.destroy();
    this.dialogue.moverBoton(posX, posY, btnWidth, btnHeight);
    

    this.dialogue.start(
      [""], 
      () => {
        this.scene.start('Nivel1');
      }
    ,false);
}
}