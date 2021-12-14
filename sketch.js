var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1.7;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  invisibleBlockGroup = new Group();

}

function draw() {
  background("black");
  if (gameState == "play") {
    playermovement();
    if (tower.y > 400) {
      tower.y = 300
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;

    }
    if (ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)) {
      ghost.destroy();
      gameState = "end"
    }

    spawndoors();
    drawSprites();

  }
  if (gameState == "end") {
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230, 250);

  }

}

function playermovement() {
  if (keyDown("left") || keyDown("a")) {
    ghost.x = ghost.x - 5;
  }
  if (keyDown("right") || keyDown("d")) {
    ghost.x += 5;
  }
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.5
}

function spawndoors() {
  if (frameCount % 100 === 0) {
    var door = createSprite(300, -50);
    var climber = createSprite(300, 15);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    door.x = Math.round(random(90, 500));
    invisibleBlock.x = door.x;
    climber.x = door.x;
    door.addImage(doorImg)
    climber.addImage(climberImg);
    door.lifetime = 360;
    climber.lifetime = door.lifetime;
    invisibleBlock.lifetime = door.lifetime;
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
