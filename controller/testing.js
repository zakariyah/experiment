var agen = require('./agent');

var A  = [2, 2];
var agent = new agen('S++', 1, A, 0.99);
for(var i = 0; i< 10; i++)
{
	var agentMove = agent.createMove();
var opponentMove = i %2 ;
var acts = [agentMove, opponentMove];
agent.update(acts);
console.log(i + ', ' + acts);		
}
