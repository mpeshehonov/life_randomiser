import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const sceneConfig: Phaser.Types.Core.GameConfig['scene'] = {
  preload: function (this: Phaser.Scene) {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  },
  create: function (this: Phaser.Scene) {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  },
};

const PhaserGame = () => {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainer.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      backgroundColor: '#1a1a1a',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200, x: 0 },
        },
      },
      scene: sceneConfig,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} className="rounded-lg overflow-hidden" />;
};

export default PhaserGame;
