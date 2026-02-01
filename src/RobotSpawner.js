import Phaser from 'phaser';

export default class RobotSpawner
{
	/**
	 * @param {Phaser.Scene} scene;
	 */
	constructor(scene, robotKey = 'robot')
	{
		this.scene = scene;
		this.key = robotKey;

		this._group = this.scene.physics.add.group();
	}

	get group()
	{
		return this._group;
	}

	spawn(playerX = 0)
	{
		const x = (playerX < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(playerX - 250, playerX + 250);

        const robot = this.group.create(x, 16, this.key);
        robot.setBounce(1);
        robot.setCollideWorldBounds(true);
		robot.setVelocity(Phaser.Math.Between(-200, 200), 20);
		
		return robot;
	}
}