var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var invisibleClimber, invisibleclimbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
   
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,0);
  ocean.addImage("ocean",oceanImg);
  ocean.scale = 2;
  ocean.velocityY = 1;

  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  climbersGroup = new Group();
  invisibleclimbersGroup = new Group();
  coinGroup = new Group();

}

function draw(){
  background(0);
  
  
console.log(ocean.y)  
  
if (gameState === "play") {
  drawSprites();
  fill("white");
  textSize(16);
  text("score: " + score,260, 20);
  //infinte background
    if(ocean.y >600){
    ocean.y = 0;
  }

  //movement of frog
  if(keyDown("space")){
    frog.velocityY = frog.velocityY - 2;
  }
  frog.velocityY = frog.velocityY + 0.4;

  if(keyDown("left")){
    frog.x = frog.x - 5;
  }
  if(keyDown("right")){
    frog.x = frog.x + 5;
  }

  if(frog.isTouching(invisibleclimbersGroup)){
    frog.velocityY = 0; 
  }

  if(frog.isTouching(coinGroup)){
    score = score + 1;
    coinGroup.destroyEach();
  }

  spawnClimber(); 
  spawnCoin(); 

  // changing gamestate
  if(frog.y > 450){
    gameState ="end";
  }

  }
  
  if (gameState === "end"){
    fill("YELLOW");
    textSize(25);
    text("GAME OVER",200, 200); 
    score = 0;   
    coinGroup.destroyEach();
    invisibleclimbersGroup.destroyEach();
    climbersGroup.destroyEach();
  }

}

// create the coin and climber in the same function

function spawnClimber() {
  
  if (frameCount % 280 === 0) {
    climber = createSprite(100,0,10,10);
    climber.velocityY = 1;
    climber.x = Math.round(random(50, 350));
    climber.addImage(climberImg);
    climber.scale = 0.5;

    invisibleclimber = createSprite(100,0,10,10);
    invisibleclimber.velocityY = 1;
    invisibleclimber.x = climber.x;
    invisibleclimber.width = climber.width/2;
    invisibleclimber.height = 5;
    invisibleclimber.visible = false;
   

    climber.depth = frog.depth;
    frog.depth = frog.depth + 1;

    climbersGroup.add(climber);
    invisibleclimbersGroup.add(invisibleclimber)
  }
}

function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    coin = createSprite(100,-60,5,5);
    coin.addImage(coinImg);
    coin.velocityY = 1;
    coin.x = climber.x;
    coin.scale = 0.10;

    coinGroup.add(coin);
  }
}
