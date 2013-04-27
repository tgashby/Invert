enchant();
var game;
var gameWidth = 500;
var gameHeight = 500;
var gravity = 1;
var player;


Player = Class.create(Sprite, {
	initialize: function () {
		Sprite.call(this, 50, 50);
		this.image = game.assets['player.png'];
		this.x = gameWidth / 2 - this.width / 2;
		this.y = gameHeight - this.height * 2;
		this.vel = {x:5, y:25};
	},

	onenterframe: function() {
		this.y -= this.vel.y;

		this.vel.y -= gravity;

		if (game.input.left)
			this.x -= this.vel.x;

		if (game.input.right)
			this.x += this.vel.x;
	}
});

Platform = Class.create(Sprite, {
	initialize: function (x, y) {
		Sprite.call(this, 100, 50);
		this.image = game.assets['platform.png'];
		this.x = x;
		this.y = y;
	},

	onenterframe: function () {
		if (this.intersect(player)) {
			player.y = this.y - player.height;
			player.vel.y = 20;
		}
	}
})

window.onload = function() {
    game = new Game(gameWidth, gameHeight);
    game.preload('player.png', 'platform.png');
    game.onload = function() {
    	game.keybind(65, 'left');
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');

    	player = new Player();
    	game.rootScene.addChild(player);

    	var platform = new Platform(gameWidth / 2 - 100 / 2, gameHeight - 50);
    	game.rootScene.addChild(platform);

    	var platform2 = new Platform(50, 200);
    	game.rootScene.addChild(platform2);

    }
    game.start();
}