// This class creates the called agent and supply it with it needed characters. It also helps store the 
// state of the game for the agent. It is what defines the agent next move.


var agent = function(nombre, playerIndex, payOffMatrix, lambda, gameType) // nombre, _me, _A[2], _M, _lambda, _game[1024]
{
	this.payOffMatrix =  payOffMatrix;

	this.buildPayoffMatrix = function()
	{
		// try and get what M is and use it to build this.
		var myM = [];
		myM[0] = [];
		myM[1] = [];
		if(gameType=="prisoners")
		{
			myM[0][0] = [0.6, 0];
			myM[0][1] = [1, 0.2];
			myM[1][0] = [0.6, 1];
			myM[1][1] = [0, 0.2];	
		}
		else if(gameType == "bofs")
		{
			myM[0][0] = [0.5, 1.0];
			myM[0][1] = [0.75, 0.25];
			myM[1][0] = [0.5, 0.75];
			myM[1][1] = [1, 0.25];
		}
		else if(gameType == "tricky")
		{
			myM[0][0] = [0, 1];
			myM[0][1] = [1/3.0, 2/3.0];
			myM[1][0] = [1, 2/3.0];
			myM[1][1] = [0, 1/3.0];

		}
		else if(gameType == "staghunt")
		{
			myM[0][0] = [0.8, -1.0];
			myM[0][1] = [0.6, 0.4];
			myM[1][0] = [0.8, 0.6];
			myM[1][1] = [-1, 0.4];
		}
		else if(gameType == "chicken")
		{
			myM[0][0] = [0.75, 0.25];
			myM[0][1] = [1, 0];
			myM[1][0] = [0.75, 1];
			myM[1][1] = [0.25, 0];
		}

		return myM;
	}
	
	this.M = this.buildPayoffMatrix();


	var jefe_plus  = require('../hagent/jefe_plus.js');
	
	this.myJefePlus = new jefe_plus(nombre, playerIndex, payOffMatrix, this.M,  lambda); // get those variables
	
	this.createMove = function()
	{
		return this.myJefePlus.move();
	}	

	this.update = function(acts)
	{
		// This is to be called after the createMove.
		// acts is an array with the first element the agent's move and the second element
		// its opponent move.
		this.myJefePlus.update(acts);
	}

	this.getAgentState = function()
	{
		// the method is to print out the user state.
		return this.myJefePlus.experto;
	}
}

module.exports = agent;