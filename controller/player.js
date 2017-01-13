function player(id)
{
	this.id = id;
	this.gameChoices = ["A", "B"];
	this.connected = true;
	this.history = [];
	this.addToHistory =  function(arrayOfValues){
		this.history.push(arrayOfValues) //[choice, value, opponentchoice, opponentvalue]);
		// console.log("after pushing: " + this.history.length);
	};

	this.getCummulativeValue = function()
	{
		cummulative = 0;
		for(var i = 0; i < this.history.length; i++)
		{
			cummulative += this.history[i][1];
		}
		return cummulative;
	};

	this.getOpponentCummulativeValue = function()
	{
		cummulative = 0;
		for(var i = 0; i < this.history.length; i++)
		{
			cummulative += this.history[i][3];
		}
		return cummulative;
	};

	this.printResults = function()
	{
		html = "<table class=\"table table-bordered\"><tr><td>Round</td><td>Your Choice </td> <td>Opponent Choice </td> <td> Your score </td><td> Opponent Score </td></tr>";
		// console.log("len: " + this.history.length);
		var randomBadge = "<span class=\"badge  pull-right\">R</span>";
		var color1 = (this.getCummulativeValue() > this.getOpponentCummulativeValue()) ? " label-info " : " label-danger";
		var color2 = (this.getCummulativeValue() < this.getOpponentCummulativeValue()) ? " label-info " : " label-danger";
		for(var i = 0; i < this.history.length; i++)
		{
			html += " <tr><td>"+ (i + 1) + "</td><td>" + this.gameChoices[this.history[i][0] - 1] + " " +
				((this.history[i][4] == 0) ? randomBadge : "") +
			"</td><td>" + this.gameChoices[this.history[i][2] - 1] + " " +
			((this.history[i][5] == 0) ? randomBadge : "") +	
			"</td><td>" + this.history[i][1] + "</td><td> "
			+ this.history[i][3] + "</td></tr>";			
		}
		html += " <tr><td colspan=3> <h3><span class=\"label label-primary\">CUMMULATIVE SCORES </span></h3></td><td>" +
		"<h3><span class=\"label " + color1 + "\">" + this.getCummulativeValue() +
		        "</span></h3></td><td><h3><span class=\"label "+ color2 +" \">" + this.getOpponentCummulativeValue() + "</span></h3></td></tr></table>";
		return html;
	};
}

module.exports = player;