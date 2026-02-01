import Phaser from 'phaser';
import ScoreLabel from '../ui/ScoreLabel';
import RobotSpawner from './RobotSpawner';

const cespedKey = 'cesped';
const elKey = 'el';
const collectableKey = 'collectable';
const robotKey = 'robot';
const loseKey = 'lose';
const winKey = 'win';
const botSoundKey = 'botSound';
const collectSoundKey = 'collect';
const ostKey = 'ost';

export default class GameScene extends Phaser.Scene
{    
    constructor()
    {
        super('game-scene');
        
        this.player = undefined;
        this.cursors = undefined;
        this.scoreLabel = undefined;
        this.collectables = undefined;
        this.gameOver = false;
        this.win = false;
        this.state = undefined;
    }
    

    preload()
    {
        this.load.image('background1', '/backroundFF1.png');
        this.load.image(cespedKey, '/cesped.png');
        this.load.image(collectableKey, '/collectable.png');
        this.load.image(robotKey, '/robot.png');

        this.load.spritesheet(elKey, 
            '/El.png',
            { frameWidth: 65, frameHeight: 65 });
        
        this.load.audio(loseKey, '/sounds/EFECTO DE SONIDO - FALLIDO ( FIU FIU FIUUU)(MP3_160K).mp3');
        this.load.audio(ostKey, '/sounds/Unicornio (Instrumental)(MP3_160K).mp3');
        this.load.audio(botSoundKey, '/sounds/SABOTAJE  _  AMONG US  _  SOUND EFFECTS  _  EFECTOS DE SONIDO(MP3_160K).mp3');
        this.load.audio(collectSoundKey, '/sounds/Pokemon Botón - Efecto de Sonido(MP3_160K).mp3');
        this.load.audio(winKey, '/sounds/Sonido de Victoria de un Juego para tus vídeos - Efecto de Sonido(MP3_160K).mp3')
    }


    create()
    {
        this.add.image(3200, 340, 'background1');

        const platforms = this.createPlatforms();
        this.player = this.createPlayer();
        this.collectables = this.createCollectables();
        this.scoreLabel = this.createScoreLabel(16, 16, 0);
        this.state = this.add.text(0, 0, '', { fontSize: '64px', color: 'red' });

        this.cameras.main.setBounds(0, 0, 6400, 562);
        this.physics.world.setBounds(0, 0, 6400, 562);
        this.cameras.main.startFollow(this.player);
        
        this.robotSpawner = new RobotSpawner(this, robotKey)
        const robotGroup = this.robotSpawner.group;

        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.collectables, platforms);
        this.physics.add.collider(robotGroup, platforms);

        this.physics.add.collider(this.player, robotGroup, this.hitRobot, null, this);

        this.physics.add.overlap(this.player, this.collectables, this.collect, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.ost = this.sound.add(ostKey);
        this.ost.loop = true;
        this.ost.play();

        this.collectSound = this.sound.add(collectSoundKey);
        this.botSound = this.sound.add(botSoundKey);
        this.botSound.loop = true;
        this.winSound = this.sound.add(winKey);
    }


    update()
    {
        let velocidad = 160;
        
        try{
            if (this.gameOver)
            {
                this.state.setPosition((this.player.x < 640) ? 400 : this.player.x - 200, 250);
                this.state.setText('Has perdido!');
                return;
            }

            if(this.win){
                this.state.setPosition((this.player.x < 640) ? 410 : this.player.x - 190, 250);
                this.state.setColor('green');
                this.state.setText('Has ganado!');
                return;
            }
                
            if(this.cursors.shift.isDown){
                velocidad*=2;
            }
            if(this.cursors.left.isDown)
            {
                this.player.setVelocityX(velocidad * (-1));

                this.player.anims.play('left', true);
            }
            else if(this.cursors.right.isDown)
            {
                this.player.setVelocityX(velocidad);

                this.player.anims.play('right', true);
            }
            else
            {
                this.player.setVelocityX(0);

                this.player.anims.play('turn');
            }

            if(this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.setVelocityY(-350);
            }
        }catch(error){
            console.log("error");
        }
    }


    createPlatforms()
    {
        const platforms = this.physics.add.staticGroup();
        
        for(let i = 0; i<100; i++){
            platforms.create(i*70, 550, cespedKey).setScale(2);
        }        
        let position = 100;
        let height = 100;
        platforms.create(0 + position, height * 2, cespedKey);
        platforms.create(300 + position, height * 4, cespedKey);
        platforms.create(600 + position, height * 2, cespedKey);
        platforms.create(900 + position, height * 3, cespedKey);
        platforms.create(1200 + position, height * 4, cespedKey);
        platforms.create(1500 + position, height * 2, cespedKey);
        platforms.create(1800 + position, height * 2, cespedKey);
        platforms.create(2100 + position, height * 4, cespedKey);
        platforms.create(2400 + position, height * 3, cespedKey);
        platforms.create(2700 + position, height * 1, cespedKey);
        platforms.create(3000 + position, height * 2, cespedKey);
        platforms.create(3300 + position, height * 4, cespedKey);
        platforms.create(3600 + position, height * 2, cespedKey);
        platforms.create(3900 + position, height * 3, cespedKey);
        platforms.create(4200 + position, height * 3, cespedKey);
        platforms.create(4500 + position, height * 2, cespedKey);
        platforms.create(4800 + position, height * 4, cespedKey);
        platforms.create(5100 + position, height * 2, cespedKey);
        platforms.create(5400 + position, height * 1, cespedKey);
        platforms.create(5700 + position, height * 3, cespedKey);
        platforms.create(6000 + position, height * 1, cespedKey);
        
        return platforms;
    }


    createPlayer()
    {
        const player = this.physics.add.sprite(100, 450, elKey);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(elKey, { start:0, end:3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ {key: elKey, frame: 4} ],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(elKey, { start:5, end:8 }),
            frameRate: 10,
            repeat: -1
        })
        
        return player;
    }


    createCollectables()
    {
        const collectables = this.physics.add.group({
            key: collectableKey,
            repeat: 20,
            setXY: { x: 100, y: 0, stepX: 300 }
        });

        collectables.children.iterate((c) => {
            const child = (/**@type {Phaser.Physics.Arcade.Sprite} */(c));
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        });

        return collectables;
    }    


    collect(player, collectable)
    {
        this.collectSound.play();
        collectable.disableBody(true, true);
        this.scoreLabel.add(1);

        this.robotSpawner.spawn(player.x);
        this.botSound.play();

        if (this.collectables.countActive(true) === 0)
        {
            this.physics.pause();
            this.botSound.pause();
            this.botSound.loop = false;
            this.ost.pause();
            this.winSound.play();
    		player.anims.play('turn');
            this.win = true;
        }
    }


    createScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: 'red' };
		const label = new ScoreLabel(this, x, y, score, style);

        label.setScrollFactor(0);
        label.setOrigin(1, 0);
		this.add.existing(label);

        label.setPosition(x+350, y);
		return label;
	}


    hitRobot(player, /*robot*/)
	{
		this.physics.pause();
        this.ost.pause();
        this.botSound.pause();
        
        let lose = this.sound.add(loseKey);
        lose.play();

		player.setTint(0xff0000);

		player.anims.play('turn');

		this.gameOver = true;
	}

}
