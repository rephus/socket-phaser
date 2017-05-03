## Phaser with Socket.io

    This is a work in progress
    
This is a sample of a game using websockets (Socket.io) and Phaser.io HTML5 game framework.

How it works: 

When the game start, your player is created, connects to a websocket (server) and transmits the position of your player everytime it moves (10ms interval).

That position will be sent as well to all other players connected, which will (in the client side) check if they have a player indexed, if not it will create a new player object, and update its position.

If a player disconnects, a "disconnect player" message will be broadcasted to all players so they can remove theirs from the game.

## How to use 

- Run websocket server running on node by doing 
```
cd server
npm install
node app.js
```
- Run web client, using your favourite web server, like nxing. We suggest using python SimpleHTTPServer, just run
```
cd web
python -m SimpleHTTPServer 8000
```

- Open localhost:8000 on 2 different browsers

Move the cursor around, you should see the object moving in another screen