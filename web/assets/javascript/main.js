/*
This is the main entry point of the game
Dependencys: phaser.min.js, Player.js, Level.js and HUD.js
We can use phaser.min with Phaser namespace
*/
requirejs(['module/Global', 'module/Level', 'module/Websocket'],
  function(Global, Level, Websocket){

    var config = {  forceSetTimeOut: true,
      renderer: Phaser.CANVAS,  //Phaser.AUTO,//
      width: 800,
      height: 600};

    var game = new Phaser.Game(config);
    Global.game = game;

    game.state.add('level', {
       preload: function(){
          Level.init(game);
          Level.preload();
       },
       create: function(){
              Level.create();
       } ,
       update: Level.update,
      render: Level.render,
    });
    
    game.state.start('level');

});
