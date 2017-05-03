/*
Level module
Dependency: null
*/
define(['module/Global'], function(Global){

    //Private variables
    var game = null;

    var Player = function(){
        var sprite; 
        var id ; 

        sprite = game.add.sprite(0,0 , 'dot');
        sprite.anchor.setTo(0.5, 0.5);

        this.setId = function(_id){
            id = _id; 
        }
        this.update = function(x, y){
            sprite.x = x;
            sprite.y = y;
        }
        this.move = function() {
            sprite.x = game.input.x; 
            sprite.y = game.input.y;
        }
        this.destroy = function(){
            sprite.destroy();
            console.log("Destroying player ",  id);

            delete Global.players[id]; 
        }

        this.properties = function(){
            return {
                id: id,
                x: sprite.x, 
                y: sprite.y
            }
        }
    }
    //Public functions
    return{
        init: function() {
            game = Global.game;
        },
        preload: function() {
          game.load.image('dot', 'assets/img/dot.png');
        },
        create: function() { },
        update: function() { },
    
        new: function(){

            var player = new Player();
            return player;
        },
    };
});
