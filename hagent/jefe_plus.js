var jefe_plus = function(nombre, _me, _A[2], _M, _lambda, _game[1024])
{
	this.A = [];
	this.A[0] = _A[0];
	this.A[1] = _A[1];
	this.me = _me;
	this.game = [];
	// this.strcpy(this.game, _game); check

	this.numStates = this.A[0] * this.A[1];
	this.t = 0;

	this.beenThere = [];
	this.experto = -1;
	this.estado = -1;
	this.cycled = false;

	this.numExperts = this.determineExperts();
	// console.log("numExperts " + this.numExperts);

	this.cycleFull = true;

	this.numSatExperts = 1;
	this.lambda = 1 - (( 1.0/ this.numSatExperts) * 0.04);
	var a  = require('./a');
	var Exp3  = require('./Exp3');
	var eee  = require('./eee');
	var ucb  = require('./ucb');
	var iModel  = require('./iModel');
	var SolutionPair  = require('./SolutionPair');
	var REExpert  = require('./REExpert');
	if( nombre == "S++")
	{
		this.learner = new a(_me, _A, _M, _lambda, this.numExperts);
		this.cycleFull = false; 
	}
	else if ((nombre == "exp3w++") || (nombre == "exp3"))
	{
		this.learner = new Exp3(this.me, Math.floor(_lambda), 0.99, this.numExperts);
	}
	else if(nombre == "eeew++")
	{
		this.learner = new eee(_me, _lambda, this.numExperts);
	}
	else if( nombre == "ucbw++")
	{
		this.learner = new ucb(_me, _lambda, this.numExperts);
	}
	else
	{
		// console.log("expert learner not found");
		return;
	}
	this.im = new iModel(this.me, this.A, 1);
	this.setAspirationFolkEgal();
	this.mu = 0.0;

	this.vu = [];
	this.usage = [];
	for(var i = 0; i < this.numExperts; i++)
	{
		this.vu[i] = 1.0;
		this.usage[i] = 0.0;
	}

	this.alwaysMM = false;
	this.permissibleLoss = 100.0;

	this.lowAspiration = 1.0;

	this.REcount = 0;
	this.br ; // placeholder for br
	this.satisficingExperts = [];
	this.mnmx = [];
	this.attack0;
	this.attack1;
	this.re = [];
	this.determineExperts = function()
	{
		this.resetCycle();
		this.determineStrategyPairs();
		var numEs = this.REcount * 2 + 2;
		this.br = new Rmax(this.me, this.A, this.M, 1, 0, 0.95);
		this.satisficingExperts =  [];
		for(var i = 0; i< numEs; i++)
		{
			this.satisficingExperts[i] = true;
		}
		return numEs;
	}

	this.determineStrategyPairs = function()
	{
		var numSolutionPairs = 0;
		for(var i = 0; i < this.numStates; i++)
		{
			numSolutionPairs += (i + 1);
		}

		var Theta = [];
		this.createSolutionPairs(Theta);

		this.mnmx[0]= this.computeMaximin(0);
		this.mnmx[1]= this.computeMaximin(1);
		this.attack0 = this.computeAttack(0);
		this.attack1 = this.computeAttack(1);

		// console.log("maximins: " + this.mnmx[0].mv +" " + this.mnmx[1].mv);
		this.REcount = 0;
		this.re = [];
		for( var i = 0; i < this.numSolutionPairs; i++)
		{
			if((Theta[i].one >= this.mnmx[0].mv) && (Theta[i].one > 0) && (Theta[i].two >= this.mnmx[1].mv) && (Theta[i].two > 0))
			{
				// console.log("creating something");
				this.re[this.REcount] = new REExpert(this.me, this.M, this.A, Theta[i].s1, Theta[i].s2, this.attack0, this.attack1);
				this.REcount ++;
			}
		}
	}

	this.createSolutionPairs = function(Theta)
	{
		var c = 0;
		for(var i = 0; i < this.numStates; i++)
		{
			for(var j = i; j < this.numStates; j++)
			{
				Theta[c].s1 = i;
				Theta[c].s2 = j;
				Theta[c].one = (this.pay(0, Theta[c].s1) + this.pay(0, Theta[c].s2)) / 2.0;
				Theta[c].one = (this.pay(1, Theta[c].s1) + this.pay(1, Theta[c].s2)) / 2.0;

				Theta[c].min = Theta[c].one;
				if(Theta[c].one > Theta[c].two)
				{
					Theta[c].min = Theta[c].two;
				}
				c++;
			}
		}
	}

	this.move = function()
	{
		
	}


}