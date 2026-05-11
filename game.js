class Game extends Phaser.Scene {
    constructor() {
        super("game");
        this.SCREEN_WIDTH = 1280;
        this.SCREEN_HEIGHT = 720;
        this.CHARACTER_SIZE = 100;
        this.FLOOR_SIZE = 120;
        this.FLOOR_HEIGHT = 550;
    }
    preload() {
        // this.load.image("");
    }
    create() {
        this.character = this.add.rectangle(
            this.SCREEN_WIDTH * 0.1, 
            this.SCREEN_HEIGHT * 0.5, 
            this.CHARACTER_SIZE, 
            this.CHARACTER_SIZE, 
            "0xFFFFFF");
        this.physics.add.existing(this.character, false);

        ground = this.add.group();

        for (let i = 0; i < this.SCREEN_WIDTH; i += this.FLOOR_SIZE) {
            this.add.rectangle(i, this.FLOOR_HEIGHT, )
        }
        this.add.collider(this.character, this.ground);
    }
    update() {}
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },
    // backgroundColor: "#000000",
    backgroundColor: "#000000",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1800
            }
        }
    },
    scene: [Game],
    title: "My Unicorn Game",
});

console.log("Game Goes Here");