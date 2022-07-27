// Spaceship prefab for fast ship
class Fastship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        //this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame WANT TO SHIFT FOR DIFF SPACESHIP
    }

    
    update(speed) 
    {
        // move spaceship left
        this.x -= (speed * game.settings.spaceshipFastSpd);
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() 
    {
        this.x = game.config.width;
    }
}