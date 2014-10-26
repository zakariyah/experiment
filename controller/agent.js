// This class creates the called agent and supply it with it needed characters. It also helps store the 
// state of the game for the agent. It is what defines the agent next move.


var agent = function(nombre, playerIndex, payOffMatrix, lambda) // nombre, _me, _A[2], _M, _lambda, _game[1024]
{
	this.payOffMatrix =  payOffMatrix;


	this.M = this.buildPayoffMatrix();

	this.buildPayoffMatrix = function()
	{
		// try and get what M is and use it to build this.
	}

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