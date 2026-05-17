export class InputManager {
  constructor(scene) {
    if (window._inputManagerInstance) {
      window._inputManagerInstance.scene = scene;
      window._inputManagerInstance.cursors = scene.input.keyboard.createCursorKeys();
      window._inputManagerInstance.keys = scene.input.keyboard.addKeys("W,A,S,D");
      return window._inputManagerInstance;
    }
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D");
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.esp32Data = { x: 130, y: 1885, joyBtn: 0, botonA: 0 };
    
    this.puertoSerial = null;
    this.lectorSerial = null;

    window._inputManagerInstance = this;
    this.iniciarLecturaFisica();
  }

 async iniciarLecturaFisica() {
  const puertosDisponibles = await navigator.serial.getPorts();
  
  if (puertosDisponibles.length > 0) {
    // Ya fue autorizado antes — conectar automático
    await this.conectarPuerto(puertosDisponibles[0]);
  } else {
    // Primera vez — necesita click del usuario
    const texto = this.scene.add.text(10, 10, '🔌 Haz clic para conectar el mando', {
      fontSize: '18px', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 8, y: 6 }
    }).setDepth(1000).setInteractive();

    texto.on('pointerdown', async () => {
      this.puertoSerial = await navigator.serial.requestPort();
      texto.destroy();
      await this.conectarPuerto(this.puertoSerial);
    });
  }
}
async conectarPuerto(puerto) {
  try {
    this.puertoSerial = puerto;
    await this.puertoSerial.open({ baudRate: 115200 });
    console.log("¡ESP32 conectada automáticamente!");

    const decodificador = new TextDecoderStream();
    this.puertoSerial.readable.pipeTo(decodificador.writable);

    const transformadorLineas = decodificador.readable.pipeThrough(
      new TransformStream(new LineBreakTransformer())
    );
    this.lectorSerial = transformadorLineas.getReader();

    while (true) {
      const { value, done } = await this.lectorSerial.read();
      if (done) break;
      if (value) this.procesarTramaSerial(value);
    }
  } catch (error) {
    console.error("Error al conectar ESP32:", error);
    this.resetearValoresPorDefecto();
  }
}

  procesarTramaSerial(linea) {
    try {
      const textoLimpio = linea.trim();
      if (!textoLimpio) return;

      const valores = textoLimpio.split(",");
      
      if (valores.length === 4) {
        this.esp32Data.x      = parseInt(valores[0]);
        this.esp32Data.y      = parseInt(valores[1]);
        this.esp32Data.joyBtn = parseInt(valores[2]); 
        this.esp32Data.botonA = parseInt(valores[3]); 

        console.log(`X: ${this.esp32Data.x} | Y: ${this.esp32Data.y} | JoyBtn: ${this.esp32Data.joyBtn} | Botón A: ${this.esp32Data.botonA}`);
      }
    } catch (e) {
      this.resetearValoresPorDefecto();
    }
  }

  resetearValoresPorDefecto() {
    this.esp32Data.x = 75;
    this.esp32Data.y = 1885;
    this.esp32Data.joyBtn = 0;
    this.esp32Data.botonA = 0;
  }

  update() {
  const tecladoIzquierda = this.cursors.left.isDown  || this.keys.A.isDown;
  const tecladoDerecha   = this.cursors.right.isDown || this.keys.D.isDown;
  const tecladoArriba    = this.cursors.up.isDown    || this.keys.W.isDown;
  const tecladoAbajo     = this.cursors.down.isDown  || this.keys.S.isDown;

  const joystickDerecha   = this.esp32Data.x >300 && this.esp32Data.botonA === 1;
  const joystickIzquierda = this.esp32Data.x < 1 && this.esp32Data.botonA === 1;

  const joystickArriba = this.esp32Data.y < 500 && this.esp32Data.botonA === 1;
  const joystickAbajo  = this.esp32Data.y > 3000 && this.esp32Data.botonA === 1;

  this.left  = tecladoIzquierda || joystickIzquierda;
  this.right = tecladoDerecha   || joystickDerecha;
  this.up    = tecladoArriba    || joystickArriba;
  this.down  = tecladoAbajo     || joystickAbajo;
}
}

class LineBreakTransformer {
  constructor() {
    this.chunks = "";
  }
  transform(chunk, controller) {
    this.chunks += chunk;
    const lines = this.chunks.split(/\r?\n/);
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }
  flush(controller) {
    controller.enqueue(this.chunks);
  }
}