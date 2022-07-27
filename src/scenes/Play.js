class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('fastship', './assets/fastship.png');
        this.load.image('spaceshipBoom', './assets/spaceshipBoom.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //load in music for play scene and can edit scrolling sprite for background by picking a new one
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFC4506).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);




        // add Rocket (p1) 
        this.p1rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        

    
        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipStdSpd).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, game.settings.spaceshipStdSpd).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10,game.settings.spaceshipStdSpd).setOrigin(0,0);
        //HERE we add new spaceship, MAKE SMALLER FASTER SHIP!
        this.ship04 = new Spaceship(this,game.config.width + borderUISize*4, borderUISize*6, 'fastship', 0, 50,game.settings.spaceshipFastSpd).setOrigin(0,0);
        



        // define keys and mouse input for rocket    
        mouse = this.input;
        //keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //for resetting and selecting difficulty
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score 
        this.p1Score = 0;
        // high score tracking
        this.HIscore = parseInt(localStorage.getItem("score")) || 0;


        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '12px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "SCORE: "+ this.p1Score, scoreConfig);

        this.best = this.add.text(225,borderUISize + borderPadding*2, "HI SCORE: "+ this.HIscore, scoreConfig)

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //speed up halfway through game! Need to use timer... check above ex code!
        this.pace = 1;
        this.spdUp = this.time.delayedCall(game.settings.gameTimer/2, () =>{
            this.pace = 1.5;
        }, null, this);

        //particle emitting here, want to create particle effect based upon individual spaceship objects created?

        this.spaceshipBoomManager = this.add.particles('spaceshipBoom'); //particle manager here CAN MAKE SPRITES WHATEVER I WANT

        this.spaceshipBoomEffect01 = this.spaceshipBoomManager.createEmitter({
            follow:this.ship01,
            quantity: 20,
            scale: {start: 1.0, end: 0.0},
            speed: {min: 50, max: 100},
            lifespan:800,
            on:false //REMEMEBR TO COME BACK HERE, want to trigger in colision chacking for update
        });

        this.spaceshipBoomEffect02 = this.spaceshipBoomManager.createEmitter({
            follow:this.ship02,
            quantity: 20,
            scale: {start: 1.0, end: 0.0},
            speed: {min: 50, max: 100},
            lifespan:800,
            on:false //REMEMEBR TO COME BACK HERE, want to trigger in colision chacking for update
        });

        this.spaceshipBoomEffect03 = this.spaceshipBoomManager.createEmitter({
            follow:this.ship03,
            quantity: 20,
            scale: {start: 1.0, end: 0.0},
            speed: {min: 50, max: 100},
            lifespan:800,
            on:false //REMEMEBR TO COME BACK HERE, want to trigger in colision chacking for update
        });
        
        this.spaceshipBoomEffect04 = this.spaceshipBoomManager.createEmitter({
            follow:this.ship04,
            quantity: 20,
            scale: {start: 1.0, end: 0.0},
            speed: {min: 50, max: 100},
            lifespan:800,
            on:false //REMEMEBR TO COME BACK HERE, want to trigger in colision chacking for update
        });

    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.p1Score);
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1rocket.update();                     
            this.ship01.update(this.pace);               // update spaceships (x4) MAKE SURE TO ALLOW FOR SPEED UP
            this.ship02.update(this.pace);
            this.ship03.update(this.pace);
            this.ship04.update(this.pace);
        }

        // collision checking for rocket
        if(this.checkCollision(this.p1rocket, this.ship03)) 
        {
            this.p1rocket.reset();
            this.shipExplode(this.ship03);
            this.spaceshipBoomEffect03.explode();
        }

        if (this.checkCollision(this.p1rocket, this.ship02)) 
        {
            this.p1rocket.reset();
            this.shipExplode(this.ship02);
            this.spaceshipBoomEffect02.explode();
        }

        if (this.checkCollision(this.p1rocket, this.ship01)) 
        {
            this.p1rocket.reset();
            this.shipExplode(this.ship01);
            this.spaceshipBoomEffect01.explode(); //trigger particle system
        }

        if (this.checkCollision(this.p1rocket, this.ship04)) 
        {
            this.p1rocket.reset();
            this.shipExplode(this.ship04);
            this.spaceshipBoomEffect04.explode();
       }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });

        // score add and repaint remember to add to high score to keep track 
        this.p1Score += ship.points;
        if(this.p1Score > this.HIscore) //if current score greater than hi score, make hi score current score
        {
            this.HIscore = this.p1Score
            localStorage.setItem('score', this.HIscore);
            this.best.text = "HI SCORE: "+ this.HIscore;
        }
        this.scoreLeft.text ="SCORE: "+ this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }
}