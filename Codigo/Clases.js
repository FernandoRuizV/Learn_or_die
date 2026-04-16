export class Personaje extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, nivel, vida) {
    super(scene, x, y, 'personaje_inicio'); 
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.4); 
    this.body.setSize(150, 600); 
    this.body.setOffset(100, 50);
    this.setCollideWorldBounds(true);

    this.nombre = "Héroe";
    this.nivel = nivel;
    this.vida = vida;
    this.ataque = 10;
    this.pociones = [];
    this.defensa = 0;
    this.esta_atacando = false;
  }

  actualizarMovimiento(input, estaBloqueado) {
    if (estaBloqueado) {
      this.setVelocityX(0);
      this.stop(); 
      this.setTexture('personaje_inicio');
      return;
    }
    this.setVelocityX(0);
    if (input.left) {
      this.setVelocityX(-160);
      this.anims.play('caminar_izq', true);
    } 
    else if (input.right) {
      this.setVelocityX(160);
      this.anims.play('caminar_der', true);
    } 
    else {
      this.stop();
      this.setTexture('personaje_inicio');
    }
  }
   
  subirNivel() {
    this.nivel += 1;
    console.log(`${this.nombre} ha subido al nivel ${this.nivel}!`);
  }
  agregarpocion(pocion){
    this.pociones.push(pocion);
    console.log(`Se agregó la poción ${pocion}. Pociones actuales:`, this.pociones);

  }
  usarPocion(nombrePocion) {
    const index = this.pociones.findIndex(p => p === nombrePocion);
    if (index !== -1) {
      console.log(`Usando la poción ${nombrePocion}`);
      this.pociones.splice(index, 1); // remover la poción del inventario
    } else {
      console.log(`No tienes la poción ${nombrePocion}`);
    }
  }
  buscarPocion(nombrePocion) {
    const index = this.pociones.findIndex(p => p === nombrePocion);
    if (index !== -1) {
      console.log(`Si la tienes ${nombrePocion}`);
      return true;
    } else {
      console.log(`No tienes la poción ${nombrePocion}`);
      return false;
    }
  }
  atacar(Objetivo) {
    this.anims.play('personaje_ataca');
    Objetivo.recibirAtaque(this.ataque);
    console.log(`${this.nombre} ataca a ${Objetivo.nombre}`);
}
  defenderse() {
    this.defensa+=10;
    console.log(`${this.nombre} ha aumentado su defensa en ${this.defensa}`);
  }
  recibirDanio(cantidad) {
    let danio= cantidad;
    if (this.defensa>0 && this.defensa<danio){
        danio-=this.defensa;
        this.vida -= danio;
    } else {
        this.vida-=danio
        if(this.vida<=0){
            console.log(`${this.nombre} ha sido derrotado.`);
        }
    }
  }

  mostrarEstado() {
    console.log(`--- Estado del Personaje ---`);
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Nivel: ${this.nivel}`);
    console.log(`Vida: ${this.vida}`);
    console.log(`Medallas: ${this.medallas}`);
    console.log(`----------------------------`);
  }
}

export class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, nombre, vida, ataque, sprite) {
        super(scene, x, y, sprite); 
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.setCollideWorldBounds(true);
        this.setScale(0.5); 
    }

    recibirAtaque(danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
          this.anims.play('zombie_muere');
          console.log(`${this.nombre} ha sido derrotado.`);
          this.once('animationcomplete', (animation) => {
            if (animation.key === 'zombie_muere') {
                this.scene.time.delayedCall(3000, () => {
                  this.destroy();
              }); 
            }
          });
        }
    }

    atacar(Objetivo) {
        if (Objetivo.recibirDanio) {
            this.anims.play('zombie_ataca');
            Objetivo.recibirDanio(this.ataque);
            console.log(`${this.nombre} ataca a ${Objetivo.nombre}`);
        }
    }
}
