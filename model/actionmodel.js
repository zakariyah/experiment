var mongoose = require('mongoose');
  var moveSchema = new mongoose.Schema({
  gameid: { type: String }
, round: Number
, playerid: String
, action: String,
actionValue: Number
, playerid2: String
, action2: String,
actionValue2: Number,
actiontype: String,
actiontype2 : String
});

moveSchema.statics.createMove = function(move) {

    var newMove = new this({
       gameid: move.gameid,
   		 round: move.round,
   		 playerid: move.playerid,
   		 action: move.action,
   		 actionValue: move.actionValue,
       playerid2: move.playerid2,
       action2: move.action2,
       actionValue2: move.actionValue2,
       actiontype: move.actiontype,
       actiontype2: move.actiontype2
    });

    newMove.save(function(err) {
        if (err)
            throw new Error('Could not create move');
        // callback(err, g);
    })
}

var Moves2 = mongoose.model('Moves2', moveSchema);
module.exports = Moves2;

// games database, 