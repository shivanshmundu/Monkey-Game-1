var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var jumpingSound, losegameImg, losegame,playagainImg,playagain;
var eatSound;
var collisionSound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var Survival;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpingSound=loadSound("monkeyjumping.wav")
  eatSound=loadSound("eatingbanana.wav")
  collisionSound=loadSound("collision.flac")
  losegameImg=loadImage("losegame.png")
  playagainImg=loadImage("playagain.png")
}



function setup() {
  createCanvas(700,440);
  
  monkey = createSprite(80,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;
  
  losegameImage = createSprite(350,150);
  losegameImage.addImage(losegameImg);
  losegameImage.scale = 0.1;
  losegameImage.visible = false;
  
  playagainImage = createSprite(350,200);
  playagainImage.addImage(playagainImg);
  playagainImage.scale = 0.4;
  playagainImage.visible = false;
  
  ground = createSprite(400,350,1300,10);
  
  score=0;
  Survival=0;
  
  obstacleGroup=createGroup();
  FoodGroup= createGroup();
}


function draw() {
  background("lightblue");
  textSize(20)
  stroke("green");
  text("Score: "+ score, 500,50);
  text("Survival: "+ Survival, 100,50);
  
  //Survival.scale = 0.5
  
 if(gameState===PLAY){
    //losegameImg.visble = true;
    
  
       monkey.collide(ground);
   
    objects();
    food();
    ground.velocityX = -(4 + 3* score/100)
    Survival=Math.round(frameCount/frameRate())
   score = score + Math.round(getFrameRate()/50);
   if(score>0 && score%100 === 0){
        
    }
   
   ground.velocityX=-10;
   if(ground.x<0){
     ground.x=ground.width/2;
     
   }
   
   if(keyDown("space")&& monkey.y>=298.95){
     monkey.velocityY=-15;
     jumpingSound.play();
   }
   monkey.velocityY=monkey.velocityY+0.8;
  console.log(monkey.y);
   
   if(monkey.isTouching(FoodGroup)){
     eatSound.play();
     score=score+2;
     FoodGroup.destroyEach();
   }
   else if(monkey.isTouching(obstacleGroup)){
     collisionSound.play();
     losegameImage.addImage(losegameImg);
     losegameImage.scale = 0.1;

     gameState=0; 
     

   }

 }
  if(gameState=== END){
    
     obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    ground.velocityX = 0;
    monkey.velocityY=0;
    
    
    losegameImage.visible = true;
   playagainImage.visible = true;    
    if(mousePressedOver(playagainImage)) {  
  reset();
  }
  }
  
  
  
   drawSprites();
} 
  function reset(){
  gameState =   PLAY 
  losegameImage.visible = false;
  playagainImage.visible = false;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  monkey.changeAnimation("moving",monkey_running);
  
  
  stroke("grey");
 textSize(40);
  strokeWeight(2);
  text("score"+score,40,40);
 //  text(mouseX+" , "+mouseY,200,200);
    text("Survival Time "+Survival,340,40);
  }  
 


function food(){
  if(frameCount%80===0){
    var banana = createSprite(700,Math.round(random(110,230)),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-10-score/110;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}
function objects(){
  if(frameCount%180===0){
    var obstacle=createSprite(700,315,20,20)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.18;
    obstacle.velocityX=-10-score/110 ;
    obstacleGroup.add(obstacle);
  }
}




