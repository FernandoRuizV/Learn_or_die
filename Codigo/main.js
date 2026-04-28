import { config } from "./config.js";
import { Nivel1 } from "./Escenas/Nivel1.js";
import { Intro } from "./Escenas/Intro.js";
import { Inicio } from "./Escenas/Inicio.js";
import { Niveles } from "./Escenas/Niveles.js";

config.scene = [Inicio,Intro,Niveles,Nivel1];

new Phaser.Game(config);

//es el lo que agregue 
// main.js (o donde inicializas Phaser)
const params = new URLSearchParams(window.location.search);
const testMode = params.get('test') === 'true';

const game = new Phaser.Game(config);
window.game = game; // importante para Cypress

// Cuando arranque la primera escena:
game.events.on('ready', () => {
  const scene = game.scene.getScenes(true)[0];

  if (testMode) {
    // 🔥 SALTAR INTRO
    // A) si tienes clave de escena jugable:
    game.scene.start('GameScene'); 
    
    // B) o dispara directamente el estado listo:
    // scene.dialogueManager?.hide();
    // scene.player?.setActive(true).setVisible(true);
  }
});