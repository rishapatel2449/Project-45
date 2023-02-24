var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombies,zombiesImg
var bullet,bulletImg
var bulletGroup
var zombieGroup
var score=0
var gameState= "PLAY"
var END

var bullets =-10
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombiesImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/bullet.png")

  bgImg = loadImage("assets/bg.jpeg")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bulletGroup=new Group()
   zombieGroup= new Group ()

  
  


}

function draw() {
  background(0); 
 if (gameState==='PLAY'){
 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullets+=1
  player.addImage(shooter_shooting)
  spawnBullet()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (zombieGroup.isTouching(bulletGroup)){
  for (var i =0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(bulletGroup)){
      score+=5
      
zombieGroup[i].destroy()
bulletGroup.destroyEach()

}
}
}

if (zombieGroup.isTouching(player)){
  gameState = "END"
  player.destroy()
  zombieGroup.setVelocityXEach(0)
  zombieGroup.destroyEach()

}
if (bullets===0){
  textSize(50)
  fill("white")
  text("You Lost.Bullets Are Over",400,400 )
  gameState="END"
}

spawnZombies()
drawSprites();
textSize(50)
fill ("red")
text ('Score'+score,displayWidth-1300, displayHeight/6)
text ('Bullets'+bullets,displayWidth-1000, displayHeight/6)

}
 if (gameState==="END"){
  textSize(50)
fill ("white")
text ('You Lost',400,400)

 }


}
function spawnZombies() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    zombie = createSprite(displayWidth-200, displayHeight-500, 50, 50);
    zombie.addImage(zombiesImg)
    zombie.y = Math.round(random(200,500))
    zombie.scale = 0.2;
    zombie.velocityX = -5;
    zombie.lifetime = 200
zombieGroup.add(zombie)
    //adjust the depth
   
    }
}
function spawnBullet(){
  bullet = createSprite(displayWidth-1150, displayHeight-325, 5, 5)
  bullet.addImage(bulletImg)
  bullet.scale=0.1
  
  bullet.x=player.x
  bullet.y=player.y
  bullet.velocityX=7
 // bullet-=1


  bulletGroup.add(bullet)
  
}