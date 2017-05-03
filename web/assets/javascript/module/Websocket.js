
define(['module/Global', 'module/Player'], function (Global, Player) {

    console.log("Loading websocket");
    var socket = io('http://localhost:3000');

    var lastPlayerUpdate ; 

    // Done on broadcast, it won't be received by the person who 
    // updated the user on the first place
    socket.on('update player', function (data) {

        if (!Global.players[data.id]) {
            Global.players[data.id] =  Player.new();
            Global.players[data.id].setId(data.id);
        }
        //console.log("Updating remote player ",  data);
        Global.players[data.id].update(data.x, data.y);

    });

    //After being connected, receive a connected message with the socket.id
     socket.on('start', function (data) {
        Global.player.setId(data.id);
    });

    // When other players disconnect, we remove them from our list
     socket.on('disconnect player', function (data) {
        if (Global.players[data.id]) {
            Global.players[data.id].destroy();
            
            console.log("Total players " , Object.keys(Global.players).length);
        } // else nothing to remove 
     });
        
    return {
        preload: function () {
            console.log("websocket preload");
            Global.connected = socket.connected;
            Global.game.time.events.loop(5000, function () {
                Global.connected = socket.connected;
            });
        },

        create: function () {
            console.log("Start webscoket");
            var _this = this;

            // Update websocket on a 10ms interval
            Global.game.time.events.loop(10, _this.updateLevel);
        },
        update: function () {
        },

        start: function(){
           socket.emit('start player', Global.player.properties());
        },

        updateLevel: function () {
            // Only send position when it's updated
            var playerUpdate = JSON.stringify(Global.player.properties()); 
            if (playerUpdate !== lastPlayerUpdate){
                lastPlayerUpdate = playerUpdate;
                 socket.emit('update player', Global.player.properties());
            }
        }
    };
});
