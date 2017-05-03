/*
New object module
Dependencys: null
*/
define(['module/Global', 'module/Player', 'module/Websocket'], function(Global, Player, Websocket) {

    //Private variables
    var game = null;

    //public functions
    var myPlayer; 

    return{
        init: function() {
            game = Global.game;
            Player.init();
        },
        preload: function() {
            Player.preload();
        },
        create: function() {
            Player.create();
            Websocket.create();

            myPlayer = Player.new();
            Global.player = myPlayer; 
            Websocket.start(); 
        },
        update: function(){
            Player.update();
            Websocket.update();

            myPlayer.move();
        },
        render: function(){
        }

    };
});
