var maxUpHeight = 180;
var minUpHeight = 100;
var maxWidth = 100;
var minWidth = 40;
var downWidthMax = 300;
var gapSpaceMax = 100;
var gapSpaceMin = 100;
var maxDownHeight = 160;
var minDownHeight = 100;

Platform = Class.create(Sprite, {
   initialize: function(x, y, width, upPlatform) {
      Sprite.call(this, width, 50);
      this.platWidth = width;
      this.image = game.assets['platform.png'];
      this.x = x;
      this.globalY = y;
      this.y = y;
      this.isUpPlatform = (typeof upPlatform === 'undefined') ? true : upPlatform;

      this.addEventListener('added', function (e) {
         if(this.isUpPlatform === true){
            platforms.push(this);
         }
      });
   },

   onenterframe: function() {
      if (this.intersect(player)) {
         if (player.bounce === true && player.vel.y < 0) {
            player.vel.y = 20;
         } else if (player.bounce === false) {
            player.vel.y = 0;
            player.globalY = this.globalY - player.height;
         }
      }
      
      this.y = this.globalY - camera.globalY;

// Leave this out!
      // if (this.globalY > (camera.globalY + gameHeight) && this.isUpPlatform === true) {
      //    game.rootScene.removeChild(this);
      // } else if (this.globalY + 50 < camera.globalY && this.isUpPlatform === false) {
      //    game.rootScene.removeChild(this);
      // }
   },
   switchSpaces:function(){
      pRow = new PlatformRow(this.globalY,this.x,this.width);
      //Add pRow to array
      //Remove from Platform array
      game.rootScene.removeChild(this);
   }
});

PlatformRow = Class.create({
   initialize: function(blockHeight,gapX,gapWidth) {
      this.gapX =gapX;
      this.gapX2 = gapWidth;
      this.p1 = new Platform(0, blockHeight, this.gapX, false);
      this.p2 = new Platform(this.gapX + this.gapX2, this.p1.globalY, gameWidth - (this.gapX + this.gapX2), false);
      game.rootScene.addChild(this.p1);
      game.rootScene.addChild(this.p2);
      // console.log("Added plats");
      this.globalY = this.p1.globalY;
      platformRows.push(this);

   },
   onenterframe: function() {
      //console.log(globalY);
      this.y = this.globalY - camera.globalY;
      /*
      if (this.globalY - 50 < camera.globalY) {
         game.rootScene.removeChild(this);
      */
   },
   
   switchSpaces: function() {
      plat = new Platform(this.gapX,this.globalY,(this.gapX2),true);
      console.log("Added platfrom at "+plat.globalY +"from "+this.globalY);
      game.rootScene.addChild(plat);
      //Add plat to array
      //Remove from PlatformRow array
      game.rootScene.removeChild(this.p1);
      game.rootScene.removeChild(this.p2);
      game.rootScene.removeChild(this);
   },
   removeSelf: function(){
      game.rootScene.removeChild(this.p1);
      game.rootScene.removeChild(this.p2);
      game.rootScene.removeChild(this);
   }
});

function createUpPlatforms(blockHeight) {
   width = 100;
   p = new Platform(Math.random() * (gameWidth - width), 
      (blockHeight - (Math.random() * (maxUpHeight - minUpHeight) + minUpHeight)), width, true);
   game.rootScene.addChild(p);
   //console.log(p.globalY);
   return p.globalY;
}

function createDownPlatforms(blockHeight) {
   pRow = new PlatformRow(blockHeight+(Math.random() * (maxDownHeight - minDownHeight) + minDownHeight),
                                       Math.random()*(gameWidth-downWidthMax),
                                       Math.random()*(gapSpaceMax-gapSpaceMin)+gapSpaceMin);
   return pRow.globalY;
}