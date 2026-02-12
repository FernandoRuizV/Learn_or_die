export class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("A,D");

    this.left = false;
    this.right = false;

    this.esp32Data = { x: 0 };
  }

  update() {
    this.left = this.cursors.left.isDown || this.keys.A.isDown || this.esp32Data.x < -0.5;
    this.right = this.cursors.right.isDown || this.keys.D.isDown || this.esp32Data.x > 0.5;
  }
}