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
	this.recommender;
	this.hasRecommender  = false;

	this.setHasRecommender = function()
	{
		var agen  = require('./agent.js');
		var A  = [2, 2];
		this.recommender = new agen('S++', 0, A, 0.99);	
		this.hasRecommender = true;
	}

	this.getRecommendation = function()
	{
		if(this.hasRecommender)
		{
			var agentMove = this.recommender.createMove();
			return agentMove + 1;
		}
		return null;
	}

	this.updateRecommender = function(playerMove, opponentMove)
	{
		if(this.hasRecommender)
		{
			var acts = [playerMove - 1, opponentMove - 1];
			this.recommender.update(acts);
		}
	}

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