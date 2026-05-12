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
    this.load.image('ataque', 'Assets/Rayo_magico1.png');
    this.load.image('menu', 'Assets/Menu.png');
    this.load.image('panel', 'Assets/panel.png');
    this.load.image('rectangulo', 'Assets/rectangulo.png');
    this.load.image('musica_on', 'Assets/musica_on.png');
    this.load.image('musica_off', 'Assets/musica_off.png');
    this.load.image('sonido_on', 'Assets/sonido_on.png');
    this.load.image('sonido_off', 'Assets/sonido_off.png');
    this.load.image('boton_menos', 'Assets/boton_menos.png');
    this.load.image('boton_mas', 'Assets/boton_mas.png');
    this.load.image('boton_pausa', 'Assets/pausa.png');
    this.load.image('reanudar', 'Assets/play.png');
    this.load.image('home', 'Assets/boton_home.png');
    this.load.image('niveles', 'Assets/boton_niveles.png');
    this.load.image('corazon_lleno', 'Assets/corazon_lleno.png');
    this.load.image('corazon25', 'Assets/corazon25.png');
    this.load.image('corazon50', 'Assets/corazon50.png');
    this.load.image('corazon85', 'Assets/corazon85.png');
    this.load.image('corazon_vacio', 'Assets/corazon_vacio.png');
    this.load.image('estrella', 'Assets/estrella.png');
    this.load.image('flecha_sig', 'Assets/flecha_sig.png');
    this.load.audio('musica_fondo', 'Sonido/sonido_fondo.mp3');
    this.load.json('Nivel_1', 'Preguntas/Nivel_1.json');

    this.load.spritesheet('personaje_iz', 'Assets/principal_izquierda.png', { 
      frameWidth: 360, 
      frameHeight: 704
    }); 
    this.load.spritesheet('personaje_de', 'Assets/principal_derecha2.png', { 
      frameWidth: 343, 
      frameHeight: 704
    }); 
    this.load.spritesheet('personaje_ata', 'Assets/Personaje_ataca.png', { 
      frameWidth: 410, 
      frameHeight: 479
    }); 
    this.load.spritesheet('zombie_ata', 'Assets/zombie_ataca.png', { 
      frameWidth: 141, 
      frameHeight: 259
    }); 
    this.load.spritesheet('zombie_mue', 'Assets/zombie_muere.png', { 
      frameWidth: 512, 
      frameHeight: 400
    }); 
    this.load.spritesheet('heroe_mue', 'Assets/personaje_muerto.png', { 
      frameWidth: 410, 
      frameHeight: 476
    });
    this.load.spritesheet('flechas', 'Assets/flechas_intermi.png', { 
      frameWidth: 300, 
      frameHeight: 203
    });
  }


  create() {
    this.inputManager = new InputManager(this);
    this.player = new Personaje(this, 400, 400, 1, 100);
    this.player.setTexture('personaje_inicio');
    this.dialogue = new DialogueManager(this);
    this.questions = new QuestionManager(this);
    this.zombie = new Enemigo(this, 1500, 450, 'Zombie', 50, 10, 'zombie_inicio');
    this.zombie.setTexture('zombie_inicio');
    this.zombie.setVisible(false);
    this.rayo = this.add.image(0, 0, 'ataque').setScale(0.1).setVisible(false);
    const anchoPantalla = this.scale.width;
    const altoPantalla = this.scale.height;
    const { width, height } = this.sys.canvas;
    this.menu = this.add.image(anchoPantalla-60, 60, 'menu').setVisible(true).setScale(0.4);
    this.panel = this.add.image(anchoPantalla-300, 300, 'panel').setVisible(false).setScale(0.8).setDepth(200);
    this.sonido_icono = this.add.image(anchoPantalla-380, 150, 'sonido_on').setVisible(false).setScale(0.3).setDepth(201);
    this.musica_icono = this.add.image(anchoPantalla-300, 250, 'musica_on').setVisible(false).setScale(0.3).setDepth(201);
    this.boton_menos = this.add.image(anchoPantalla-290, 150, 'boton_menos').setVisible(false).setScale(0.05).setDepth(201);
    this.boton_mas = this.add.image(anchoPantalla-220, 150, 'boton_mas').setVisible(false).setScale(0.05).setDepth(201);
    this.boton_pausa = this.add.image(anchoPantalla-300, 440, 'reanudar').setVisible(false).setScale(0.3).setDepth(201);
    this.boton_home = this.add.image(anchoPantalla-360, 350, 'home').setVisible(false).setScale(0.037).setDepth(201);
    this.boton_niveles = this.add.image(anchoPantalla-240, 350, 'niveles').setVisible(false).setScale(0.037).setDepth(201);
    this.boton_niveles2 = this.add.image(anchoPantalla-240, 350, 'niveles').setVisible(false).setScale(0.05);
    this.corazon_lleno = this.add.image(50, 50, 'corazon_lleno').setScale(0.35).setVisible(false);
    this.corazon_vacio = this.add.image(50, 50, 'corazon_vacio').setScale(0.15).setVisible(false);
    this.corazon25 = this.add.image(50, 50, 'corazon25').setScale(0.35).setVisible(false);
    this.corazon50 = this.add.image(50, 50, 'corazon50').setScale(0.35).setVisible(false);
    this.corazon85 = this.add.image(50, 50, 'corazon85').setScale(0.15).setVisible(false); 
    this.flecha = this.add.image(0, 0, 'flecha_sig').setScale(0.037).setVisible(false);
    this.Botonlogica(this.boton_menos);
    this.Botonlogica(this.boton_mas);
    this.Botonlogica(this.menu);
    this.Botonlogica(this.sonido_icono);
    this.Botonlogica(this.musica_icono);
    this.Botonlogica(this.boton_pausa);
    this.Botonlogica(this.boton_home);
    this.Botonlogica(this.boton_niveles);
    this.Botonlogica(this.boton_niveles2);
    this.Botonlogica(this.flecha);
    this.vida = this.add.image(100, 50, 'corazon_lleno').setScale(0.35).setVisible(false);
    this.vidaActual = 100;
    this.vidaMaxima = 100;
    this.barraSalud = this.add.graphics().setVisible(false);
    this.xBarra = 130;
    this.yBarra = 35;
    this.anchoBarra = 200;
    this.altoBarra = 20;
    this.vidaMaximaEnemigo = 50;
    this.barraSaludEnemigo = this.add.graphics().setVisible(false);
    this.anchoBarraEnemigo = 100;
    this.altoBarraEnemigo = 10;
    this.especial = false;

    this.estrellas = [];
    const espacioEntreEstrellas = 80; 

    for (let i = 0; i < 3; i++) {
        let x = (i - 1) * espacioEntreEstrellas; 
        
        let estrella = this.add.image(x, -50, 'estrella').setVisible(false).setScale(0.25);
        this.estrellas.push(estrella);
    }

    let fondo = this.add.image(0, 0, 'rectangulo').setScale(1.5)
    
    this.textoVictoria = this.add.text(0, -180, '', {
        fontFamily: '"Press Start 2P"',
        fontSize: '70px',
        fill: '#ffffff',
        align: 'center',  
        linespacing: 10
    }).setOrigin(0.5);

    this.textoEstadisticas = this.add.text(0, -20, '', {
        fontFamily: '"Press Start 2P"',
        fontSize: '20px',
        fill: '#ffffff',
        align: 'left'
    }).setOrigin(0.5);
    this.textoPuntuacion = this.add.text(0, 210, '', {
        fontFamily: '"Press Start 2P"',
        fontSize: '22px',
        fill: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);

    this.uiContenedor = this.add.container((width/2)+10, height/2, [ fondo, this.corazon_lleno, this.corazon_vacio, this.corazon25, this.corazon50, this.corazon85, ...this.estrellas, this.textoVictoria,this.textoEstadisticas, this.textoPuntuacion, this.flecha, this.boton_niveles2 ]);
    this.uiContenedor.setVisible(false);

    
    this.texto_sonido = this.add.text(anchoPantalla-410, 190, 'Sonido', {
     fontSize: '20px', fill: '#000000', fontFamily: 'Times New Roman, serif'
    }).setVisible(false).setDepth(201);

    this.texto_musica = this.add.text(anchoPantalla-330, 290, 'Música', {
     fontSize: '20px', fill: '#000000', fontFamily: 'Times New Roman, serif'
    }).setVisible(false).setDepth(201);

    this.texto_pausa = this.add.text(anchoPantalla-320, 470, 'Pausa', {
     fontSize: '20px', fill: '#000000', fontFamily: 'Times New Roman, serif'
    }).setVisible(false).setDepth(201);

    this.texto_home = this.add.text(anchoPantalla-380, 380, 'Inicio', {
     fontSize: '20px', fill: '#000000', fontFamily: 'Times New Roman, serif'
    }).setVisible(false).setDepth(201);

    this.texto_niveles = this.add.text(anchoPantalla-270, 380, 'Niveles', {
     fontSize: '20px', fill: '#000000', fontFamily: 'Times New Roman, serif'
    }).setVisible(false).setDepth(201);

    if (!this.sound.get('musica_fondo')) {
        this.musica_fondo = this.sound.add('musica_fondo', { loop: true });
    } else {
        this.musica_fondo = this.sound.get('musica_fondo');
    }
    this.musica_fondo.play();

    this.physics.world.setBounds(200, 0, anchoPantalla - 400, altoPantalla);
    this.cameras.main.setBounds(0, 0, anchoPantalla, altoPantalla);
    this.cameras.main.startFollow(this.player);


    this.movimientoBloqueado = false;

    if (this.levelData.dialogue) {
      this.movimientoBloqueado = true; 
      this.dialogue.start(this.levelData.dialogue, () => {
        this.movimientoBloqueado = false;
      });
    }
  
    if (!this.anims.exists('caminar_izq')) {
    this.anims.create({
      key: 'caminar_izq',
      frames: this.anims.generateFrameNumbers('personaje_iz', { frames:[0,2,0] }), 
      frameRate: 8, 
      repeat: -1 
    });
}

    if (!this.anims.exists('caminar_der')) {
      this.anims.create({
        key: 'caminar_der',
        frames: this.anims.generateFrameNumbers('personaje_de', { frames:[0,2,0] }), 
        frameRate: 8, 
        repeat: -1 
      });
    }
    if (!this.anims.exists('personaje_ataca')) {
      this.anims.create({
        key: 'personaje_ataca',
        frames: this.anims.generateFrameNumbers('personaje_ata', { frames:[0,1,2] }), 
        frameRate: 4, 
        repeat: 0
      });
    }
    if (!this.anims.exists('zombie_ataca')) {
      this.anims.create({
        key: 'zombie_ataca',
        frames: this.anims.generateFrameNumbers('zombie_ata', { frames:[0,1,2] }), 
        frameRate: 5, 
        repeat: 0
      });
    }
    if (!this.anims.exists('zombie_muere')) {
      this.anims.create({ 
        key: 'zombie_muere',
        frames: this.anims.generateFrameNumbers('zombie_mue', { frames:[1,2,3] }), 
        frameRate: 5, 
        repeat: 0
      });
    }
    if (!this.anims.exists('heroe_muere')) {
      this.anims.create({ 
        key: 'heroe_muere',
        frames: this.anims.generateFrameNumbers('heroe_mue', { frames:[1,2,3] }), 
        frameRate: 5, 
        repeat: 0
      });
    }
    if (!this.anims.exists('flechas_izq')) {
      this.anims.create({ 
        key: 'flechas_izq',
        frames: this.anims.generateFrameNumbers('flechas', { frames:[0,2] }), 
        frameRate: 5, 
        repeat: -1
      });
    }
    if (!this.anims.exists('flechas_der')) {
      this.anims.create({ 
        key: 'flechas_der',
        frames: this.anims.generateFrameNumbers('flechas', { frames:[1,3] }), 
        frameRate: 5, 
        repeat: -1
      });
    }
  }


  procesarResultadoCombate(esCorrecto, enemigo) {
    this.dialogue.reset();
    if (esCorrecto) {
        this.player.esta_atacando = true;
        this.player.setScale(0.55);
        this.player.once('animationcomplete-personaje_ataca', () => {
            this.player.esta_atacando = false;
            this.player.setScale(0.4);
            this.player.setTexture('personaje_inicio');
            this.mostrarDanio(enemigo, this);
            this.dialogue.start(["¡Respuesta correcta! Has golpeado al enemigo."], null, true);
            this.movimientoBloqueado = false;
        });

        this.player.atacar(enemigo);
        this.rayo.setPosition(enemigo.x, enemigo.y).setVisible(true);
        this.tweens.add({
          targets: this.rayo,
          alpha: 1,
          scaleY: 0.3,
          scaleX: 0.3,
          duration: 300,
          yoyo: true, 
          onComplete: () => {
            this.cameras.main.shake(100, 0.01);
            this.rayo.setVisible(false);
          }
        });

    } else {
        this.zombie.setScale(0.85);
        this.zombie.once('animationcomplete-zombie_ataca', () => {
            this.zombie.setScale(0.5);
            this.zombie.setTexture('zombie_inicio');
            this.mostrarDanio(this.player, this);
            this.dialogue.start(["¡Error! El enemigo aprovechó para atacarte."],null,true);
        });
        this.zombie.atacar(this.player);        
        this.movimientoBloqueado = false;
    }
  }
Botonlogica(boton){
  boton.setInteractive();
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
    
    if(boton === this.menu){
      this.boton_menu();
    }
    if(boton === this.sonido_icono){
      if(this.sonido_icono.texture.key === 'sonido_on'){
        this.sonido_icono.setTexture('sonido_off');
        this.sound.mute = true;
      }else{
        this.sonido_icono.setTexture('sonido_on');
        this.sound.mute = false;
      }
    }
    if(boton === this.musica_icono){
      if(this.musica_icono.texture.key === 'musica_on'){
        this.musica_icono.setTexture('musica_off');
        this.musica_fondo.pause();
      }else{
        this.musica_icono.setTexture('musica_on');
        this.musica_fondo.resume();
      }
    }
    if(boton === this.boton_menos){
      if(this.sound.volume > 0){
        this.sound.volume -= 0.1;
      }
      if(this.sound.volume == 0){
        this.sonido_icono.setTexture('sonido_off');
      }
    }
    if(boton === this.boton_mas){
      if(this.sound.volume < 1){
        this.sound.volume += 0.1;
      }
    }
    if (boton === this.boton_pausa) {
      if (this.boton_pausa.texture.key === 'reanudar') { 
        this.movimientoBloqueado = true;
        this.physics.world.pause(); 
        this.time.paused = true;    
        this.boton_pausa.setTexture('boton_pausa'); 
      } else {
        this.movimientoBloqueado = false;
        this.physics.world.resume();
        this.time.paused = false;
        this.boton_pausa.setTexture('reanudar');
      }
    }
    if(boton === this.boton_home){
      this.scene.start('Inicio');
    }
    if(boton === this.boton_niveles || boton === this.boton_niveles2){
      this.scene.start('Niveles'); 
    }
    if(boton === this.flecha && this.player.nivel == 2){
      this.scene.start('Nivel2');
    }
    if(boton === this.flecha && this.player.nivel == 3){
      this.scene.start('Nivel3');
    }
    if(boton === this.flecha && this.player.nivel == 4){
      this.scene.start('Nivel4');
    }
  });
}

estadisticas() {
    this.combateActivo = false;
    let num_estrellas = 0;
    let puntuacion = this.player.vida / 10;
    const incorrectas = Math.round((100 - Math.max(0, this.player.vida)) / 10);
    const correctas = 10 - incorrectas;

    this.time.delayedCall(3500, () => {
      this.dialogue.reset();
      if (this.dialogue.container) this.dialogue.container.setVisible(false);
      if (this.dialogue.border) this.dialogue.border.setVisible(false);
      if (this.dialogue.avatar) this.dialogue.avatar.setVisible(false);
      this.boton_niveles2.setPosition(-300, 200).setVisible(true);
      this.movimientoBloqueado = true;
      this.player.setVelocity(0, 0); 
      this.player.stop(); 
      [this.corazon_lleno, this.corazon85, this.corazon50, this.corazon25, this.corazon_vacio].forEach(c => c.setVisible(false));
      if (this.player.vida >= 100) {
        this.corazon_lleno.setPosition(150, -80).setVisible(true);
        num_estrellas = 3;
      } else if (this.player.vida >= 65) {
        this.corazon85.setPosition(150, -80).setVisible(true);
        num_estrellas = 2;
      } else if (this.player.vida >= 35) {
        this.corazon50.setPosition(150, -80).setVisible(true);
        num_estrellas = 2;
      } else if (this.player.vida > 0) {
        this.corazon25.setPosition(150, -80).setVisible(true);
        num_estrellas = 1;
      } else {
        this.corazon_vacio.setPosition(150, -80).setVisible(true);
        num_estrellas = 0;
      }

      for (let i = 0; i < 3; i++) {
        const ex = (i - 1) * 90;
        this.estrellas[i].setPosition(ex, 150).setVisible(i < num_estrellas);
      }
      const resultado = this.zombie.vida === 0 ? "¡VICTORIA!" : "DERROTA";
      if(resultado == "¡VICTORIA!"){
        this.flecha.setPosition(300,200).setVisible(true);
      }
      this.textoVictoria.setText(resultado)
      this.textoEstadisticas.setText(
        `Vida Héroe: ${this.player.vida}\n\n\n` +
        `Preguntas correctas: ${correctas}\n\n` +
        `Preguntas incorrectas: ${incorrectas}`
      )
      this.textoPuntuacion.setText(`Puntuación: ${puntuacion * 10}%`)
      this.uiContenedor.setVisible(true);
    });
}


boton_menu(){
  if(this.panel.visible){
    this.panel.setVisible(false);
    this.sonido_icono.setVisible(false);
    this.musica_icono.setVisible(false);
    this.boton_menos.setVisible(false);
    this.boton_mas.setVisible(false);
    this.boton_pausa.setVisible(false);
    this.texto_musica.setVisible(false);
    this.texto_sonido.setVisible(false);
    this.texto_pausa.setVisible(false);
    this.boton_home.setVisible(false);
    this.boton_niveles.setVisible(false);
    this.texto_home.setVisible(false);
    this.texto_niveles.setVisible(false);
  }else{
    this.panel.setVisible(true);
    this.sonido_icono.setVisible(true);
    this.musica_icono.setVisible(true);
    this.boton_mas.setVisible(true);
    this.boton_menos.setVisible(true);
    this.boton_pausa.setVisible(true);
    this.texto_musica.setVisible(true);
    this.texto_sonido.setVisible(true);
    this.texto_pausa.setVisible(true);
    this.boton_home.setVisible(true);
    this.boton_niveles.setVisible(true);
    this.texto_home.setVisible(true);
    this.texto_niveles.setVisible(true);
  }
}

recogerPocion(player, pocion,nombrePocion) {
  if (!pocion || !pocion.active) return;
  this.dialogue.reset();
  pocion.setActive(false);
  this.player.agregarpocion(nombrePocion);
  this.expo.setPosition(pocion.x, pocion.y);
  this.expo.setVisible(true);
  pocion.destroy();
  this.time.delayedCall(1000, () => {
    this.expo.setVisible(false);
  });
  this.dialogue.start(
    ["¡Felicidades, la poción ya ha sido agregada a tu inventario!"], 
      () => { 
      this.time.delayedCall(3500, () => this.secuenciaEnemigo());
    }, true);
  
  
}

mostrarDanio(sprite, escena) {
    escena.tweens.add({
        targets: { valor: 0 },
        valor: 100,
        duration: 400,
        onUpdate: (tween, target) => {
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                Phaser.Display.Color.ValueToColor(0xffffff),
                Phaser.Display.Color.ValueToColor(0xff0000),
                100,
                target.valor
            );
            sprite.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
        },
        onComplete: () => {
            escena.tweens.add({
                targets: { valor: 0 },
                valor: 100,
                duration: 600,
                onUpdate: (tween, target) => {
                    const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                        Phaser.Display.Color.ValueToColor(0xff0000),
                        Phaser.Display.Color.ValueToColor(0xffffff),
                        100,
                        target.valor
                    );
                    sprite.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
                },
                onComplete: () => {
                    sprite.clearTint(); 
                }
            });
        }
    });

  }

  actualizarBarra() {
    if(this.vida.visible==false){
      this.vida.setVisible(true);
      this.barraSalud.setVisible(true);
    }
    this.vidaActual = this.player.vida;
    this.barraSalud.clear();
    this.barraSalud.fillStyle(0x000000, 0.7);
    this.barraSalud.fillRect(this.xBarra, this.yBarra, this.anchoBarra, this.altoBarra);
    let porcentaje = (this.vidaActual / this.vidaMaxima);
    let anchoFinal = this.anchoBarra * porcentaje;
    let color = (porcentaje > 0.3) ? 0x00ff00 : 0xff0000; 
    this.barraSalud.fillStyle(color, 1);
    if (anchoFinal > 0) {
      this.barraSalud.fillRect(this.xBarra, this.yBarra, anchoFinal, this.altoBarra);
    }
  }

  actualizarBarraEnemigo() {
    if(this.zombie.visible==true){
      this.barraSaludEnemigo.setVisible(true);
    }
    this.vidaActualEnemigo = this.zombie.vida;
    this.barraSaludEnemigo.clear();
    this.barraSaludEnemigo.fillStyle(0x000000, 0.7);
    this.barraSaludEnemigo.fillRect(this.zombie.x-60, this.zombie.y-90, this.anchoBarraEnemigo, this.altoBarraEnemigo);
    let porcentajeEnemigo = (this.vidaActualEnemigo / this.vidaMaximaEnemigo);
    let anchoFinal = this.anchoBarraEnemigo * porcentajeEnemigo;
    this.barraSaludEnemigo.fillStyle(0xff0000, 1);
    if (anchoFinal > 0) {
      this.barraSaludEnemigo.fillRect(this.zombie.x-60, this.zombie.y-90, anchoFinal, this.altoBarraEnemigo);
    }
  }

  update() {
    if (!this.inputManager) return;
    this.inputManager.update();

    if (this.player) {
        if (this.player.esta_atacando) {
            return;
        }
        if (this.player.vida <= 0) {
          this.player.setVelocity(0);
          return; 
        }
        if (this.movimientoBloqueado) {
            this.player.setVelocityX(0);
            this.player.stop();
            this.player.setTexture('personaje_inicio');
        } else {
            const input = this.inputManager;
            const inputFiltrado = {
                left:  input.left,
                right: input.right,
                up:    this.especial ? input.up : false, 
                down:  this.especial ? input.down : false, 
            };
            this.player.actualizarMovimiento(inputFiltrado, this.movimientoBloqueado);
        }

  }}
}
