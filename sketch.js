//Ghost Runner Game
var gamestate = "serve";

//Tower
var tower, towerImage;

//Door
var door, doorImage, doorGroup;

//climber
var climber, climberImage, climberGroup;

//ghost
var ghost, ghostImage, ghostImage2;

//invisible block
var invisibleblock, invisibleBlockGroup;

//bullet bill
var bulletBill, bulletBillImg, bulletBillGroup

//score
var score;

//cointext
var coinText;

//coins
var coins, coinsImage, coinsGroup;

//sound
var con;
var die;
var item;
var bulletbill;

//block
var block;

//Function Preload
function preload() {
  
  //Tower
  towerImage = loadImage("tower.png");
  
  //Door
  doorImage = loadImage("door.png");
  
  //climber
  climberImage = loadImage("climber.png");
  
  //ghost
  ghostImage = loadImage ("ghost-standing.png");
  ghostImage2 = loadImage ("ghost-jumping.png");
  
  //bullet bill
  bulletBillImg = loadImage("bullet-bill.png");
  
  //sound
  con = loadSound ("spooky.wav");
  die = loadSound ("die.mp3");
  item = loadSound ("coin.wav");
  bulletbill = loadSound ("bullet-bill.ogg");
  
  //coins 
  coinsImage = loadImage ("coin.png");
  
  //play
  play = loadImage ("play.jpg");
}

//Function Setup
function setup() {
  
  //Canvas
  createCanvas (600,600);
  
  //creating groups
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup = createGroup();
  bulletBillGroup = createGroup();
  coinsGroup = createGroup();
  
  //Tower
  tower = createSprite(300, 300, 10, 10);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  //ghost
  ghost = createSprite (200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImage);
  ghost.addImage("jumping",ghostImage2);
  
  //block
  block = createSprite (300, 10, 600, 50);
  block.shapeColor = "white";
 
//coin
  coinText = 0;
  
  //score
  score = 0;
  
}

//Function Draw
function draw() {
  background("black");
 
  
   //displaying coins
  stroke("red");
    fill("red");
      textSize(15);
  
  text("Coins:"+  coinText, 10, 30);
  
  //displaying score
  stroke("red");
    fill("red");
      textSize(15);
  text("Score:"+  score, 300, 30);
  
  //gamestate serve
  if(gamestate === "serve") {
    //displaying press
  stroke("red");
    fill("red");
      textFont("Creepster")
      textSize(30);
  
  text("PRESS 'S' TO START", 225, 300);
    
    
    if(keyDown("s")) {
      gamestate = "play";
    }
  }
  //gamestate play
if(gamestate === "play") {
  
  
  //sound
  con.play();
  score = Math.ceil(frameCount/frameRate());
     
  
  //Tower
  if(tower.y > 400 ) {
    tower.y = 300;
  }
  
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")) {
   ghost.x = ghost.x +3; 
  }
  if(keyDown("space")) {
    ghost.velocityY  = -5;
    ghost.changeAnimation ("jumping",ghostImage2);
  }
  if(coinsGroup.isTouching(ghost)){
    coinsGroup.destroyEach();
    coinText = coinText +1;
    item.play();
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(climberGroup.isTouching (ghost)) {
    ghost.velocityY = 0;
  }
  
  if(bulletBillGroup.isTouching(ghost)){
    ghost.destroy();
    con.stop();
    die.play();
    gamestate = "end";
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    con.stop();
    die.play();
    gamestate = "end";
  }
  //Adding functions
  bullets();
  doors();
  coin();
  
  //Draw Sprites
  drawSprites();
}
  //game state END
  if(gamestate === "end") {
    stroke("red");
    fill("red");
    textSize(30);
    textFont("Creepster");
    text("GAME OVER", 225, 300);
  }
}

//Function Doors
function doors() {
  //door
  if(frameCount % 240 === 0 ) {
    door = createSprite(200, 50, 10, 10);
    door.x = random(120,400);
    door.velocityY = 1;
    door.addImage(doorImage);
    door.lifetime = 800;
    door.visible = false;
    
    //climber
    climber = createSprite (200, 10, 10, 10);
  climber.addImage(climberImage);
    door.x = climber.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    //ghost
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    //invisible block
    invisibleblock = createSprite(200, 15);
    invisibleblock.width= climber.width;
  invisibleblock.height = 2;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 1;
    invisibleblock.visible = false;
    
    
    
    //adding groups
    invisibleBlockGroup.add(invisibleblock);
    doorGroup.add(door);
    climberGroup.add(climber);
    
  }
}

function coin() {
  //coins
  if(frameCount % 200 === 0) {
    
    //coin
    coins = createSprite (200, 15);
    coins.x = random(100,500);
    coins.addImage(coinsImage);
    coins.lifetime = 800;
    coins.velocityY = 1;
    coins.scale = 0.5;
    coinsGroup.add(coins);
  
  }
}

function bullets() {
  //bullets
  if(frameCount % 200 === 0) {
    
    //bullet
    bullet = createSprite (200, 90);
    bullet.x = random(100,500);
    bullet.addImage(bulletBillImg);
    bullet.lifetime = 1000;
    bullet.velocityY = 4;
    bullet.scale = 0.5;
    bulletBillGroup.add(bullet);
    bulletbill.play();
  }
}