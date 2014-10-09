var room = require('../controller/room');

function  gameController(numberOfPlayers)
{
	this.numberOfPlayers = numberOfPlayers;
	this.gamePlayers = {};
	this.gameRooms = {};
	this.addPlayer = function(player)
	{
		if(player.id in this.gamePlayers)
		{
			this.gamePlayers[player.id].setSocket(player.sessionSocket);
		}
		else
		{
			this.gamePlayers[player.id] = player;	
		}
		// gamePlayers.push(player);
		console.log(player.id);
		console.log("the length is " + Object.keys(this.gamePlayers).length);
	}

	this.numberOfRegisteredPlayers = function()
	{
		return Object.keys(this.gamePlayers).length;
	}

	this.isFilled = function()
	{
		return Object.keys(this.gamePlayers).length  == this.numberOfPlayers;
	}

	this.setPlayersToRoom = function(playerId, opponentId)
	{
		var roomPlayer = new room(this.gamePlayers[playerId],this.gamePlayers[opponentId]);
		this.gameRooms[playerId] = roomPlayer;
	}

	this.pointSecondPlayerToRoom = function(playerId, opponentId)
	{
		this.gameRooms[playerId] = this.gameRooms[opponentId];
	}
}

module.exports = gameController;