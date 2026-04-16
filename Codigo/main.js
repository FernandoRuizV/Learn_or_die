import { config } from "./config.js";
import { Nivel1 } from "./Escenas/Nivel1.js";
import { Intro } from "./Escenas/Intro.js";
import { Inicio } from "./Escenas/Inicio.js";
import { Niveles } from "./Escenas/Niveles.js";

config.scene = [Inicio,Intro,Niveles,Nivel1];

new Phaser.Game(config);
