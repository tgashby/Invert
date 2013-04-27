var maxUpHeight = 180;
var minUpHeight = 100;
var maxWidth = 100;
var minWidth = 40;
var downWidthMax = 300;
var gapSpaceMax = 140;
var gapSpaceMin = 100;
var maxDownHeight = 160;
var minDownHeight = 100;
Platform = Class.create(Sprite, {
   initialize: function(x, y, width, upPlatform) {
      Sprite.call(this, width, 50);
      this.image = game.assets['platform.png'];
      this.x = x;
      this.globalY = y;
      this.y = y;
      this.isUpPlatform = upPlatform;

   },
   onenterframe: function() {
      if (this.intersect(player)) {

         if (player.bounce == true && player.vel.y < 0) {

            player.vel.y = 20;
         } else if (player.bounce == false) {

            player.vel.y = 0;
            player.globalY = this.globalY - player.height;
         }
      }
      this.y = this.globalY - camera.globalY;
      if (this.globalY > (camera.globalY + gameHeight) && this.isUpPlatform === true) {
         game.rootScene.removeChild(this);
      } else if (this.globalY + 50 < camera.globalY && this.isUpPlatform === false) {
         game.rootScene.removeChild(this);
      }
   }


});
PlatformRow = Class.create({
   initialize: function(blockHeight) {
      this.gapX = Math.random() * (gameWidth - downWidthMax);
      this.gapX2 = Math.random() * (gapSpaceMax - gapSpaceMin) + gapSpaceMin;
      this.p1 = new Platform(0, blockHeight + (Math.random() * (maxDownHeight - minDownHeight) + minDownHeight), this.gapX, false);
      this.p2 = new Platform(this.gapX + this.gapX2, this.p1.globalY, gameWidth - (this.gapX + this.gapX2), false);
      game.rootScene.addChild(this.p1);
      game.rootScene.addChild(this.p2);
      console.log("Added plats");
      this.globalY = this.p1.globalY;

   },
   onenterframe: function() {
      //console.log(globalY);
      this.y = this.globalY - camera.globalY;
      if (this.globalY - 50 < camera.globalY) {
         game.rootScene.removeChild(this);
      }
   }
});

function createUpPlatforms(blockHeight) {
   width = 100;
   p = new Platform(Math.random() * (gameWidth - width), (blockHeight - (Math.random() * (maxUpHeight - minUpHeight) + minUpHeight)), width, true);
   game.rootScene.addChild(p);
   //console.log(p.globalY);
   return p.globalY;
}

function createDownPlatforms(blockHeight) {
   pRow = new PlatformRow(blockHeight);
   return pRow.globalY;
}