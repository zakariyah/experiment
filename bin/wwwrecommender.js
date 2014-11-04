#!/usr/bin/env node
var debug = require('debug')('my-application');
var connect = require('connect');
var app = require('../app');
var io = require('socket.io');
// var cookieParser = require('cookie-parser');
var connecter = require('../database');
connecter('mongodb://localhost/labexperiment');
var SessionSockets = require('session.socket.io');
var gameController = require('../controller/gameController');
var gameplayer = require('../controller/gameplayer');

app.set('port', process.env.PORT || 4000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log('You have logged in ' + app.numberOfTimes + ' times');
});
var ionew = io.listen(server);

sessionSockets = new SessionSockets(ionew, app.sessionstore, app.cookieNew);

var gamecontroller = new gameController(2);
var gameMap = {};
var gameStartStatus = false;
// var answerStores = {};


ionew.sockets.on('connection', function (socket) {

	socket.on('clientMessage', function(content) {
	var options = ['A', 'B'];
	roomNumber =  gamecontroller.roomToSocket[socket.id]; //	roomToSocket[socket.id];
	store = gamecontroller.answerStores[roomNumber];
	// console.log(socket.id);
	// console.log('room number is ' +  roomNumber);
	// console.log(gamecontroller.roomToSocket);
	// console.log(store);
	if(store)
	{
		// console.log(gamecontroller.gameRooms);
		var roomObject = gamecontroller.gameRooms[socket.id]; 
		store.addAnswer(content, socket.id);
		var messageText = "<div class=\"alert alert-warning\"> Round " + store.round + " /5</div>";
		// if(roomObject.agentPresent)
		// {
		// 	opponent = gameMap[socket.id];
		// 	var agentMove = roomObject.player2.nextMove(content);
		// 	store.addAnswer(agentMove, opponent);
		// 	var message = {count : store.round, text : (messageText  + " " + store.players[socket.id].printResults())};
		// 	// roomObject.player1
		// 	// console.log("The message was sent");
		// 	socket.emit('serverMessage', message);
		// 	store.clear();
		// }
		// else
		// {
			if(store.isFilled())
			{					
				// for(soc in rooms[room])
				// {
					var soc1 = roomObject.player1;
					var soc2 = roomObject.player2;
					var message = {count : store.round, text : (messageText  + " " + store.players[soc1.id].printResults()), recommendation : soc1.getRecommendation()};					
					soc1.sessionSocket.emit('serverMessage', message);
					soc1.updateRecommender(store.answererSet[soc1.id].chosenAnswer, store.answererSet[soc2.id].chosenAnswer);					
					var message2 = {count : store.round, text : (messageText  + " " + store.players[soc2.id].printResults()), recommendation : soc2.getRecommendation()};
					soc2.sessionSocket.emit('serverMessage', message2);
					soc1.updateRecommender(store.answererSet[soc2.id].chosenAnswer, store.answererSet[soc1.id].chosenAnswer);
				// }
					// roomObject.sendMessageToClient('serverMessage', store.round);
					store.clear();
			}
		// }
	}
});

socket.on('disconnect', function()
{
	// room = roomToSocket[socket.id];
	// store = answerStores[room];

	roomNumber =  gamecontroller.roomToSocket[socket.id]; //	roomToSocket[socket.id];
	store = gamecontroller.answerStores[roomNumber];
	opponentId = gameMap[socket.id];
	if(store)
	{
		// for(soc in rooms[room])
		// 	{
	a = '<div class=\"alert alert-warning\"> Your opponent disconnected at round ' + store.round
					+' : Thus you will be playing against a random agent </div>';
	gamecontroller.gamePlayers[opponentId].sessionSocket.emit('disconnectMessage', a);
			// }
	store.addAnswer(0, socket.id);
	store.setPlayerConnectedStatusToFalse(socket.id);
	var messageText = "<div class=\"alert alert-warning\"> Round " + store.round + " /5</div>";
	if(store.isFilled())
		{
			// for(soc in rooms[room])
			// {

			var message = {count : store.round, text : (messageText  + " " + store.players[opponentId].printResults())};
			gamecontroller.gamePlayers[opponentId].sessionSocket.emit('serverMessage', message);
			// }
			store.clear();
		}
	}
});


	console.log("connected");
	socket.on('join', function()
	{
		sessionSockets.getSession(socket, function (err, session) {
		 	if(session)
		 	{
		 		// console.log(session.userid);	
		 		var id = session.userid;
				var player = new gameplayer(id, socket, false, 1);
				// var hisAgentOpponent 
				gamecontroller.addPlayer(player);
				if(gamecontroller.isFilled())
				{
					startGame();
					gameStartStatus = true;
				}
		 	}
		});

	});

	// function createAgentToBeAddedToRooms()
	// {
	// 	var playersId = Object.keys(gamecontroller.gamePlayers);
	// 	playersId = shuffle(playersId);
	// 	for(var i = 0; i < gamecontroller.numberOfPlayers; i++)
	// 	{
	// 		var agentPlayer = new gameplayer((i + 1), null, true, 2);
	// 		gamecontroller.addPlayer(agentPlayer);
	// 	}

	// 	return playersId;
	// }

	function startGame()
	{
		// console.log("it is filled");
		var playersId = Object.keys(gamecontroller.gamePlayers); // createAgentToBeAddedToRooms();

		if(!gameStartStatus)
		{
			mapOutPlayers(playersId);
			for(var i in gamecontroller.gamePlayers)
			{
				console.log(i + " is " + gameMap[i]);
				var message = "Your opponent is " + gameMap[i];
				if( !gamecontroller.gamePlayers[i].isAgent)
				{
					if(gamecontroller.gamePlayers[i].hasRecommender)
					{
						message += " But don't worry, you have a recommender ";
					}
						gamecontroller.gamePlayers[i].sessionSocket.emit('serverMessage', {text : message});
						gamecontroller.gamePlayers[i].sessionSocket.emit('start');					
				}
				// console.log('start messages');
			}
		}
		

	}


	function shuffle(o){ //v1.0
    	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    	return o;
	};


	function mapOutPlayers(playersId)
	{
		
		// console.log("length is " + playersId.length);
		for (var i = 0; i < playersId.length; i++)
		{
			var playerId = playersId[i];
			// console.log("player " + playerId + " opponent is ");
			if(i % 2 == 0)
			{
				//always execute
				gameMap[playerId] = playersId[i + 1]
				gamecontroller.setPlayersToRoom(playerId, playersId[i + 1] );
				gamecontroller.gamePlayers[playerId].setHasRecommender();
				// gameMap[playerId] = (i + 1);
				// gameMap[i + 1] = playerId;
				// gamecontroller.setPlayersToRoom(playerId, (i + 1) );
				// gamecontroller.pointSecondPlayerToRoom((i+1) , playerId, i);

			}	
			else
			{
				gameMap[playerId] = playersId[i - 1];
				gamecontroller.pointSecondPlayerToRoom(playerId, playersId[i - 1], Math.floor(i/2));
			}
		};
	} 
});