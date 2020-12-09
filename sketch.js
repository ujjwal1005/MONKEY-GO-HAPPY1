  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  
  var survivalTime = 0;
  var score = 0;
  var jungle , backImg ;  

  //gameStates
  var PLAY = 1;
  var END =0;
  var gamestate =PLAY ;

  function preload(){

    monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png"         ,"sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

    backImg = loadImage("jungle.jpg");
  }

  function setup() {
  createCanvas(500,500);  

  monkey= createSprite(80,420,40,40);  
  monkey.addAnimation("running",monkey_running);  
  monkey.scale = 0.1;

  bananaGroup = new Group();  
  obstacleGroup=new Group();  

  jungle = createSprite(200,200,400,400);
  jungle.addAnimation(backImg);
    
    
  monkey.debug = false;

  score =0;
  }

  function draw() {
  background("lightblue");

  if(gamestate === PLAY){  

  stroke("black");
  textSize(18);
  fill("black");
  text("score: "+score,380,50);

  stroke("black");  
  textSize(18);  
  fill("black");  
  survivalTime = Math.ceil(frameCount/frameRate())  
  text("survival Time:"+survivalTime,180,50);  

      if (jungle.x < 0){
      jungle.velocityX = -4 ;  
      jungle.x = jungle.width/2;  
  } 
   bananaGroupFn();
   obstacleGroupFn();

   if(keyDown("space")){
      monkey.velocityY = -12;  
   }  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(jungle);  

   score = score + Math.round(getFrameRate()/60);
  }  

   if(gamestate === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0); 
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1); 
    bananaGroup.setLifetimeEach(-1);

    stroke("black");
    textSize(18);
    fill("black");
    text("*gameOver*",200,200);

     reset();
  }

  drawSprites();

  if(obstacleGroup.isTouching(monkey)){ 
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0); 
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1); 
  bananaGroup.setLifetimeEach(-1);

  gamestate = END;  
  }  
  }

  function reset(){

    amestate =PLAY
  }

  function bananaGroupFn(){
  //write code here to spawn the banana
   if (frameCount % 80 === 0) {
      banana = createSprite(200,200,15,10);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(120,200));
      banana.velocityX = -5;
      banana.lifetime = 50;

      banana.scale = 0.1;


      //add each banana to the group
      bananaGroup.add(banana);
    }   
  }
  function obstacleGroupFn() {
    if(frameCount % 100 === 0) {
      obstacle = createSprite(200,415,40,40);
      obstacle.addImage(obstacleImage);  
      obstacle.scale = 0.2;

      //generate random obstacles
      var rand = Math.round(random(1,2));

      //assign scale , velocity and lifetime to the obstacle 
      obstacle.velocityX = -5;
      obstacle.lifetime = 50;

      monkey.depth = obstacle.depth +1;

      //add each obstacle to the group
      obstacleGroup.add(obstacle);



    }
  }
