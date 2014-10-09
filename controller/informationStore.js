var information = require('../model/information');

var saveInformation = function(req)
{
	var informationStore = req.body;
	// console.log(req);
	// informationStore['age'] = req.params.age;
	// informationStore['gender'] = req['gender'];
	// informationStore['nationality'] = req['nationality'];
	// informationStore['qualification'] = req['qualification'];
	// informationStore['field'] = req['field'];
	// informationStore['familiarity'] = req['familiarity'];
	// informationStore['experience'] = req['experience'];
	informationStore['gameid'] = 'second';
	information.createInformation(informationStore);
	// for (var i = 0 ; i < 7; i++) {
	// 		var key		
	// 	}
};

module.exports = saveInformation;