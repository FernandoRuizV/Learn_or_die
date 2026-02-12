export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth, 
  height: window.innerHeight,
  backgroundColor: '#1d1d1d',
  
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
