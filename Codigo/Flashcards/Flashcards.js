export class FlashcardManager {
  constructor(scene) {
    this.scene = scene;
    this.flashcards = [];
    this.indiceActual = 0;
  }
  
  // Método para cerrar las flashcards y limpiar los elementos
  cerrar() {
        if (this.elementosActivos) {
            this.elementosActivos.forEach(el => {
            if (el && el.destroy) {
                el.destroy();
            }
            });
            this.elementosActivos = [];
        }
        this.scene.physics.resume();
    }

  cargarFlashcards(jsonKey) {
    const data = this.scene.cache.json.get(jsonKey);
    this.flashcards = data;
    this.indiceActual = 0;
  }

  mostrar(jsonKey) {

    if (this.flashcards.length === 0) {
      this.cargarFlashcards(jsonKey);
    }

    if (this.indiceActual >= this.flashcards.length) {
        this.indiceActual = 0;
    }

    const card = this.flashcards[this.indiceActual];

    this._mostrarTarjeta(
      card.titulo,
      card.contenido
    );
  }

    _mostrarTarjeta(titulo, contenido) {

        let mostrandoReverso = false;

        const camWidth = this.scene.cameras.main.width;
        const camHeight = this.scene.cameras.main.height;

        const width = 380;
        const height = 520;

        const x = camWidth / 2;
        const y = camHeight / 2;

        const elementos = [];
        this.elementosActivos = elementos; // Guardamos los elementos para poder destruirlos luego

        // Overlay oscuro
        const overlay = this.scene.add.rectangle(
            camWidth / 2,
            camHeight / 2,
            camWidth,
            camHeight,
            0x000000,
            0.45
        )
        .setDepth(9998)
        .setScrollFactor(0);
        // Hacemos que el overlay sea interactivo para detectar clics fuera de la tarjeta
        overlay.setInteractive(
        new Phaser.Geom.Rectangle(
            0,
            0,
            camWidth,
            camHeight
        ),
        Phaser.Geom.Rectangle.Contains
        );

        // Evitamos que el clic en la tarjeta se propague al overlay
        overlay.on('pointerdown', (pointer, localX, localY, event) => {
            event.stopPropagation();
            this.cerrar(); // Cerramos las flashcards al hacer clic en el overlay

        });

        elementos.push(overlay);

        // Cerrar al hacer clic en el overlay
        overlay.on("pointerdown", () => {
            this.scene.physics.resume();
            this.cerrar();
            this.scene.flashcardsAbiertas = false;
            this.scene.movimientoBloqueado = false;
        });

        // Carta principal
        const card = this.scene.add.rectangle(
            x,
            y,
            width,
            height,
            0xf4e6c2
        )
        .setStrokeStyle(8, 0x3b2416)
        .setDepth(9999)
        .setInteractive();

        elementos.push(card);

        // Borde interno
        const innerBorder = this.scene.add.rectangle(
            x,
            y,
            width - 20,
            height - 20
        )
        .setStrokeStyle(4, 0xc89b3c)
        .setDepth(10000);

        elementos.push(innerBorder);

        // Título
        const tituloTxt = this.scene.add.text(
            x,
            y - 190,
            titulo,
            {
                fontSize: "24px",
                color: "#2d1b0e",
                fontStyle: "bold",
                align: "center",
                wordWrap: {
                width: width - 60
                }
            }
        )
        .setOrigin(0.5)
        .setDepth(10000);

        elementos.push(tituloTxt);

        // Texto frontal
        const contenidoTxt = this.scene.add.text(
            x,
            y,
            "Click para ver información",
            {
            fontSize: "24px",
            color: "#4a3425",
            align: "center",
            wordWrap: { width: width - 80 },
            fontFamily: "Georgia"
            }
        )
        .setOrigin(0.5)
        .setDepth(10000);

        elementos.push(contenidoTxt);

        // Número de tarjeta
        const contador = this.scene.add.text(
            x,
            y + 210,
            `${this.indiceActual + 1}/${this.flashcards.length}`,
            {
            fontSize: "22px",
            color: "#3b2416",
            fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setDepth(10000);

        elementos.push(contador);

        // BOTÓN ATRÁS
        const btnAtras = this.scene.add.text(
            x - 120,
            y + 210,
            "⬅",
            {
            fontSize: "36px",
            color: "#ffffff",
            backgroundColor: "#3b2416",
            padding: {
                x: 15,
                y: 8
            }
            }
        )
        .setOrigin(0.5)
        .setInteractive()
        .setDepth(10000);

        elementos.push(btnAtras);

        // BOTÓN SIGUIENTE
        const btnSiguiente = this.scene.add.text(
            x + 120,
            y + 210,
            "➡",
            {
            fontSize: "36px",
            color: "#ffffff",
            backgroundColor: "#3b2416",
            padding: {
                x: 15,
                y: 8
            }
            }
        )
        .setOrigin(0.5)
        .setInteractive()
        .setDepth(10000);

        elementos.push(btnSiguiente);

        // HOVER
        [btnAtras, btnSiguiente].forEach(btn => {

            btn.on("pointerover", () => {
            btn.setScale(1.1);
            });

            btn.on("pointerout", () => {
            btn.setScale(1);
            });
        });

        // CLICK EN LA CARTA = GIRAR
       card.on("pointerdown", () => {
        this.scene.tweens.add({
            targets: [card, innerBorder, tituloTxt, contenidoTxt],
            scaleX: 0,
            duration: 180,
            onComplete: () => {
            // Si está mostrando el reverso
            if (mostrandoReverso) {
                mostrandoReverso = false;
                tituloTxt.setText(titulo);
                contenidoTxt.setText(
                "Click para ver información"
                );
            }
            // Si está mostrando el frente
            else {
                mostrandoReverso = true;
                tituloTxt.setText(titulo);
                contenidoTxt.setText(contenido);
            }
                // Volver a mostrar la carta con la nueva información
                this.scene.tweens.add({
                    targets: [card, innerBorder, tituloTxt, contenidoTxt],
                    scaleX: 1,
                    duration: 180
             });
                }
            });
        });

        // SIGUIENTE
        btnSiguiente.on("pointerdown", () => {

            elementos.forEach(el => el.destroy());

            this.indiceActual++;

            if (this.indiceActual >= this.flashcards.length) {
            this.indiceActual = 0;
            }

            this.mostrar("flashcards");
        });

        // ATRÁS
        btnAtras.on("pointerdown", () => {

            elementos.forEach(el => el.destroy());

            this.indiceActual--;

            if (this.indiceActual < 0) {
            this.indiceActual = this.flashcards.length - 1;
            }

            this.mostrar("flashcards");
        });
    }
}