import Phaser, { Game } from "phaser-ce";
import { DEBUG, ENEMIES, GRAVITY, PLAY_SOUND, SCALE, SPEED } from "./constants";

type Direction = "right" | "left";

class GameState extends Phaser.State {
  private map: Phaser.Tilemap | undefined;
  private layer: Phaser.TilemapLayer | undefined;
  private cursors: Phaser.CursorKeys | undefined;
  private jumpButton: Phaser.Key | undefined;
  private runButton: Phaser.Key | undefined;

  private mario: Phaser.Sprite | undefined;
  private enemies: Phaser.Sprite[] = [];
  private doNothing = true;
  private gameFinished = false;
  private direction: Direction = "right";
  private enemiesDirection: Direction[] = [];

  init() {
    this.stage.backgroundColor = "#5C94FC";
  }

  preload(game: Phaser.Game) {
    super.preload(game);

    //  Load the Google WebFont Loader script
    this.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
    );

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
    this.load.audio("endGame", "static/audio/endGame.mp3");

    // The Google WebFont Loader will look for this object, so create it before loading the script.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.WebFontConfig = {
      active: function () {
        game.time.events.add(
          Phaser.Timer.SECOND,
          () => {
            // writing a text
            const style = {
              font: "20px SuperMario",
              fill: "#fff",
              align: "center",
              stroke: "#3e4d67",
              strokeThickness: 4,
            };
            game.add.text(20, 40, "SuperMariotek", style);
            game.add.text(1650, 100, "...", {
              ...style,
              font: "18px 'SuperMario'",
            });
            game.add.text(1800, 200, "😉", { ...style, font: "18px tahoma" });
          },
          this
        );
      },
      custom: {
        families: ["SuperMario"],
        urls: ["static/fonts"],
      },
    };
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

    ENEMIES.map(({ x }) => {
      const enemy = this.add.sprite(50, 50, "enemy");
      enemy.scale.setTo(1 + SCALE / 12, 1 + SCALE / 12);
      enemy.x = x;
      enemy.anchor.x = 0.5;
      enemy.anchor.y = 0.5;
      enemy.animations.add("walkEnemy", [0, 1], 10, true);
      enemy.animations.add("dieEnemy", [2], 10, true);

      this.physics.enable(enemy);
      this.enemies.push(enemy);
      this.enemiesDirection.push("left");

      enemy.body.bounce.y = 0;
      enemy.body.linearDamping = 1;
      enemy.body.collideWorldBounds = true;
      enemy.body.fixedRotation = true;
    });

    this.physics.enable(mario);
    this.physics.arcade.gravity.y = GRAVITY + SCALE * 20;

    mario.body.bounce.y = 0;
    mario.body.linearDamping = 1;
    mario.body.collideWorldBounds = true;

    mario.animations.add("left", [2, 4, 5], 10, true);
    mario.animations.add("wait", [0], 10, true);
    mario.animations.add("jump", [6], 10, true);
    mario.animations.add("die", [1], 10, true);
    mario.animations.add("win", [4], 10, true);

    mario.body.fixedRotation = true;

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
    const {
      mario,
      enemies,
      direction,
      layer,
      cursors,
      jumpButton,
      runButton,
      gameFinished,
    } = this;
    if (!mario) return;

    /**
     * Walk
     */
    const walk = (
      obj: Phaser.Sprite,
      dir: "right" | "left",
      speed = "slow"
    ) => {
      const isLeft = dir === "left";
      const directionCoefficient = isLeft ? -1 : 1;

      if (speed !== "slow") {
        obj.body.velocity.x += 5 * directionCoefficient;
        if (
          speed === "fast" &&
          ((isLeft && obj.body.velocity.x < -184) ||
            (!isLeft && obj.body.velocity.x > 184))
        ) {
          obj.body.velocity.x =
            (200 + SPEED * (SCALE / 2)) * directionCoefficient;
        } else if (
          (isLeft && obj.body.velocity.x < -120) ||
          (!isLeft && obj.body.velocity.x > 120)
        ) {
          obj.body.velocity.x =
            (120 + SPEED * (SCALE / 2)) * directionCoefficient;
        }
      } else {
        obj.body.velocity.x += 1 * directionCoefficient;
      }
    };

    const wait = (obj: Phaser.Sprite) => {
      if (obj.body.velocity.x > 10) {
        obj.body.velocity.x -= 10;
      } else if (obj.body.velocity.x < -10) {
        obj.body.velocity.x += 10;
      } else {
        obj.body.velocity.x = 0;
      }
    };

    /**
     * Mario walking
     */
    const walkMario = (
      obj: Phaser.Sprite,
      dir: "right" | "left",
      speed = "slow"
    ) => {
      if (direction !== dir) {
        obj.scale.x *= -1;
        this.direction = dir;
      }

      if (
        obj.body.velocity.x === 0 ||
        (obj.animations.currentAnim.name !== dir && obj.body.onFloor())
      ) {
        obj.animations.play("left", 10, true);
      }

      walk(obj, dir, speed);
      this.doNothing = false;
    };

    this.physics.arcade.collide(
      mario,
      layer,
      () => undefined,
      () => {
        return !gameFinished;
      }
    );

    // add enemies to map
    enemies.map((enemy, index) => {
      this.physics.arcade.collide(
        enemy,
        layer,
        () => undefined,
        () => {
          return enemy?.alive;
        }
      );
      const fallDown =
        enemy.body.y + enemy.body.height === this.world.height && enemy.alive;

      if (enemy && enemy.alive) enemy.animations.play("walkEnemy", 3);

      // enemy walking
      if (enemy && enemy.body.onFloor()) {
        if (enemy.body.blocked.left) {
          wait(enemy);
          this.enemiesDirection[index] = "right";
        } else if (enemy.body.blocked.right) {
          wait(enemy);
          this.enemiesDirection[index] = "left";
        }
        walk(enemy, this.enemiesDirection[index]);
      }

      // enemy fall down
      if (fallDown) {
        enemy.alive = false;
        enemy.body.collideWorldBounds = false;
      }
    });

    this.doNothing = true;

    if (mario.alive && !gameFinished) {
      const marioSpeed = runButton?.isDown ? "fast" : "regular";
      // walk and run
      if (cursors?.left.isDown) {
        walkMario(mario, "left", marioSpeed);
        this.doNothing = false;
      } else if (cursors?.right.isDown) {
        walkMario(mario, "right", marioSpeed);
        this.doNothing = false;
      }

      // jump
      if ((cursors?.up.isDown || jumpButton?.isDown) && mario.body.onFloor()) {
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
      wait(mario);
      if (mario.body.onFloor()) {
        mario.animations.play("wait", 20, true);
      }
    }

    // check death
    const fallDown =
      mario.body.y + mario.body.height === this.world.height && mario.alive;
    const hitEnemy = false;
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

    // Game end
    if (mario.body.x > 6322 && !gameFinished) {
      this.gameFinished = true;
      this.direction = "right";

      mario.animations.play("win", 20, true);
      this.sound.removeByKey("background");
      this.sound.play("endGame", 0.5);

      this.add.text(
        6400,
        mario.body.y + mario.body.height / 2,
        Math.floor(4000 - mario.body.y * 10).toString(),
        {
          font: "14px 'SuperMario'",
          fill: "#fff",
        }
      );

      // mario.body.x = 6450;

      const walkInterval = setInterval(() => {
        walkMario(mario, "right", "slow");
      }, 100);

      setTimeout(() => {
        this.gameFinished = false;
        this.game.state.restart();
        clearInterval(walkInterval);
      }, 5400);
    }

    // check enemy death
    if (
      mario.body.x + mario.body.width > 1386 &&
      mario.body.x < 1414 &&
      // mario.body.y > 300 &&
      !mario.body.onFloor() &&
      enemies[0] &&
      enemies[0].alive
    ) {
      // eslint-disable-next-line no-console
      console.log("HIT killing");
      enemies[0].animations.stop("walkEnemy");
      enemies[0].animations.play("dieEnemy", 20, true);
      enemies[0].body.collideWorldBounds = false;

      enemies[0].alive = false;
    }
  }

  render(game: Game) {
    if (this.mario && DEBUG) {
      game.debug.bodyInfo(this.mario, 32, 32);
    }
    // if (this.enemy && DEBUG) {
    //   game.debug.bodyInfo(this.enemy, 32, 280);
    // }
  }
}

export default GameState;
