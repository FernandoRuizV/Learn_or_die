import { config } from "./config.js";
import { Nivel1 } from "./Escenas/Nivel1.js";
import { Intro } from "./Escenas/Intro.js";
import { Inicio } from "./Escenas/Inicio.js";
import { Niveles } from "./Escenas/Niveles.js";
import { Especial } from "./Escenas/Especial.js";

config.scene = [Inicio,Intro,Niveles,Nivel1,Especial];

new Phaser.Game(config);
<<<<<<< HEAD

=======
if (window.Cypress) {
        window.scene = this; // Exponemos la escena solo cuando Cypress está activo
    }
>>>>>>> 1fceade6a7b6f4504e8e4af9204fa69d58bd7d48
