export class FlashcardManager {
  constructor(scene) {
    this.scene = scene;
    this.flashcards = [];
    this.indiceActual = 0;
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

        // Overlay oscuro
        const overlay = this.scene.add.rectangle(
            camWidth / 2,
            camHeight / 2,
            camWidth,
            camHeight,
            0x000000,
            0.45
        )
        .setDepth(199)
        .setScrollFactor(0);

        elementos.push(overlay);

        // Carta principal
        const card = this.scene.add.rectangle(
            x,
            y,
            width,
            height,
            0xf4e6c2
        )
        .setStrokeStyle(8, 0x3b2416)
        .setDepth(200)
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
        .setDepth(201);

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
        .setDepth(202);

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
        .setDepth(202);

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
        .setDepth(202);

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
        .setDepth(203);

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
        .setDepth(203);

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

            if (mostrandoReverso) return;

            mostrandoReverso = true;

            this.scene.tweens.add({
            targets: [card, innerBorder, tituloTxt, contenidoTxt],
            scaleX: 0,
            duration: 180,
            onComplete: () => {

                contenidoTxt.setText(contenido);

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