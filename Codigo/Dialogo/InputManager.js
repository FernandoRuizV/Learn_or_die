export class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D");

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.esp32Data = { x: 2048, y: 2048 }; // Valores iniciales del joystick (centro)
    this.esp32IP = "http://172.26.166.15";

    this.iniciarLecturaFisica();
  }

  async iniciarLecturaFisica() {
    setInterval(async () => {
      try {
        const controlador = new AbortController();
        const timeoutId = setTimeout(() => controlador.abort(), 500);

        const respuesta = await fetch(this.esp32IP, { signal: controlador.signal });
        const texto = await respuesta.text();
        const valores = texto.split(",");

        this.esp32Data.x = parseInt(valores[0]);
        this.esp32Data.y= parseInt(valores[1]);
        
        clearTimeout(timeoutId);
      } catch (error) {
        // Si falla la conexión, ponemos el joystick en el centro
        this.esp32Data.x = 2048;
        this.esp32Data.y = 2048;
      }
    }, 100); // Se ejecuta 10 veces por segundo
  }

  update() {
    // 1. Lógica de Teclado
    const tecladoIzquierda = this.cursors.left.isDown || this.keys.A.isDown;
    const tecladoDerecha = this.cursors.right.isDown || this.keys.D.isDown;
    const tecladoArriba = this.cursors.up.isDown || this.keys.W.isDown;
    const tecladoAbajo = this.cursors.down.isDown || this.keys.S.isDown;

    // 2. Lógica de Joystick Físico
    // El ESP32 da de 0 a 4095. El centro es ~2048.
    const joystickIzquierda = this.esp32Data.x < 1000;
    const joystickDerecha = this.esp32Data.x > 3000;
    const joystickArriba = this.esp32Data.y < 1000;
    const joystickAbajo = this.esp32Data.y > 3000;

    // 3. Combinamos ambos: si cualquiera se activa, el personaje se mueve
    this.left = tecladoIzquierda || joystickIzquierda;
    this.right = tecladoDerecha || joystickDerecha;
    this.up = tecladoArriba || joystickArriba;
    this.down = tecladoAbajo || joystickAbajo;
  }
}