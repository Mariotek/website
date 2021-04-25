import Phaser, { Game } from "phaser-ce";
import { DEBUG, GRAVITY, PLAY_SOUND, SCALE, SPEED } from "./constants";

function marioHit() {
  // body: any
  // bodyB: any,
  // shapeA: any,
  // shapeB: any,
  // equation: any
  //  The block hit something.
  //
  //  This callback is sent 5 arguments:
  //
  //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
  //  The p2.Body this Body is in contact with.
  //  The Shape from this body that caused the contact.
  //  The Shape from the contact body.
  //  The Contact Equation data array.
  //
  //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
}

class GameState extends Phaser.State {
  private map: Phaser.Tilemap | undefined;
  private layer: Phaser.TilemapLayer | undefined;
  private cursors: Phaser.CursorKeys | undefined;
  private jumpButton: Phaser.Key | undefined;
  private runButton: Phaser.Key | undefined;

  private mario: Phaser.Sprite | undefined;
  private doNothing = true;
  private direction = "right";

  init() {
    this.stage.backgroundColor = "#5C94FC";
  }

  preload(game: Phaser.Game) {
    super.preload(game);

    // load map
    this.load.tilemap(
      "objects",
      "static/json/map1-1.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    // load sprites
    this.load.image("tiles", "static/images/mario/items2.png");
    this.load.spritesheet(
      "mario",
      "static/images/mario/marioSmall.png",
      34,
      34,
      7
    );

    // load sounds
    this.load.audio("jump", "static/audio/jump.ogg");
    this.load.audio("background", "static/audio/background.ogg");
    this.load.audio("die", "static/audio/die.wav");
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    const map = this.add.tilemap("objects");
    const layer = map.createLayer("level1");
    layer.resizeWorld();
    layer.wrap = true;
    layer.setScale(SCALE, SCALE);
    this.world.setBounds(
      this.world.bounds.x,
      this.world.bounds.y,
      this.world.width * SCALE,
      this.world.height * SCALE
    );

    map.addTilesetImage("items", "tiles");
    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(21, 22);
    map.setCollisionBetween(27, 28);
    map.setCollisionByIndex(10);
    map.setCollisionByIndex(13);
    map.setCollisionByIndex(17);
    map.setCollisionByIndex(40);

    const mario = this.add.sprite(50, 50, "mario");
    mario.scale.setTo(1 + SCALE / 6, 1 + SCALE / 6);
    mario.anchor.x = 0.5;
    mario.anchor.y = 0.5;
    mario.animations.add("walk");

    this.physics.enable(mario);
    this.physics.arcade.gravity.y = GRAVITY;

    mario.body.bounce.y = 0;
    mario.body.linearDamping = 1;
    mario.body.collideWorldBounds = true;

    mario.animations.add("left", [2, 4, 5], 10, true);
    mario.animations.add("wait", [0], 10, true);
    mario.animations.add("jump", [6], 10, true);
    mario.animations.add("die", [1], 10, true);

    mario.body.fixedRotation = true;
    mario.body.onBeginContact?.add(marioHit, this);
    mario.alive = true;

    if (PLAY_SOUND) this.sound.play("background", 0.1, true);
    this.camera.follow(mario);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runButton = this.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    this.mario = mario;
    this.map = map;
    this.layer = layer;
  }

  update() {
    const { mario, direction, layer, cursors, jumpButton, runButton } = this;
    if (!mario) return;

    this.physics.arcade.collide(mario, layer);
    this.doNothing = true;

    if (cursors?.left.isDown && mario.alive) {
      if (direction !== "left") {
        mario.scale.x *= -1;
        this.direction = "left";
      }
      if (
        mario.body.velocity.x === 0 ||
        (mario.animations.currentAnim.name !== "left" && mario.body.onFloor())
      ) {
        mario.animations.play("left", 10, true);
      }

      mario.body.velocity.x -= 5;
      if (runButton?.isDown) {
        if (mario.body.velocity.x < -200) {
          mario.body.velocity.x = -200 - SPEED * (SCALE / 2);
        }
      } else {
        if (mario.body.velocity.x < -120) {
          mario.body.velocity.x = -120 - SPEED * (SCALE / 2);
        }
      }
      this.doNothing = false;
    } else if (cursors?.right.isDown && mario.alive) {
      if (direction !== "right") {
        mario.scale.x *= -1;
        this.direction = "right";
      }
      if (
        mario.body.velocity.x === 0 ||
        (mario.animations.currentAnim.name !== "left" && mario.body.onFloor())
      ) {
        mario.animations.play("left", 10, true);
      }
      mario.body.velocity.x += 5;
      if (runButton?.isDown) {
        if (mario.body.velocity.x > 200) {
          mario.body.velocity.x = 200 + SPEED * (SCALE / 2);
        }
      } else {
        if (mario.body.velocity.x > 120) {
          mario.body.velocity.x = 120 + SPEED * (SCALE / 2);
        }
      }
      this.doNothing = false;
    }

    if (cursors?.up.justDown || jumpButton?.justDown) {
      if (mario.body.onFloor()) {
        if (PLAY_SOUND) this.sound.play("jump", 0.25);
        mario.body.velocity.y = -310 - SPEED * SCALE * 1.2;
        mario.animations.play("jump", 20, true);
        this.doNothing = false;

        if (mario.body.blocked.top) {
          alert("ssss");
        }
      }
    }
    if (this.doNothing) {
      if (mario?.body.velocity.x > 10) {
        mario.body.velocity.x -= 10;
      } else if (mario.body.velocity.x < -10) {
        mario.body.velocity.x += 10;
      } else {
        mario.body.velocity.x = 0;
      }
      if (mario.body.onFloor()) {
        mario.animations.play("wait", 20, true);
      }
    }

    // check death
    if (mario.body.y + mario.body.height === this.world.height && mario.alive) {
      this.sound.removeByKey("background");
      this.sound.play("die", 0.5);
      mario.animations.play("die", 20, true);
      mario.body.velocity.y = -310 - SPEED * SCALE * 1.2;
      mario.alive = false;
      mario.body.collideWorldBounds = false;

      setTimeout(() => {
        this.game.state.restart();
      }, 1500);
    }
  }

  render(game: Game) {
    // game.debug.text(this.world?.height.toString(), 32, 320);
    if (this.mario && DEBUG) {
      game.debug.text(
        `m: ${this.mario.body.y + this.mario.body.height} , wod:${
          this.world.height
        }`,
        32,
        320
      );

      game.debug.bodyInfo(this.mario, 32, 32);
    }
  }
}

export default GameState;
