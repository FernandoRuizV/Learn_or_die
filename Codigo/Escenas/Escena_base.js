import { InputManager } from "../Dialogo/InputManager.js";
import { DialogueManager } from "../Dialogo/DialogueManager.js";
import { QuestionManager } from "../Dialogo/QuestionManager.js";
import { Enemigo, Personaje } from "../clases.js";

export class Escena_base extends Phaser.Scene {
  constructor(key, levelData) {
    super(key);
    this.levelData = levelData;
  }

  preload() {
    this.load.image('fondo', 'Assets/Fondo_nivel1.png');
    this.load.image('avatar', 'Assets/Mago_res.png');
    this.load.image('pocion1', 'Assets/pocion1.png');
    this.load.image('explosion1', 'Assets/explosion1.png');
    this.load.image('zombie_inicio', 'Assets/zombie_inicio.png'); 
    this.load.image('personaje_inicio', 'Assets/Personaje_inicio.png'); 
    this.load.spritesheet('personaje_iz', 'Assets/principal_izquierda.png', { 
      frameWidth: 360, 
      frameHeight: 704
    }); 
    this.load.spritesheet('personaje_de', 'Assets/principal_derecha2.png', { 
      frameWidth: 343, 
      frameHeight: 704
    }); 
    this.load.spritesheet('personaje_atacar', 'Assets/personaje_atacar.png', { 
      frameWidth: 470, 
      frameHeight: 704
    }); 
    this.load.spritesheet('zombie_atacar', 'Assets/zombie_izq.png', { 
      frameWidth: 130, 
      frameHeight: 704
    }); 
  }

  create() {
    this.inputManager = new InputManager(this);
    this.player = new Personaje(this, 400, 400, 1, 100);
    this.player.setTexture('personaje_inicio');
    this.dialogue = new DialogueManager(this);
    this.questions = new QuestionManager(this);
    this.zombie = new Enemigo(this, 1000, 450, 'Zombie', 50, 10, 'zombie_inicio');
    this.zombie.setTexture('zombie_inicio');
    this.zombie.setVisible(false);
    const anchoPantalla = this.scale.width;
    const altoPantalla = this.scale.height;
    this.physics.world.setBounds(0, 0, anchoPantalla, altoPantalla);
    this.cameras.main.setBounds(0, 0, anchoPantalla, altoPantalla);
    this.cameras.main.startFollow(this.player);

    this.movimientoBloqueado = false;

    if (this.levelData.dialogue) {
      this.movimientoBloqueado = true;
      this.dialogue.start(this.levelData.dialogue, () => {
        this.movimientoBloqueado = false;
      });
    }
    this.anims.create({
      key: 'caminar_izq',
      frames: this.anims.generateFrameNumbers('personaje_iz', { frames:[0,2,0] }), 
      frameRate: 8, 
      repeat: -1 
    });

    this.anims.create({
      key: 'caminar_der',
      frames: this.anims.generateFrameNumbers('personaje_de', { frames: [0,2,0]}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'heroe_ataca',
      frames: this.anims.generateFrameNumbers('personaje_atacar', { frames: [0,1,2,0]}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'zombie_ataca',
      frames: this.anims.generateFrameNumbers('zombie_atacar', { frames: [0,1,2,0]}),
      frameRate: 8,
      repeat: -1
    });
  }


  procesarResultadoCombate(esCorrecto,enemigo) {
    if (esCorrecto) {
        this.player.atacar(enemigo);
        console.log("Respuesta correcta: Jugador ataca.");
        this.dialogue.start(["¡Respuesta correcta! Has golpeado al enemigo."]);
    } else {
        this.zombie.atacar(this.player);
        console.log("Respuesta incorrecta: Zombie ataca.");
        
        this.dialogue.start(["¡Error! El enemigo aprovechó para atacarte."]);
    }
    this.movimientoBloqueado = false;
}

  update() {
    this.inputManager.update();
    this.player.actualizarMovimiento(this.inputManager, this.movimientoBloqueado);
  }
}
