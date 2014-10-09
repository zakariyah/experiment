function gameplayer(id, socket)
{
	this.id = id;
	this.setSocket = function(sessionSocket)
	{
		this.sessionSocket = sessionSocket;
	}

	this.sessionSocket = socket;
	this.setOpponentId = function(id)
	{
		this.opponentId = id;
	}

	this.gameStore = [];
}

module.exports = gameplayer;