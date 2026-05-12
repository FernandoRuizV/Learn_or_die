import { Escena_base } from "./Escena_base.js";

export class Nivel1 extends Escena_base {
  constructor() {
    super("Nivel1", {
      dialogue: [
        "¡Bienvenido, principiante!", 
        "Estoy aquí para guiarte en tu viaje.", 
        "Haz clic para continuar..."
      ]
    });
  }
  create() {
    
    this.fondo = this.add.tileSprite(0, 0, 4000, 1080, 'fondo');
    this.fondo.setOrigin(0, 0);
    this.fondo.tileScaleX = 1.2; 
    this.fondo.tileScaleY = 1;
    super.create(); 
    this.zombie.body.enable = false;
    this.pocion = this.physics.add.image(1000, 450, 'pocion1').setScale(0.1);
    this.pocion.body.enable = false;
    this.expo = this.add.image(1000, 450, 'explosion1').setScale(0.1);
    this.pocion.setVisible(false);
    this.expo.setVisible(false);
    this.dialogue.border.setVisible(true);
    this.dialogue.avatar.setVisible(true);
    this.actualizarBarra();
    this.actualizarBarraEnemigo();
    this.physics.add.collider(this.player, this.zombie);
    this.combateActivo = true;
    
    const { width, height } = this.sys.canvas;
    const btnWidth = 230;
    const btnHeight = 70;
    const realWidth = btnWidth
    const realHeight = btnHeight
    const posX = width - realWidth - 180; 
    const posY = height - realHeight - 40; 
    this.dialogue.moverBoton(posX, posY, realWidth, realHeight);
    
    this.zombie.setImmovable(true);
    this.movimientoBloqueado = false;
    this.flechas_izq = this.add.sprite(this.player.x - 100, this.player.y , 'flechas').setScale(0.25).setVisible(false);
    this.flechas_der = this.add.sprite(this.player.x + 100, this.player.y , 'flechas').setScale(0.25).setVisible(false);
    this.flechas_izq.setPosition(this.player.x-100, this.player.y).setVisible(true);
    this.flechas_izq.play('flechas_izq');
    this.flechas_der.setPosition(this.player.x+100, this.player.y).setVisible(true);
    this.flechas_der.play('flechas_der');
    this.time.delayedCall(5000, () => this.secuenciaAyuda());

}
  secuenciaAyuda() {
    this.dialogue.start(
      ["Recuerda que estoy aquí para ayudarte cuando lo necesites",
        "Por ahora sólo ten cuidado y revisa cuidadosamente tu entorno",
        "Se acercan nuevos peligros..."
      ],
      () => {
        this.time.delayedCall(3500, () => this.secuenciaPocion());
      },
      true);
  }

  secuenciaPocion() {
    this.pocion.setVisible(true);

    this.dialogue.start(
      ["¡Mira, hay una poción en el camino!",
        "Recogela, es una poción curativa que te será de gran ayuda más adelante",
        "Dale click para agregarla a tu inventario..."
      ],
      () => { 
        this.pocion.body.enable = true;
        this.overlapPocion =this.physics.add.collider(
          this.player, 
          this.pocion, 
          this.recogerPocion, 
          null, 
          this
        );
        this.pocion.setInteractive();
      },
      true);
      this.pocion.on('pointerdown', () => {
        this.recogerPocion(this.player, this.pocion, 'Poción Curativa');
    });
  }

  secuenciaEnemigo() {
    this.zombie.body.enable = true;
    this.zombie.setPosition(this.player.x + 200, this.player.y);
    this.zombie.setVisible(true);
    this.actualizarBarraEnemigo();
    this.dialogue.start(
      ["¡Cuidado, un enemigo ha aparecido!",
        "Tendrás que luchar contra él para protegerte...",
        "Descuida, te enseñaré como hacerlo"
      ],
      () => {
        this.time.delayedCall(2000, () => this.secuenciaCombate());
      },
      true);
  }

  secuenciaCombate() {
    this.dialogue.start(
      ["Para defenderte, tendrás que responder correctamente a las preguntas",
        "Es la unica forma de derrotar a este enemigo, así que hazlo lo mejor que puedas",
        "Descuida, no es tan difícil como parece."
      ],
      () => { },
      true);

    this.questions.ask('Nivel_1', (esCorrecto) => {
      if (esCorrecto === null) return;
      this.procesarResultadoCombate(esCorrecto, this.zombie);
      this.actualizarBarra();
      this.actualizarBarraEnemigo();
      if (this.questions.preguntas.length === this.questions.indiceActual || this.zombie.vida <= 0 || this.player.vida <= 0) {
        this.estadisticas();
        if(this.zombie.vida===0){this.player.nivel=2;}
      }
    });
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
    if(this.inputManager.right){
      this.flechas_der.destroy();
    }
    if(this.inputManager.left){
      this.flechas_izq.destroy();
    }
  }
}