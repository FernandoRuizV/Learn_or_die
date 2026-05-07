import { Escena_base } from "./Escena_base.js";
import { FlashcardManager } from "../Flashcards/Flashcards.js"; // Agregamos esta línea para importar FlashcardManager

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
    this.flashcards = new FlashcardManager(this); // Creamos una instancia de FlashcardManager
    this.flashcardsAbiertas = false; // Variable para controlar el estado de las flashcards (abierto o cerrado)
    this.dialogue.border.setVisible(true);
    this.dialogue.avatar.setVisible(true);

    // Botón para mostrar flashcards
    const btnFlashcards = this.add.text(50, 50, "💡", {
      fontSize: "28px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: {
        x: 15,
        y: 10
      }
    })
    .setInteractive()
    .setScrollFactor(0)
    .setDepth(999);

    btnFlashcards.on("pointerdown", () => {

      // Si estan abiertas -> cerrarlas
      if (this.flashcardsAbiertas) {

        this.flashcards.cerrar();

        this.flashcardsAbiertas = false;

        this.movimientoBloqueado = false;

        return;
      }

      // ABRIR FLASHCARDS
      this.movimientoBloqueado = true;

      this.flashcardsAbiertas = true;

      this.flashcards.mostrar("flashcards");

    });

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

    this.time.delayedCall(10000, () => { 
      this.movimientoBloqueado = true;       
      this.dialogue.start(
          ["Recuerda que estoy aquí para ayudarte cuando lo necesites",
            "Por ahora sólo ten cuidado y revisa cuidadosamente tu entorno",
            "Se acercan nuevos peligros..."
          ], 
          () => { this.movimientoBloqueado = false; }
        ,true);
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
        ,true);
      this.pocion.on('pointerdown', () => {
        this.player.agregarpocion('pocion1');
        this.pocion.destroy();
        this.expo.setVisible(true);
        this.time.delayedCall(1000, () => {
          this.expo.setVisible(false);
        });
        this.movimientoBloqueado = true;
        this.dialogue.start(
          ["¡Felicidades, la poción ya ha sido agregada a tu inventario!",
            "Continua explorando, hay más secretos por descubrir...",
          ], 
          () => { this.movimientoBloqueado = false; }
        ,true);
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
      ,true);
    });

    this.time.delayedCall(40000, () => {
      this.movimientoBloqueado = true;
      this.dialogue.start(
          ["Para defenderte, tendrás que responder correctamente a las preguntas",
            "Es la unica forma de derrotar a este enemigo, así que hazlo lo mejor que puedas",
            "Descuida, no es tan difícil como parece."
          ], 
          () => { this.movimientoBloqueado = false; }
      ,true);
    this.questions.ask('Nivel_1', (esCorrecto) => {
        if (esCorrecto === null) return; 
          this.procesarResultadoCombate(esCorrecto, this.zombie); 
          if(this.zombie.vida <= 0 || this.player.vida <= 0){
            this.estadisticas();
          }
        });
    });

  }
  

  update() {
    super.update();
  }
}