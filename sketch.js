var path,mainCyclist,player,player1;
var pathImg,mainRacerImg1,mainRacerImg2, oppPinkBiker,oppRedBiker;   //i can't load the code ;-;

var pinkCG,redCG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var index = 0;
var bellSound;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  //the others
  oppPinkBiker = loadAnimation("opponent1.png","opponent2.png");
  
  oppRedBiker = loadAnimation("opponent7.png","opponent8.png");
    //sounds
   bellSound=loadSound("sound/bell.mp3");
  
}

function setup(){
  
createCanvas(10000,300);
  
// Moving background
path=createSprite(1000,150);
path.addImage(pathImg);
path.velocityX = 0;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
    
   //creating groups
  pinkCG = createGroup();
  redCG = createGroup();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,mainCyclist.position.x+400,30);
  
  if(gameState===PLAY){
        //movements
         if(keyIsDown(UP_ARROW)){
           camera.position.x +=8;
           mainCyclist.position.x +=8;
           }
   mainCyclist.y = World.mouseY;
    
          //the score
     distance = distance + Math.round(getFrameRate()/60);
    
            //the bell sound
     if(distance>0 && distance%100 === 0){
           bellSound.play() 
      }
          //the other stuff
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
       var select_oppPlayer = Math.round(random(1,3));
    //pick cycle people
    if(World.frameCount % 80 == 0){
      if(select_oppPlayer == 1){
        pinkBiker();
      } else{
        redBiker();
      }
    }
      //code to reset the background
  if(path.x < 0 ){
    path.x = width/1.5;
  }  
    if(pinkCG.isTouching(mainCyclist)||(redCG.isTouching(mainCyclist))){
      textSize(20);
      text("you Lose"+404,mainCyclist.x+500,150);
      gameState = END;
      console.log("Lose");
    }
    if(mainCyclist.x > 1500){
      text("you WIN",1500,150);
      console.log("WIN");
      gameState = END;
      }
 }
      //the end
  if(gameState===END){
    path.velocityX=0;
    
  }
}
function pinkBiker(){
  player = createSprite(mainCyclist.position.x+500,Math.round(random(50,250),10,10));
  player.scale=0.06;
  player.addAnimation("opponent",oppPinkBiker);
  player.setLifetime=170;
  player.velocityX = 0;
  pinkCG.add(player);
  
}
function redBiker(){
  player1 = createSprite(mainCyclist.position.x+500,Math.round(random(50,250),10,10));
  player1.scale=0.06;
  player1.addAnimation("opponent",oppRedBiker);
  player1.setLifetime=170;
  player1.velocityX= 0;
  redCG.add(player1);
}

