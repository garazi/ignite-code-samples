var request = require("request");

module.exports = {
    getRestaurants: getRestaurants,
    getReviews: getReviews
};

function getRestaurants(req, res) {
    request("http://api.usergrid.com/YOURORGNAME/sandbox/restaurants?limit=999", function(err, resp, body) {
        if (err) {
            res.send(err);
        } else {
            var results = {};
            results.entities = JSON.parse(body).entities;
            res.send(results);
        }
    });
}

function getReviews (req, res) {
	var restID = req.swagger.params.id.value;
	request("http://api.usergrid.com/YOURORGNAME/sandbox/reviews?limit=999&ql=restID=" + restID, function (err, resp, body) {
		if (err) {
			res.send(err);
		} else {
            body = JSON.parse(body).entities;
            var results = {};
            results.entities = body;
            results.count = body.length;;
            res.send(results);
		}
	});
}