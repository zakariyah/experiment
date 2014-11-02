var agen = require('./agent');

var A  = [2, 2];
var agent = new agen('S++', 1, A, 0.99);
var previousMove = 1;
for(var i = 0; i< 10; i++)
{
	var agentMove = agent.createMove();
var opponentMove = 1; //previousMove ;
var acts = [agentMove, opponentMove];
agent.update(acts);
previousMove = agentMove;
console.log(i + ', ' + acts);		
}