// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 3;         //DONT NEED WILL TRACK MOUSE, can use for projectile speed
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
    }

    update() {
        // left/right movement
        mouse.on
        (
            "pointermove", 
            (pointer) =>
            {
                if(!this.isFiring) {
                    this.x = Phaser.Math.Clamp(pointer.x,47,590);
                }
            },this);

        //firing functionality
        if(mouse.activePointer.leftButtonDown() && !this.isFiring){  //if mouse click and not firing already
            this.isFiring = true;
            this.sfxRocket.play(); //play sound effects
        }

        //if fired, move up!
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){ //may have to tweak values check in
        
            this.y -= this.moveSpeed;
        }

        //reset on miss
        if(this.isFiring && this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }

    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
