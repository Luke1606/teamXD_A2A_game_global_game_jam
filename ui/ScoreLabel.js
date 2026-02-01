import Phaser from 'phaser';

const formatScore = (score) => {
	return `Obras recogidas: ${score}`;
}

export default class ScoreLabel extends Phaser.GameObjects.Text
{
	constructor(scene, x, y, score, style)
	{
		super(scene, x, y, formatScore(score), style);

		this.score = score;
	}
	
	add(points)
	{
		this.setScore(this.score + points);
	}

	setScore(score)
	{
		this.score  = score;
		this.updateScoreText();
	}

	updateScoreText()
	{
		this.setText(formatScore(this.score));
	}
}