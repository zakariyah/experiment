var GetFromSequence = function(sequence)
{
	this.moves = sequence;
	this.opponentMoves = [];
	this.round = 0;
	this.createMove = function()
	{

		// if(this.round == 0)
		// {
		// 	// console.log("was called" + this.round);
		// 	this.round ++;
		// 	return 0;
		// }
		// else
		// {
		// 	// console.log(this.opponentMoves);
		// 	a = this.opponentMoves.pop();
		// 	// console.log(a);
		// 	this.round ++;
		// 	return a;
		// }
		// return 0;

		 a = this.moves[this.round];
		 this.round++;
		 return a;
		
	}

	this.update = function(acts)
	{
		// console.log("was called");
		this.opponentMoves.push(acts[1]);
	}

}

module.exports = GetFromSequence;