var a = function(_me, _A, _M, _lambda, _numExperts)
{
	this.me = _me;
	this.numExperts = _numExperts;
	this.lambda = _lambda;
	this.lastExpert = -1;

	this.select = function(choices)
	{
		if(this.lastExpert == -1)
		{
			this.lastExpert = this.randomlySelect(choices);
		}
		else
		{
			if(!choices[this.lastExpert])
			{
				this.rho = -1.0; // takes care of override
			}
			// var highestNumber = Math.pow(2, 53);
			var num = Math.random();
			if(num > this.rho)
			{
				this.lastExpert = this.randomlySelect(choices);
			}
		}
		return this.lastExpert;
	}

	this.randomlySelect = function(choices)
	{
		var i;
		var cnt = 0;
		for(i = 0; i < this.numExperts; i++)
		{
			if(choices[i])
			{
				cnt = cnt + 1;
			}
		}

		var highestNumber = Math.pow(2, 53);
		var pick = Math.floor(Math.random() * highestNumber) % cnt;
		cnt = 0;

		for( i = 0; i < this.numExperts; i++)
		{
			if(choices[i])
			{
				if(cnt == pick)
				{
					return i;
				}
				cnt = cnt + 1;
			}
		}

		console.log("we have a problem");
		throw new Error("Something is wrong");
		return -1;
	}

	this.update = function(R, tau)
	{
		var aspiration = 0;
		for(var i = 0; i < tau; i++)
		{
			aspiration = this.lambda * aspiration + (1.0 - this.lambda) * R;
		}

		this.rho = R/aspiration;
		if(this.rho > 1.0)
		{
			this.rho = 1.0;
		}

		this.rho = Math.pow(this.rho, tau);
	}
}