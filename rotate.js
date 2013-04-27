var speed = 3;
var pic_size = 32;

Rotating = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, pic_size, pic_size);
      size = 12 + Math.random() * 20;
      //this.scale(1/size, 1/size);
      this.image = game.assets['backgroundCube.png'];
      this.x = Math.random() * (gameWidth - pic_size);
      this.globalY = this.y = (camera.globalY - 120);
   },

   onenterframe: function() {
      this.scaleY = Math.sin(this.age * .1);

      this.globalY += speed;
      this.y = this.globalY - camera.globalY;

      if (this.globalY > camera.globalY + gameHeight)
         game.rootScene.removeChild(this);
   }
});