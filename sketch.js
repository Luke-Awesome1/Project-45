var robot,rock,score,bullet;
var rockG, bulletG;
var gameState=0;
var gameOver;
var robotImg,rockImg,bulletImg;

function preload(){
  robotImg=loadImage("robot.png");
  rockImg=loadImage("rockImg.png");
  bulletImg=loadImage("bullet.png");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-115);
  robot=createSprite(displayWidth/7, 200, 70, 70);
  robot.addImage(robotImg);
  robot.scale=0.4;
  score=0;
  rockG=createGroup();
  bulletG=createGroup();
  //robot.debug=true;
  robot.setCollider("rectangle",0,0,370,430)



}

function draw() {
  background("green");  

  if (gameState===0) {

    if (keyWentDown("SPACE")) {
      spawnBullet();
    }

    if (keyDown("UP_ARROW") && robot.y>(50)) {
      robot.y = robot.y-10; 
    }

    if (keyDown("DOWN_ARROW") && robot.y<(height-50)) {
      robot.y = robot.y+10; 
    }

    for (i=1;i<rockG.length;i++) {  
      if (rockG.get(i).isTouching(bulletG)) {
        bulletG.destroyEach();
        rockG.get(i).destroy();
        score+=1
      }
    }

    if (rockG.isTouching(robot)) {
      robot.destroy();
      score-=1;
      gameState=1;
    }
  }

  if (gameState===1) {
    gameOver.visible=true;
  }

  fill("white");
  textSize(20);
  text("Score: "+score,width-150,50);

  spawnRock();

  drawSprites();
}

function spawnBullet() {
  var bullet = createSprite(100,100,60,10);
  bullet.addImage(bulletImg);
  bullet.x = robot.x+85;
  bullet.y = robot.y+25;
  bullet.velocityX = 5;
  bullet.lifetime = width/bullet.velocityX;
  bulletG.add(bullet)
  //bullet.debug=true;
  bullet.scale = 0.1;
  bullet.setCollider("rectangle",0,0,600,200)
}

function spawnRock() {
  if (frameCount%60 === 0) {
    var rock = createSprite(width,100,40,40);
    rock.scale = 0.17;
    rock.addImage(rockImg);
    rock.y = random(50,displayHeight-50);
    rock.velocityX = -5;
    rock.lifetime = [width/(-rock.velocityX)];
    rockG.add(rock);
    //rock.debug = true;
    rock.setCollider("rectangle",0,0,900,900)
  }
}