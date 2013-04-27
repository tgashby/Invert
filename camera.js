var gameStateUp = true;
var maxCamY = 100;
var camOffset=60;
Camera = Class.create({
   initialize: function(player){
      this.player = player;
      this.globalY = 0;
      this.peakY = player.globalY;

   },

   update:function(){
      if(gameStateUp)
      {
         if(this.peakY > player.globalY)
         {
            console.log(this.peakY + ":"+player.globalY)
            this.peakY = player.globalY;

         }
        
         if((this.peakY - this.globalY) < (maxCamY)){
            this.globalY += (this.globalY-maxCamY)/60;
          //  console.log("Im in ur thingy");
         }
      }
         

      

  } 

});
