function gameplayer(id, socket, isAgent, index)
{	
	this.id = id;
	
	this.isAgent = isAgent;

	if(isAgent)
	{
		var agen  = require('./agent.js');
		this.agent = new agen('S++', index, A, 0.99);
	}

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