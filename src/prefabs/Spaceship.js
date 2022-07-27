// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, pointValue, shipSpeed) { //easy fix for variable speed!
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.speed = shipSpeed; //store ship speed given
        //this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame WANT TO SHIFT FOR DIFF SPACESHIP
    }

    
    update(speed) 
    {
        // move spaceship left
        this.x -= (speed * this.speed);
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