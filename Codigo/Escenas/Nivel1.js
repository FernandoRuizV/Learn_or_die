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
    this.pocion = this.add.image(1000, 450, 'pocion1').setScale(0.1);
    this.expo = this.add.image(1000, 450, 'explosion1').setScale(0.1);
    this.pocion.setVisible(false);
    this.expo.setVisible(false);
    this.fondo.setOrigin(0, 0);
    this.fondo.tileScaleX = 1.2; 
    this.fondo.tileScaleY = 1;
    super.create(); 
    this.physics.add.collider(this.player, this.zombie);
    this.zombie.setImmovable(true);

    this.time.delayedCall(10000, () => { 
      this.movimientoBloqueado = true;       
      this.dialogue.start(
          ["Recuerda que estoy aquí para ayudarte cuando lo necesites",
            "Por ahora sólo ten cuidado y revisa cuidadosamente tu entorno",
            "Se acercan nuevos peligros..."
          ], 
          () => { this.movimientoBloqueado = false; }
        );
    });

    this.time.delayedCall(20000, () => {
      this.pocion.setVisible(true);
      this.pocion.setInteractive();
      this.movimientoBloqueado = true;
      this.dialogue.start(
          ["¡Mira, hay una poción en el camino!",
            "Recogela, es una poción curativa que te será de gran ayuda más adelante",
            "Dale click para agregarla a tu inventario..."
          ], 
          () => { this.movimientoBloqueado = false; }
        );
      this.pocion.on('pointerdown', () => {
        this.player.agregarpocion('pocion1');
        this.pocion.destroy();
        this.expo.setVisible(true);
        this.time.delayedCall(500, () => {
          this.expo.setVisible(false);
        });
        this.movimientoBloqueado = true;
        this.dialogue.start(
          ["¡Felicidades, la poción ya ha sido agregada a tu inventario!",
            "Continua explorando, hay más secretos por descubrir...",
          ], 
          () => { this.movimientoBloqueado = false; }
        );
      });
    })

    this.time.delayedCall(35000, () => {
      this.zombie.setPosition(this.player.x + 200, this.player.y);
      this.zombie.setVisible(true);
      this.movimientoBloqueado = true;
      this.dialogue.start(
          ["¡Cuidado, un enemigo ha aparecido!",
            "Tendrás que luchar contra él para protegerte...",
            "Descuida, te enseñaré como hacerlo"
          ], 
          () => { this.movimientoBloqueado = false; }
        );
      this.questions.ask("¿Qué es reciclar?",["Convertir materiales usados en cosas nuevas","Tirar la basura al suelo"],0,
        (resultado) => { 
          this.procesarResultadoCombate(resultado, this.zombie);
        });

    });
  }

  update() {
    super.update();
  }
}