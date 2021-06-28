var PLAY = 1;
var END = 0;
var gameState = 1;
var canvas;
var pirate, nonPirate;
var coin, bomb;
var sword;
var restart;


function preload() {
  bomb1_img = loadImage("images/bomb.png");
  bomb2_img = loadImage("images/bomb2.png");
  coin1_img = loadImage("images/coin1.png");
  coin2_img = loadImage("images/coin2.png");
  coin3_img = loadImage("images/coin3.png");
  coin4_img = loadImage("images/coin4.png");
  nonpP_img = loadImage("images/Non-Player Pirate.png");
  pPirate_img = loadImage("images/Player Pirate img.png");
  sword_img = loadImage("images/sword.png");
  treasure_img = loadImage("images/TREASURE.png");
  gameOverImage = loadImage("images/game over.png")
  restartImg = loadImage("images/restart.png");
}

function setup() {
  canvas = createCanvas(1000, 700);

  pirate = createSprite(50, 180, 20, 50)
  pirate.addImage(pPirate_img);
  pirate.scale = 0.5

  restart = createSprite(300, 100)
  restart.addImage(restartImg);

  restart.visible = false;

  score = 0;
  coinGroup = createGroup();

  bombGroup = createGroup();
}

function draw() {

  background("lightblue");

  if (gameState === PLAY) {

    {
      pirate.pause("nokeypressed");
      pirate.velocityX = 0;
      pirate.velocityY = 0;
    }

    if (keyDown(UP_ARROW)) {
      pirate.velocityX = 0;
      pirate.velocityY = -5;
    }
    if (keyDown(DOWN_ARROW)) {
      pirate.velocityX = 0;
      pirate.velocityY = 5;
    }
    if (keyDown(LEFT_ARROW)) {
      pirate.velocityX = -5;
      pirate.velocityY = 0;
    }
    if (keyDown(RIGHT_ARROW)) {
      pirate.velocityX = 5;
      pirate.velocityY = 0;
    }

    bombs();
    coins();

    // Increase score if pirate touching coin
    if (coinGroup.isTouching(pirate)) {
      coinGroup.destroyEach();


      score = score + 2;
    }
    else if (bombGroup.isTouching(pirate)) {
      gameState = END;
    }

  }


  else if (gameState === END) {



    restart.visible = true;

    coinGroup.destroyEach();
    bombGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);

    // Change the image of pirate to gameover and reset its position
    pirate.addImage(gameOverImage);
    pirate.x = 550;
    pirate.y = 400;
    pirate.velocity = 0;

    if (mousePressedOver(restart)) {
      reset();
    }

  }





  //Display score
  textSize(40);
  text("Score : " + score, 300, 50);


  drawSprites();
}


function bombs() {
  if (frameCount % 50 === 0) {
    bomb = createSprite(random(100, 950), 200, 20, 20);
    bomb.velocityY = 7
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: bomb.addImage(bomb1_img);
        break;
      case 2: bomb.addImage(bomb2_img);
        break;
      default: break;

    }
    bomb.scale = 0.5;
    bombGroup.add(bomb);
  }
}


function coins() {
  if (frameCount % 20 === 0) {
    coin = createSprite(random(100, 1000), 0, 100, 100);

    coin.velocityY = 6;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: coin.addImage(coin1_img);

        break;
      case 2: coin.addImage(coin2_img);

        break;
      case 3: coin.addImage(coin3_img);

        break;
      case 4: coin.addImage(coin4_img);

        break;

      default: break;

    }
    coin.scale = 0.5;
    coinGroup.add(coin);

  }
}

function reset() {
  gameState = PLAY;

  restart.visible = false;

  coinsGroup.destroyEach();
  bombsGroup.destroyEach();

  pirate.addImage(pPirate_img);



  score = 0;
}