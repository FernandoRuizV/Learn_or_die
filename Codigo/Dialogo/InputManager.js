export class InputManager {
 constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("A,D");

    this.left = false;
    this.right = false;

    // Agregamos "y" y "btnA" a los datos
    this.esp32Data = { x: 2048, y: 2048, btnA: 1 }; 
    this.esp32IP = "http://192.168.100.232";
    
    // Variable para evitar que el diálogo se salte de golpe (Efecto metralleta)
    this.botonAPrevio = 1; 

    this.iniciarLecturaFisica();
}

  async iniciarLecturaFisica() {
    setInterval(async () => {
      try {
        const controlador = new AbortController();
        const timeoutId = setTimeout(() => controlador.abort(), 500);

        const respuesta = await fetch(this.esp32IP, { signal: controlador.signal });
        const texto = await respuesta.text();
   
        // CORRECCIÓN: Separamos por salto de línea (\n) como lo tienes en tu control.ino
        const lineas = texto.split("\n");

        // Parseamos cada línea separando por los dos puntos ":"
        this.esp32Data.x = parseInt(lineas[0].split(":")[1]);
        this.esp32Data.y = parseInt(lineas[1].split(":")[1]);
        this.esp32Data.btnA = parseInt(lineas[3].split(":")[1]);
 
       clearTimeout(timeoutId);
       } catch (error) {
      // Si falla la conexión, ponemos valores neutros
        this.esp32Data.x = 2048;
        this.esp32Data.y = 2048;
        this.esp32Data.btnA = 1;
      }
    }, 100); 
  }

 update() {
    // 1. Lógica de Teclado
    const tecladoIzquierda = this.cursors.left.isDown || this.keys.A.isDown;
    const tecladoDerecha = this.cursors.right.isDown || this.keys.D.isDown;

    // 2. Lógica de Joystick Físico
    const joystickIzquierda = this.esp32Data.x < 1000;
    const joystickDerecha = this.esp32Data.x > 3000;

    // 3. Combinamos ambos: si cualquiera se activa, el personaje se mueve
    this.left = tecladoIzquierda || joystickIzquierda;
    this.right = tecladoDerecha || joystickDerecha;
  }

  // NUEVA FUNCIÓN: Solo dice "true" en el instante que lo aplastas
  botonA_FuePresionado() {
    const presionadoAhora = (this.esp32Data.btnA === 0);
    const presionadoAntes = (this.botonAPrevio === 0);

    this.botonAPrevio = this.esp32Data.btnA;

    return presionadoAhora && !presionadoAntes;
  }
}