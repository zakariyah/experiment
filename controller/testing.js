var agen = require('./agent');
var TFT = require('../tester/alwaysCooperate');
var GetFromSequence = require('../tester/GetFromSequence');
var playgames = require('../tester/playgames');
fs = require('fs');
var A  = [2, 2];
// var agent = new agen('S++', 0, A, 0.99);
// var agent2 = new agen('S++', 0, A, 0.99);
var TFTagent = new TFT();
var TFTagent1 = new TFT();
// var game = new playgames(TFTagent, agent, 1000);
// console.log(game.playGame());



fs.readFile('./hagent/Results.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var a, d;
  var dict = {};
  var results = '';
  a = data.split('\r');
  for(var i = 0; i < a.length; i++)
  {
  	d = a[i].split('\t');
  	if(d[1] in dict)
  	{
  		dict[d[1]].push(parseInt(d[2]));
  	}
  	else
  	{
  		dict[d[1]] = [parseInt(d[2])];
  	}
  }
  // d = a[0].split("\t");

  for(val in dict)
  {
  	var agent2 = new agen('S++', 0, A, 0.99);
  	var seq = new GetFromSequence(dict[val]);
  	var game = new playgames(seq, agent2, dict[val].length);
  	// console.log(game.playGame());
  	// results[var] =  game.playGame();
  	u = game.playGame();
  	for(var i = 0; i < u[2].length; i++)
  	{
  		results += 'HUMAN\t' + val +'\t' + u[2][i][0] + '\t' + u[2][i][1] + '\t' + u[0] + '\t' + u[1] + '\n';		
  	}
  }
  	// printOutResult();
  // console.log(dict);
  fs.writeFile("./hagent/NewResults.txt", results, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
});
// function printOutResult()
// {

// }

// var fs = require('fs'),
//     readline = require('readline');
// var a = [];
// var rd = readline.createInterface({
//     input: fs.createReadStream('./hagent/Results.txt'),
//     output: process.stdout,
//     terminal: false
// });

// rd.on('line', function(line) {
//     // console.log(line);
//     a.push(line);
//     console.log(a[0]);
// });


// var previousMove = 1;
// for(var i = 0; i< 10; i++)
// {
// 	var agentMove = agent.createMove();
// var opponentMove = 1; //previousMove ;
// var acts = [agentMove, opponentMove];
// agent.update(acts);
// previousMove = agentMove;
// console.log(i + ', ' + acts);
// }

//