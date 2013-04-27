var maxCamY = 200;
var camOffset = 60;
var scrollDownYOffset = 100;

Camera = Class.create({
   initialize: function() {
      this.globalY = 0;
      this.peakY = player.globalY;
      this.lowY = player.globalY;
      this.cameraScrollSpeed = 1;
   },

   update: function() {
      //console.log(this.globalY);
      if (game.gameStateUp) {
         // this.cameraScrollSpeed = 1;
         this.globalY -= this.cameraScrollSpeed;

         if (this.peakY > player.globalY) {
            //console.log(this.peakY + ":"+player.globalY)
            this.peakY = player.globalY;
         }

         if ((this.peakY - this.globalY) < (maxCamY)) {
            this.globalY += (((this.peakY - maxCamY)-this.globalY)/10);
            //  console.log("Im in ur thingy");
         }
      } 
      else {
         // this.cameraScrollSpeed = 3;

         if (this.lowY < player.globalY) //Remember inverted y
         {
            this.lowY = player.globalY;
         }

         //console.log((this.lowY-(this.globalY+(gameHeight-scrollDownYOffset))));
         this.globalY += this.cameraScrollSpeed;

         if ((this.lowY - (this.globalY + (gameHeight - scrollDownYOffset))) > 0) {
            //console.log("Hi!")
            this.globalY +=  ((this.lowY - (gameHeight - scrollDownYOffset)-this.globalY)/10);
         }
      }
   },
   
   onFlip: function () {
      if(!game.gameStateUp)
      {
         this.lowY = this.peakY;
      }
      else
      {
         this.peakY = this.lowY;
      }
      /*   
      this.globalY = 0;

      this.peakY = player.globalY;
      this.lowY = player.globalY;
      */
   },

   chill: function () {
      this.cameraScrollSpeed = 0;
   },

   stopChillin: function () {
      if (game.gameStateUp)
         camera.cameraScrollSpeed = 1;
      else
         camera.cameraScrollSpeed = 4.5;
   }
   

});