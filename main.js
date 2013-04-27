enchant();
var game;
var gameWidth = 500;
var gameHeight = 500;
var gravity = 1;
var player;

Platform = Class.create(Sprite, {
   initialize: function(x, xtwo) {
      if (x == 0) {
         this.length_rectangle = gameWidth*Math.random();
         while (this.length_rectangle == 0)
            this.length_rectangle = gameWidth*Math.random();
         if (this.length_rectangle > gameWidth - player.width/2)
            this.length_rectangle = gameWidth - player.width/2;
         if (this.length_rectangle < player.width)
            this.length_rectangle = player.width+1;
         this.length_rectangle -= player.width;
         x = this.length_rectangle;
      }
      Sprite.call(this, x, 50);
      this.image = game.assets['platform.png'];
      this.x = xtwo;

      this.y = gameHeight - 50;
      this.globalY=this.y; 
   },
    onenterframe: function() {
      if (this.intersect(player)) {
         player.globalY = this.globalY - player.height;
         player.vel.y = 20;
       
      }
        this.y=this.globalY-camera.globalY;
   }
});
Player = Class.create(Sprite, {
	initialize: function () {
		Sprite.call(this, 50, 50);
		this.image = game.assets['player.png'];
		this.x = gameWidth / 2 - this.width / 2;
		this.y = gameHeight - this.height * 2;
      
      this.globalY = this.y;
		this.vel = {x:5, y:25};
	},

	onenterframe: function() {
		this.globalY -= this.vel.y;

		this.vel.y -= gravity;

		if (game.input.left)
			this.x -= this.vel.x;

		if (game.input.right)
			this.x += this.vel.x;
	  this.y = this.globalY-camera.globalY;
   }
});


window.onload = function() {
    game = new Game(gameWidth, gameHeight);
    game.preload('player.png', 'platform.png');
    game.onload = function() {
      game.fps=120;
    	game.keybind(65, 'left');
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');

    	player = new Player();
      camera = new Camera(player);
    	game.rootScene.addChild(player);
      game.rootScene.addEventListener('enterframe',function(e){
         camera.update();
      });
     var plat1 = new Platform(0, 0);
        game.rootScene.addChild(plat1);

        var plat2 = new Platform(gameWidth - plat1.length_rectangle - (3*player.width)/2,
         plat1.length_rectangle + (3*player.width)/2 + Math.random()*40);
        game.rootScene.addChild(plat2);

    }
    game.start();
}