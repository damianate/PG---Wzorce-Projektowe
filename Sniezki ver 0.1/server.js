var io = require('socket.io').listen(8000);
var util = require("util");
var Player = require("./Player").Player;
var players = [];
io.sockets.on('connection', function (socket) {
  io.set("log level", 2); 
  socket.on('chat',function(data){
    util.log("chat");
    socket.broadcast.emit("chat",{x:data.x});//
  });
  socket.on("new player",function(data){
  	var newPlayer = new Player(data.x,data.y);
  	newPlayer.id=this.id;
  	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
  	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
	players.push(newPlayer);
  }); 
	socket.on("disconnect",function(data){
	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
	});
	socket.on("move player",function(data){
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("nie ma takiego gracza z id: "+this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
	});




});
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};