enchant();
var game;
var gameWidth = 500;
var gameHeight = 500;
var gravity = 1;
var player;
var upBlockHeight=400;
<<<<<<< HEAD
<<<<<<< HEAD
var downBlockHeight = 500;
var gameStateUp = false;
=======

var assets = ['player.png', 'platform.png', 
              'backgroundCube.png', 'CutRunDownLoop.ogg', 
              'CutRunLoop.ogg', 'CutRunTransition.ogg'];
>>>>>>> Added background music
=======
var assets = ['player.png', 'platform.png', 
              'backgroundCube.png', 'CutRunDownLoop.ogg', 
              'CutRunLoop.ogg', 'CutRunTransition.ogg'];
var downBlockHeight = 500;
var gameStateUp = false;
>>>>>>> Merge "Successful" player wrapping is causing issues.

Player = Class.create(Sprite, {
	initialize: function () {
		Sprite.call(this, 50, 50);
      this.bounce = false;
		this.image = game.assets['player.png'];
		this.x = gameWidth / 2 - this.width / 2;
		this.y = gameHeight - this.height * 2;
      
    this.globalY = this.y;
		this.vel = {x:10, y:25};
	},

	onenterframe: function() {
		this.globalY -= this.vel.y;
    this.vel.y -= gravity;
      
		if (game.input.left)
			this.x -= this.vel.x;

		if (game.input.right)
			this.x += this.vel.x;

	  this.y = this.globalY-camera.globalY;

    if (this.x + this.width < 0)
      this.x = gameWidth;

    if (this.x > gameWidth)
      this.x = 0 - this.width;
   }
});


window.onload = function() {
    game = new Game(gameWidth, gameHeight);
<<<<<<< HEAD
    game.preload('player.png', 'platform.png', 'backgroundCube.png' );
    game.onload = function() {
      game.fps=120;
    	game.keybind(65, 'left');
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');
      //game.rootScene.backgroundColor='black';
    	player = new Player()
=======
    game.preload(assets);

    game.onload = function() {
      game.fps=120;
    	game.keybind(65, 'left');
  		game.keybind(68, 'right');
  		game.keybind(87, 'up');
  		game.keybind(83, 'down');

    	player = new Player();
>>>>>>> Added background music
      camera = new Camera(player);

    	game.rootScene.addChild(player);
      game.rootScene.addChild(new Platform(0,gameHeight-100,gameWidth));

      game.rootScene.addEventListener('enterframe',function(e){
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Merge "Successful" player wrapping is causing issues.
         camera.update();
         if (Math.random() * 1000 < 30)
            game.rootScene.addChild(new Rotating());
         if(gameStateUp){

            while(upBlockHeight - (camera.globalY - 80) > 0){
                  upBlockHeight = createUpPlatforms(upBlockHeight); 
                  //console.log(upBlockHeight);
               }
            
<<<<<<< HEAD
         }
         else{
            //console.log("Hoiii");
            while((camera.globalY + 120 + gameHeight)>(downBlockHeight)){
              
               downBlockHeight = createDownPlatforms(downBlockHeight);
               console.log(downBlockHeight);
            } 
      }
      
=======
        camera.update();
        if (Math.random() * 1000 < 10)
           game.rootScene.addChild(new Rotating());

        while(upBlockHeight - (camera.globalY - 80) > 0){
            upBlockHeight = createUpPlatforms(upBlockHeight); 
            //console.log(upBlockHeight);
         }
>>>>>>> Added background music
=======
         }
         else{
            //console.log("Hoiii");
            while((camera.globalY + 120 + gameHeight)>(downBlockHeight)){
              
               downBlockHeight = createDownPlatforms(downBlockHeight);
               console.log(downBlockHeight);
            } 
      }
      
>>>>>>> Merge "Successful" player wrapping is causing issues.
      });

      game.bgm = game.assets['CutRunLoop.ogg'];
      game.bgm._element.loop = true;
        
      game.bgm.play();
    }

    game.start();
}
