import Phaser from 'phaser'


import GameScene from './GameScene.js'

const config = {
	type: Phaser.AUTO,
	width: 1270,
	height: 562,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				x: 0,
				y: 300 
			}
		}
	},
	scene: [GameScene]
}
export default new Phaser.Game(config);

