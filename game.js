class Game extends Phaser.Scene {
    constructor() {
        super("game");
        this.SCREEN_WIDTH = 1280;
        this.SCREEN_HEIGHT = 720;
        this.CHARACTER_SIZE = 100;
        this.FLOOR_SIZE = 120;
        this.FLOOR_HEIGHT = 550;
        this.MAX_VELOCITY = 800;
        this.JUMP_HEIGHT = -600;
        this.CHARACTER_SCALE = 5;
        this.SLUG_SCALE = 2.5;
    }
    preload() {
        // this.load.image("");
        this.rolyPoly = this.load.image('rolypoly', 'assets/rolyPoly.png');
        this.slug = this.load.image('slug', 'assets/slug.png');
        
    }
    create() {
        this.character = this.physics.add.image(100, 300, 'rolypoly').setScale(this.CHARACTER_SCALE);
        this.slug = this.physics.add.image(400, 300, 'slug').setScale(this.SLUG_SCALE);
        this.slug2 = this.physics.add.image(750, 300, 'slug').setScale(this.SLUG_SCALE);
        this.enemies = this.add.group();
        this.enemies.add(this.slug);
        this.enemies.add(this.slug2);

        this.add.circle(0, 0, 200, "0xffc800");

        
        /*this.character = this.add.rectangle(
            this.SCREEN_WIDTH * 0.1, 
            this.SCREEN_HEIGHT * 0.5, 
            this.CHARACTER_SIZE, 
            this.CHARACTER_SIZE, 
            "0xFFFFFF");*/
        
        this.physics.add.existing(this.character, false);

        this.ground = this.add.group();

        for (let i = 0; i < this.SCREEN_WIDTH; i += this.FLOOR_SIZE) {
            let groundTile = this.add.rectangle(i, this.FLOOR_HEIGHT, this.FLOOR_HEIGHT, this.FLOOR_SIZE, "0x00ff2a");
            this.physics.add.existing(groundTile);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);

        }
        this.physics.add.collider(this.character, this.ground);
        // this.physics.add.collider(this.character, this.slug);
        this.physics.add.collider(this.character, this.enemies);
        this.physics.add.collider(this.enemies, this.ground);
        // this.physics.add.collider(this.slug2, this.ground);

        //adding collision events
        this.physics.add.overlap(
            this.character,
            this.enemies,
            () =>{
                this.scene.start('gameOver');
            }
        )

        
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.keyW.on('down', () => { this.jump() });

    }

    jump() {
        this.character.body.setVelocityY(this.JUMP_HEIGHT);
    }

    update() {

        if (this.keyD.isDown) {
            this.character.x += 5;
        }
        if (this.keyA.isDown) {
            this.character.x -= 5;
        }
    }
}
class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
        create() {
            this.add.text(640, 360, "RolyPoly: To the End", { fontSize: "64px", fill: "#FFFFFF" }).setOrigin(0.5);
            this.add.text(640, 460, "Press A to start again", { fontSize: "32px", fill: "#FFFFFF" }).setOrigin(0.5);
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        }
        update() {
            if (this.keyA.isDown) {
                this.scene.start("game");
            }
        }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },
    backgroundColor: "#00d9ff",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    scene: [Game, GameOver],
    title: "My Unicorn Game",
});

console.log("Game is running");