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
            body = JSON.parse(body);
            var data = body.entities;
            var count = data.length;
            var tempArray = [];
            for (var i = 0; i < count; i++) {
                var item = {
                    name: data[i].name,
                    address: data[i].address,
                    city: data[i].city,
                    state: data[i].state,
                    location: {
                        latitude: data[i].location.latitude,
                        longitude: data[i].location.longitude
                    },
                    phone: data[i].phone,
                    category: data[i].category,
                    restID: data[i].restID
                };
                tempArray.push(item);
            }
            results = {};
            results.entities = tempArray;
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
			body = JSON.parse(body);
			var data = body.entities;
			var count = data.length;
			var tempArray = [];
            for (var i = 0; i < count; i++) {
                var item = {
                    title: data[i].title,
                    body: data[i].body,
                    rating: data[i].rating,
                    reviewer: data[i].reviewer,
                    restID: data[i].restID
                };
                tempArray.push(item);
            }
            results = {};
            results.entities = tempArray;
            res.send(results);
		}
	});
}