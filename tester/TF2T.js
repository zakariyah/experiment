var TF2T = function()
{
	this.moves = [];
	this.opponentMoves = [];
	this.round = 0;
	this.defectedOnce = false;
	this.createMove = function()
	{

		if(this.round == 0)
		{
			// console.log("was called" + this.round);
			this.round ++;
			return 0;
		}
		else
		{
			// console.log(this.opponentMoves);
			this.round ++;
			a = this.opponentMoves.pop();
			if(a == 1 && this.defectedOnce)
			{
				this.defectedOnce = false;
				return a;
			}
			else if(a == 1)
			{
				this.defectedOnce = true;
				return 0;
			}
			else
			{
				return 1;
			}
			// console.log(a);
			
			// return a;
		}
		// return 0;
		
	}

	this.update = function(acts)
	{
		// console.log("was called");
		this.opponentMoves.push(acts[1]);
	}

}

module.exports = TF2T;