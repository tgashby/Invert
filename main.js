enchant();
var game;
var gameWidth = 500;
var gameHeight = 500;
var player;
var upBlockHeight = 400;
var downBlockHeight = 500;
var assets = ['player.png', 'platform.png',
   'backgroundCube.png', 'CutRunDownLoop.ogg',
   'CutRunLoop.ogg', 'CutRunTransition.ogg'];

window.onload = function() {
   game = new Game(gameWidth, gameHeight);
   game.preload(assets);

   game.onload = function() {
      game.fps = 120;
      game.flipTimer = 0;
      
      // Start the game with bouncing upwards
      game.gameStateUp = true;
      game.rootScene.addChild(new Platform(0, gameHeight - 100, gameWidth));

      game.keybind(65, 'left');
      game.keybind(68, 'right');
      game.keybind(87, 'up');
      game.keybind(83, 'down');

      player = new Player();
      camera = new Camera();

      game.rootScene.addChild(player);

      game.rootScene.addEventListener('enterframe', function(e) {
         camera.update();

         if (Math.random() * 1000 < 30) 
            game.rootScene.addChild(new Rotating(game.gameStateUp));
         
         if (game.gameStateUp) {
            while (upBlockHeight - (camera.globalY - 80) > 0) {
               upBlockHeight = createUpPlatforms(upBlockHeight);
               //console.log(upBlockHeight);
            }
         } else {
            //console.log("Hoiii");
            while ((camera.globalY + 120 + gameHeight) > (downBlockHeight)) {
               downBlockHeight = createDownPlatforms(downBlockHeight);
               // console.log(downBlockHeight);
            }
         }

         game.flipTimer++;
         if (game.flipTimer > 360) {
            game.gameStateUp = !game.gameStateUp;
            game.flipTimer = 0;
            player.onFlip();
            camera.onFlip();

            if (game.gameStateUp) {
               game.rootScene.addChild(new Platform(0, gameHeight - 100, gameWidth));
            }
         };
      });

      game.bgm = game.assets['CutRunLoop.ogg'];
      game.bgm._element.loop = true;

      game.bgm.play();
   }

   game.start();
}