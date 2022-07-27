let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
};

let game = new Phaser.Game(config);


// set UI sizes
let borderUISize = game.config.height / 15; //THIS IS 32
let borderPadding = borderUISize / 2; //THIS IS 16


// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, mouse;
