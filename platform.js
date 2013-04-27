var maxUpHeight =180;
var minUpHeight = 100;
var maxWidth = 100;
var minWidth = 40;

Platform = Class.create(Sprite,{
      initialize:function(x,y,width){
         Sprite.call(this,width,50);
         this.image = game.assets['platform.png'];
         this.x=x;
         this.globalY=y;
         this.y=y;
      },
      onenterframe:function(){
         if (this.intersect(player)) {
         
            if(player.bounce==true && player.vel.y < 0){

               player.vel.y = 20;
            }
            else if(player.bounce == false){

               player.vel.y=0;
               player.globalY = this.globalY - player.height;
            }
         }
        this.y=this.globalY-camera.globalY;
        if(this.globalY > (camera.globalY+gameHeight))
        {
            game.rootScene.removeChild(this);
        }
      }


   });

function createUpPlatforms(blockHeight){
   width = 100;
   p = new Platform(Math.random()*(gameWidth-width),(blockHeight-(Math.random()*(maxUpHeight-minUpHeight)+minUpHeight)),width);
   game.rootScene.addChild(p);
   console.log(p.globalY);
   return p.globalY;
}
