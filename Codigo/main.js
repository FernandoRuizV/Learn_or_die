import { config } from "./config.js";
import { Nivel1 } from "./Escenas/Nivel1.js";

config.scene = [Nivel1];

new Phaser.Game(config);
