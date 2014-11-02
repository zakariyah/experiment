function gameplayer(id, socket, isAgent, index)
{	
	if(isAgent)
	{
		this.id = id;	
	}
	else
	{
		this.id = socket.id;
	}
	

	
	this.isAgent = isAgent;

	if(isAgent)
	{
		var agen  = require('./agent.js');
		var A  = [2, 2];
		this.agent = new agen('S++', (index - 1), A, 0.99);
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

	this.nextMove = function(opponentMove)
	{
		// this is called to return the next move if it is an algorithm
		if(isAgent)
		{
			var agentMove = this.agent.createMove();
			var acts = [agentMove, opponentMove - 1];
			this.agent.update(acts);
			return agentMove + 1;
		}
		return null;
	}

	this.gameStore = [];
}

module.exports = gameplayer;