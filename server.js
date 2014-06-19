http = require('http');

var routes =["M31", "M15", "M79", "M86", "M96", "M66"];
//var routes =["M31"];

var urlString1 = "http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?&LineRef=MTA%20NYCT_"

var urlString2 = "&key=adf3b381-85b5-48b9-a049-32c335108f6e"


// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/UESbuses", function(err, db) {
	if(!err) {
		console.log("We are connected");

		var collection = db.collection('events')

		setInterval(function() {

			for(var i in routes){
			http.get(urlString1 + routes[i] + urlString2 , function(res) {
				var body = '';

				res.on('data', function(chunk) {
					body += chunk;
				});

				res.on('end', function() {
					var response = JSON.parse(body);
					response = response.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity;

					console.log(response);

					console.log("Got response!");

					for (var j in response) {
						collection.insert(response[j], function (err, inserted) {
							console.log(inserted);
						});
					};
				});
			}).on('error', function(e) {
				console.log("Got error: ", e);
			});
		}
		console.log("Waiting 15 seconds...");
		},15000);

		


	}
});





