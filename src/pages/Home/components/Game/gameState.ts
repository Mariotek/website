import Phaser, { Game } from "phaser-ce";
import { DEBUG, GRAVITY, PLAY_SOUND, SCALE, SPEED } from "./constants";

class GameState extends Phaser.State {
  private map: Phaser.Tilemap | undefined;
  private layer: Phaser.TilemapLayer | undefined;
  private cursors: Phaser.CursorKeys | undefined;
  private jumpButton: Phaser.Key | undefined;
  private runButton: Phaser.Key | undefined;

  private mario: Phaser.Sprite | undefined;
  private enemy: Phaser.Sprite | undefined;
  private doNothing = true;
  private direction: "right" | "left" = "right";

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
    this.load.spritesheet("enemy", "static/images/mario/enemy1.png", 41, 36, 3);

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

    // writing a text
    const style = {
      font: "24px Arial",
      fill: "#fff",
      align: "center",
      stroke: "#3e4d67",
      strokeThickness: 4,
    };
    const logo = this.add.text(80, 100, "Super Mariotek", style);
    logo.z = -1;
    this.add.text(1650, 100, "...", {
      ...style,
      font: "18px tahoma",
    });
    this.add.text(1800, 200, "😉", { ...style, font: "18px tahoma" });

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
    mario.x = 200;
    mario.anchor.x = 0.5;
    mario.anchor.y = 0.5;
    mario.animations.add("walk");

    const enemy = this.add.sprite(50, 50, "enemy");
    enemy.scale.setTo(1 + SCALE / 12, 1 + SCALE / 12);
    enemy.x = 1400;
    enemy.y = 0.5;
    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;
    enemy.animations.add("walkEnemy", [0, 1], 10, true);
    enemy.animations.add("dieEnemy", [2], 10, true);

    this.physics.enable(mario);
    this.physics.enable(enemy);
    this.physics.arcade.gravity.y = GRAVITY;

    mario.body.bounce.y = 0;
    mario.body.linearDamping = 1;
    mario.body.collideWorldBounds = true;
    enemy.body.bounce.y = 0;
    enemy.body.linearDamping = 1;
    enemy.body.collideWorldBounds = true;

    mario.animations.add("left", [2, 4, 5], 10, true);
    mario.animations.add("wait", [0], 10, true);
    mario.animations.add("jump", [6], 10, true);
    mario.animations.add("die", [1], 10, true);

    enemy.body.fixedRotation = true;
    mario.body.fixedRotation = true;

    // check colliding
    // mario.body.onBeginContact?.add(marioHit, this);

    if (PLAY_SOUND) this.sound.play("background", 0.1, true);
    this.camera.follow(mario);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runButton = this.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    this.mario = mario;
    this.map = map;
    this.layer = layer;
    this.enemy = enemy;
  }

  update() {
    const {
      mario,
      enemy,
      direction,
      layer,
      cursors,
      jumpButton,
      runButton,
    } = this;
    if (!mario) return;

    this.physics.arcade.collide(mario, layer);
    this.physics.arcade.collide(enemy, layer);

    if (enemy && enemy.alive) enemy.animations.play("walkEnemy", 3);
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

    // jump
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

    // stay
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
    const hitEnemy =
      mario.body.x + mario.body.width > 1386 &&
      mario.body.x < 1416 &&
      mario.body.onFloor() &&
      enemy &&
      enemy.alive;
    const fallDown =
      mario.body.y + mario.body.height === this.world.height && mario.alive;
    if (hitEnemy || fallDown) {
      this.direction = "right";
      this.sound.removeByKey("background");
      this.sound.play("die", 0.5);
      mario.animations.play("die", 20, true);
      mario.body.velocity.y = -310 - SPEED * SCALE * 1.2;
      mario.alive = false;
      mario.body.collideWorldBounds = false;

      setTimeout(() => {
        this.game.state.restart();
      }, 1300);
    }

    // check enemy death
    if (
      mario.body.x + mario.body.width > 1386 &&
      mario.body.x < 1414 &&
      // mario.body.y > 300 &&
      !mario.body.onFloor() &&
      enemy &&
      enemy.alive
    ) {
      console.log("HIT killing");
      enemy.animations.stop("walkEnemy");
      enemy.animations.play("dieEnemy", 20, true);
      enemy.body.collideWorldBounds = false;
      enemy.body.y = 550;

      enemy.alive = false;
    }
  }

  render(game: Game) {
    // game.debug.text(this.world?.height.toString(), 32, 320);
    if (this.mario && DEBUG) {
      game.debug.bodyInfo(this.mario, 32, 32);
    }
  }
}

export default GameState;
