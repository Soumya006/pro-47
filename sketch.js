var backgroundImg,trainImg,trackImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle;
var score=0;

function preload(){
    backgroundImg=loadImage('images/background.jpg');
    trainImg=loadImage('images/train.png');
    trackImg=loadImage('images/track.png');
    treeImg=loadImage('images/tree.png');
    tree1Img=loadImage('images/tree1.png');
    tree2Img=loadImage('images/tree2.png');
    tree3Img=loadImage('images/tree3.png');
    tree4Img=loadImage('images/tree4.png');
    houseImg=loadImage('images/house.png');
    obstacle1Img=loadImage('images/obstacle1.png');
    obstacle2Img=loadImage('images/ok.png');
    obstacle3Img=loadImage('images/obstacle3.png');
    obstacle4Img=loadImage('images/obstacle4.png');
    gameoverImg=loadImage('images/gameover.png');
    resetImg=loadImage('images/reset.png');
    coinImg=loadImage('images/coin.png');
    gameoverSound=loadSound('images/gameover.wav');
    trackSound=loadSound('images/trackchange.wav');
    scoreSound=loadSound('images/score.wav');
}

function setup(){
    createCanvas(displayWidth,displayHeight); 

   background1=createSprite(displayWidth/2,displayHeight/2,10,10);
   background1.addImage("backgroundImg",backgroundImg);
   background1.scale=6;

   track1=createSprite(displayWidth-1000,300,100,100);
   track1.addImage("track",trackImg);
   track1.scale=3;
   
   track3=createSprite(displayWidth-400,300,100,100);
   track3.addImage("track",trackImg);
   track3.scale=3;
   
   track2=createSprite(displayWidth-700,300,100,100);
   track2.addImage("track",trackImg);
   track2.scale=3;

   train=createSprite(370,530,50,50);
   train.shapeColor = "blue";
   train.addImage("train",trainImg);
   train.scale=1.3;
   
  reset=createSprite(700,480,10,10);
  reset.addImage("reset",resetImg);
  reset.scale=0.5;

  gameOver=createSprite(700,300,10,10);
   gameOver.addImage("gameover",gameoverImg);
   gameOver.scale=0.75;
  
   obstaclesGroup = new Group();
  extrasGroup = new Group();

}

function draw(){

background("white");

if(gameState===PLAY){

  score = score + Math.round(getFrameRate()/60);
  
  gameOver.visible=false;
  reset.visible=false;

    background1.velocityY=3;
    track1.velocityY=3;
    track2.velocityY=3;
    track3.velocityY=3;

    if(background1.y > 450 ){
        background1.y = 400;
      }

      if(track1.y > 450 ){
        track1.y = 400;
      }

      if(track2.y > 450 ){
        track2.y = 400;
      }

      if(track3.y > 450 ){
        track3.y = 400;
      }

      if(mousePressedOver(track2)){
        train.x=displayWidth-700;
        trackSound.play();
      }

      if(mousePressedOver(track3)){
        train.x=displayWidth-400;
        trackSound.play();
      }
      
      if(mousePressedOver(track1)){
        train.x=displayWidth-1000;
        trackSound.play();
      }

}

if(gameState===END){
  background1.velocityY=0;
  track1.velocityY=0;
  track2.velocityY=0;
  track3.velocityY=0;
  obstaclesGroup.setVelocityYEach(0);
  extrasGroup.setVelocityYEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  extrasGroup.setLifetimeEach(-1);
  gameOver.visible=true;
  reset.visible=true;
}

if(obstaclesGroup.isTouching(train)){
  gameState=END;
 // gameoverSound.play();
}

if(mousePressedOver(reset)){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  extrasGroup.destroyEach();
  score=0;
};

spawnExtras();
spawnExtra();
spawnObstacles();
spawnObstacles1();
spawnObstacles2();

drawSprites();
textSize(30);
fill("black");
strokeWeight(3);
text("Score: "+ score, 100,50 );
}

function spawnExtras() {
  if(frameCount % 200 === 0) {
    var extra = createSprite(150,-70,10,40);
    //obstacle.debug = true;
    extra.velocityY = 3;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: extra.addImage(treeImg);
      extra.scale=0.75;
              break;
      case 2: extra.addImage(tree1Img);
              break;
      case 3: extra.addImage(tree2Img);
              break;
      case 4: extra.addImage(tree3Img);
      extra.scale=0.75;
              break;
      default: break;
    }
    extrasGroup.add(extra);
    extrasGroup.setLifetimeEach(displayHeight/3);
  }
}

function spawnExtra() {
  if(frameCount % 155 === 0) {
    var extra = createSprite(1200,-70,10,40);
    //obstacle.debug = true;
    extra.velocityY = 3;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: extra.addImage(treeImg);
      extra.scale=0.75;
              break;
      case 2: extra.addImage(tree1Img);
              break;
      case 3: extra.addImage(houseImg);
      extra.scale=0.65
              break;
      case 4: extra.addImage(tree4Img);
      extra.scale=0.65
              break;
      default: break;
    }
    extrasGroup.add(extra);
    extrasGroup.setLifetimeEach(displayHeight/3);
  }
}

function spawnObstacles() {
  if(frameCount % 430 === 0) {
    var obstacle = createSprite(displayWidth-1000,-50,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = 3;

    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
      obstacle.scale=0.50;
              break;
      case 2: obstacle.addImage(obstacle2Img);
      obstacle.scale=0.50;
              break;
      case 3: obstacle.addImage(obstacle3Img);
      obstacle.scale=0.70;
              break;
      case 4: obstacle.addImage(obstacle4Img);
      obstacle.scale=0.25;
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle);
    obstaclesGroup.setLifetimeEach(displayHeight/3);
  }
}

function spawnObstacles1() {
  if(frameCount % 650 === 0) {
    var obstacle1 = createSprite(displayWidth-700,-50,10,40);
    //obstacle.debug = true;
    obstacle1.velocityY = 3;

    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle1.addImage(obstacle1Img);
      obstacle1.scale=0.50;
              break;
      case 2: obstacle1.addImage(obstacle2Img);
      obstacle1.scale=0.50;
              break;
      case 3: obstacle1.addImage(obstacle3Img);
      obstacle1.scale=0.70;
              break;
      case 4: obstacle1.addImage(obstacle4Img);
      obstacle1.scale=0.25;
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle1);
    obstaclesGroup.setLifetimeEach(displayHeight/3);

  }
}

function spawnObstacles2() {
  if(frameCount % 870 === 0) {
    var obstacle2 = createSprite(displayWidth-400,-50,10,40);
    //obstacle.debug = true;
    obstacle2.velocityY = 3;

    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle2.addImage(obstacle1Img);
      obstacle2.scale=0.50;
              break;
      case 2: obstacle2.addImage(obstacle3Img);
      obstacle2.scale=0.50;
              break;
      case 3: obstacle2.addImage(obstacle3Img);
      obstacle2.scale=0.70;
              break;
      case 4: obstacle2.addImage(obstacle4Img);
      obstacle2.scale=0.25;
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle2);
    obstaclesGroup.setLifetimeEach(displayHeight/3);

  }
}



function isTouching(object1,object2){
   if (object1.x - object2.x < object2.width/2 + object1.width/2 && object2.x - object1.x < object2.width/2 + object1.width/2 && object1.y - object2.y < object2.height/2 + object1.height/2 && object2.y - object2.y < object2.height/2 + object1.height/2) 
   { return true; } 
   else 
   { return false; }
}

