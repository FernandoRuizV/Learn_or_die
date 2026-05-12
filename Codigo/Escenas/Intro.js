import { Escena_base } from "./Escena_base.js";

export class Intro extends Escena_base {
  constructor() {
    super("Intro", {
      dialogue: []
    });
  }
preload() {
  super.preload();
  this.load.video('videoFondo', 'Assets/Video_intro.mp4');
  this.load.image('menu', 'Assets/Menu.png');
}
create() {
    super.create();
    this.player.setVisible(false);
    this.zombie.setVisible(false);

    this.movimientoBloqueado = false;
    const { width, height } = this.sys.canvas;
    this.fondoVideo = this.add.video(width / 2, height / 2, 'videoFondo');
    const escalaX = width / 1920;
    const escalaY = height / 1080;
    const escalaFinal = Math.max(escalaX, escalaY);

    this.fondoVideo.setScale(escalaFinal);
    this.fondoVideo.play(true);
    this.fondoVideo.setMute(false); 
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
    this.dialogue.reset();

    this.dialogue.start(
      [""], 
      () => {
        this.scene.start('Niveles');
      }
    ,false);
}
}