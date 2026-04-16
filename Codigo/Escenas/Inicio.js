import { Escena_base } from "./Escena_base.js";

export class Inicio extends Escena_base {
  constructor() {
    super("Inicio", {
      dialogue: []
    });
  }
preload() {
  super.preload();
  this.load.image('Inicio', 'Assets/Inicio_presentacion.jpeg');
  this.load.image('menu', 'Assets/Menu.png');
}
create() {
    super.create();
    this.dialogue.border.setVisible(false);
    this.player.setVisible(false);
    this.zombie.setVisible(false);

    this.movimientoBloqueado = false;
    const { width, height } = this.sys.canvas;
    this.fondo = this.add.image(width / 2, height / 2, 'Inicio');
    const escalaX = width / 1920;
    const escalaY = height / 1080;
    const escalaFinal = Math.max(escalaX, escalaY);

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
        this.scene.start('Intro');
      }
    ,false);
}
}