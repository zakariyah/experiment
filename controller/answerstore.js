var moves = require('../model/actionmodel');
var game = require('./game');
var player = require('./player');
var answerContainer = require('./answer.js');
newgame = new game('second', [['A', 'B', 0, 5], ['B', 'A', 5, 0], ['A', 'A', 3, 3], ['B', 'B', 1, 1]]);
function answerstore(numberOfAnswers) {
    this.numberOfAnswers = numberOfAnswers;
    this.gameid = newgame.gameName;
    this.answerers = []; // not representative of the answer set
    this.answererSet = {};
    this.round = 1;
    this.players = {};
    this.addAnswer = function(answer, answerer) {
    	if(!(answerer in this.answererSet))
    	 {
    	 this.answerers.push(answerer);
    	 this.answererSet[answerer] = new answerContainer(answer);
         if(this.round == 1)
        {
            this.players[answerer] = new player(answerer);
        }
    	}
        else
        {
        this.answererSet[answerer] = new answerContainer(answer);   
        }
        this.addToPlayerHistory();
        
        if(this.isFilled() == false)
        {
            var status = this.opponentIsDisconnected(answerer);
         
            if(status != false)
            {   
                this.answerers.push(status);
                this.answererSet[status] = new answerContainer(0);
                this.addToPlayerHistory();
            }
        }
    };

    this.opponentIsDisconnected = function(answerer)
    {
        var opponent = false;
        for(play in this.players)
        {
            if(play != answerer)
            {
                opponent = play;
                break;
            }
        }
        if(!opponent)
        {
            return false;
        }
        if(this.players[opponent].connected)
        {
            return false;
        }
        return opponent;
    };


    this.setPlayerConnectedStatusToFalse = function(answerer)
    {
        this.players[answerer].connected = false;
    };

    this.isFilled = function(){
    	return this.answerers.length == this.numberOfAnswers;
    };

    this.addToPlayerHistory = function()
    {
        if(this.isFilled())
        {
            this.answerers = this.answerers.sort(); //to maintain position
            player1id = this.answerers[0];
            player2id = this.answerers[1];
            player1Choice = this.answererSet[player1id].chosenAnswer;
            player2Choice = this.answererSet[player2id].chosenAnswer;
            player1Type = this.answererSet[player1id].answerType;
            player2Type = this.answererSet[player2id].answerType;
            player1Value = newgame.getPlayerPayoff([player1Choice, player2Choice], 1);
            player2Value = newgame.getPlayerPayoff([player1Choice, player2Choice], 2);
            // console.log("na object " + this.players[player1id].id);
            this.players[player1id].addToHistory([player1Choice, player1Value, player2Choice,player2Value, player1Type, player2Type]);
            this.players[player2id].addToHistory([player2Choice, player2Value, player1Choice,player1Value, player2Type, player1Type]);
             //database savings
                move = {gameid : this.gameid, round : this.round, playerid : player1id,
                action : player1Choice, actionValue : player1Value, 
                playerid2 : player2id,
                action2 : player2Choice, actionValue2 : player2Value, actiontype: player1Type
                , actiontype2: player2Type};
                moves.createMove(move);             
        }
    }

    this.clear = function()
    {
        this.answerers = [];
    	this.answererSet = [];
        this.round ++;
    };
}

module.exports = answerstore;