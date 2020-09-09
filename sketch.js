
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = 0
var PLAY = 0
var END = 1
var bscore = 0

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  var survivalTime=0;
     monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
   
  drawSprites();
  background(255);
  if(gameState === PLAY){
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space")&& monkey.y>290 ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  drawSprites();
    if(FoodGroup.isTouching(monkey)){
      bscore = bscore+1
      FoodGroup.destroyEach()
    }
  stroke("black");
  textSize(20);
  fill("black");
  score = score + Math.round(getFrameRate()/60);
  text("Survival Time: "+ score, 100,50);
  text("Bannanas Collected: "+ bscore, 100,100);
  if(obstaclesGroup.isTouching(monkey)){
       gameState = END
    }
}
if(gameState ===END){
   drawSprites(); 
  ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ score, 100,50);
  monkey.visible= false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  textSize(20);
  text("Game Over",100,150)
  text("Bannanas Collected: "+ bscore, 100,100);
}
}



function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(220,300);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.13;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
