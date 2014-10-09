var iModel = function()
{
	this.omega = 1;
	this.me = 0;
	this.A = [2, 2];
	this.init();
	var constants = require('./constants');
	this.NUM_PLAYERS = constants.NUM_PLAYERS;


	this.iModelLoadedConstructor = function(_me, _A, _omega)
	{
		this.me = _me;
		for(var i = 0; i < _A.length; i++)
		{
			this.A[i] = _A[i];
		}
		this.omega = _omega;
		this.init();
	}

	this.init = function()
	{
		var numJointActions = this.A[0];
		for(var i = 1; i < this.NUM_PLAYERS; i++)
		{
			numJointActions = numJointActions * A[i];
		}
		this.numStates = Math.pow(numJointActions, this.omega);
		this.lastSeen = [];
		this.lastTime = [];
		for(var i = 0; i < this.numStates; i++)
		{
			this.lastSeen[i] = this.lastTime[i] = -1;
		}
	}

	this.update = function(acts, estado, _t)
	{
		var i;
		if((acts[ 1 - this.me] != this.lastSeen[estado]) && (this.lastSeen[estado] != -1))
		{
			for(i = 0; i < this.numStates; i++)
			{
				this.lastSeen[i] = -1;
			}
			this.lastSeen[estado] = acts[1 - me];
			this.lastTime[estado] = _t;
		}
		else
		{
			this.lastSeen[estado] = acts[1 - me];
			this.lastTime[estado] = _t;
		}
	}

	this.matchOmegaStrategy = function(thars)
	{
		var s;
		for(s = 0; s < thars.numStates; s++)
		{
			if(this.lastSeen[s] >= 0)
			{
				if(thars.pi[s][this.lastSeen[s]] < 0.9999)
				{
					return false;
				}
			}
		}
		return true;
	}


	this.match = function(pi)
	{
		var s;
		for(s = 0; s < this.numStates; s++)
		{
			if(this.lastSeen[s] >= 0)
			{
				if(pi[s][this.lastSeen[s]] < 0.01)
					return false;
			}
		}
		return true;
	}

	this.print = function()
	{
		var i;
		console.log("iModel :" + this.me);
		for(i = 0; i < this.numStates; i++)
		{
			if(this.lastSeen[i] == -1)
			{
				console.log("? " + this.lastSeen[i]);
			}
			else
			{
				console.log(this.lastSeen[i]);
			}
		}		
	}
}