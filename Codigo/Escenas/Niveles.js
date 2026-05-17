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
  this.load.image('nivel1', 'Assets/num_1.png');
  this.load.image('nivel2', 'Assets/num_2.png');
  this.load.image('nivel3', 'Assets/num_3.png');
  this.load.image('nivel4', 'Assets/num_4.png');
  this.load.image('nivel_especial', 'Assets/num_especial.png');
  
}
create() {
    super.create();
    this.dialogue.reset();
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

    this.nivel1 = this.add.image(390, 150, 'nivel1').setScale(0.037).setInteractive();
    this.nivel2 = this.add.image(620, 300, 'nivel2').setScale(0.037).setInteractive();
    this.nivel3 = this.add.image(895, 430, 'nivel3').setScale(0.037).setInteractive();
    this.nivel4 = this.add.image(1160, 560, 'nivel4').setScale(0.07).setInteractive();
    this.nivel_especial = this.add.image(1160, 150, 'nivel_especial').setScale(0.05).setInteractive();

    this.boton_nivel(this.nivel1);
    this.boton_nivel(this.nivel2);
    this.boton_nivel(this.nivel3);
    this.boton_nivel(this.nivel4);
    this.boton_nivel(this.nivel_especial);

    this.iniciarNavegacionJoystick([
      this.menu,
      this.nivel1,
      this.nivel2,
      this.nivel3,
      this.nivel4,
      this.nivel_especial,
      this.sonido_icono,
      this.boton_menos,
      this.boton_mas,
      this.musica_icono,
      this.boton_home,
      this.boton_niveles,
      this.boton_pausa
   ]);

}

  boton_nivel(boton){
    const tamañoOriginal = boton.scaleX;
    const tamañoNuevo = tamañoOriginal * 1.25;
    boton.on('pointerover', () => {
      boton.setTint(0xefb810);
      boton.setScale(tamañoNuevo);
    });
    boton.on('pointerout', () => {
      boton.clearTint();
      boton.setScale(tamañoOriginal);            
    });
    boton.on('pointerdown', () => {
      if (boton === this.nivel1) {
        this.scene.start('Nivel1');
      }
      if (boton === this.nivel2 && this.player.nivel >= 2) {
        this.scene.start('Nivel2');
      }
      if (boton === this.nivel3 && this.player.nivel >= 3) {
        this.scene.start('Nivel3');
      }
      if (boton === this.nivel4 && this.player.nivel >= 4) {
        this.scene.start('Nivel4');
      }
      if (boton === this.nivel_especial) {
        this.scene.start('Especial');
      }
    });
  }
}