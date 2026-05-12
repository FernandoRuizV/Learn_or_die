import { Escena_base } from "./Escena_base.js";

export class Especial extends Escena_base {
  constructor() {
    super("Especial", {
      dialogue: []
    });
  }
preload() {
  super.preload();
  this.load.image('Especial', 'Assets/especial_fondo.png');
  this.load.image('menu', 'Assets/Menu.png');
  this.load.spritesheet('personaje_arr', 'Assets/personaje_camina.png', { 
      frameWidth: 166, 
      frameHeight: 375
  });
  this.load.spritesheet('personaje_aba', 'Assets/personaje_camina.png', { 
      frameWidth: 166, 
      frameHeight: 375
  });
}
create() {
    const { width, height } = this.sys.canvas;
    this.fondo = this.add.image(width / 2, height / 2, 'Especial');
    const escalaX = width / this.fondo.width;
    const escalaY = height / this.fondo.height;
    const escalaFinal = Math.max(escalaX, escalaY);

    this.fondo.setScale(escalaFinal);
    super.create();
    this.dialogue.reset();
    this.player.setVisible(true);
    this.zombie.setVisible(false);
    this.menu.setPosition(width - 60, 60).setDepth(200);
    this.movimientoBloqueado = false;
    this.especial = true;

    if (!this.anims.exists('caminar_arr')) {
      this.anims.create({ 
        key: 'caminar_arr',
        frames: this.anims.generateFrameNumbers('personaje_arr', { frames:[0,1] }), 
        frameRate: 5, 
        repeat: -1
      });
    }
    if (!this.anims.exists('caminar_aba')) {
      this.anims.create({ 
        key: 'caminar_aba',
        frames: this.anims.generateFrameNumbers('personaje_aba', { frames:[2,3] }), 
        frameRate: 5, 
        repeat: -1
      });
    }

  
  }
  update() {
    super.update();
    const seMueve = Math.abs(this.player.body.velocity.x) > 0.3
    if(this.dialogue.mostrando && !this.esperando && seMueve){
      this.dialogue.next();
      this.esperando = true;
      this.time.delayedCall(1000, () => {
        this.esperando = false;
      });
    }
  }
}