var background1,background_1,ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var gameState = PLAY;
var PLAY=1;
var end=0;
function preload(){
  
background_1=loadImage("jungle.jpg") ; 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  //creating monkey
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving" ,monkey_running)
monkey.scale=0.1;
  //creating background
background1=createSprite(400,350,900,10);
 background1.velocitX=-4;
background1.x=background1.width/2;
  background1.addImage(background_1);
  //ground
  ground=createSprite(400,350,900,10);
  ground.velocitX=-4;
  console.log(ground.x);
  //creating banana
  obstacle=createSprite(300,310,70,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  //background
bananaGroup=createGroup();
  
  obstacleGroup=createGroup();
}
  var score=0;


function draw() {
   stroke("white");
  textSize(20);
  fill("white")
  text("Score"+score,500,50);
  
  stroke("black");
  textSize(30);
  fill("black");
  score=Math.ceil(frameCount/frameRate());
  text("Score:"+score,100,50);
 
  if (gameState  === PLAY){
    
       ground.velocityX = -(4 + 3* score/100)
    //scoring
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
 
  }
  if (background.x < 0){
      background.x = background.width/2;
  }
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -9;}
  
       monkey.velocityY=monkey.velocityY+0.5;
        monkey.collide(ground)   
   
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
}   
  
spawnObstacles();
spawnbanana();
drawSprites();
  
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   obstacle.lifetime=300;
   obstacle.scale=0.15;  
   obstacleGroup.add(obstacle)
    }
        
}
function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

