import Phaser from 'phaser'


import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	width: 1270,
	height: 562,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [GameScene]
}
export default new Phaser.Game(config);

