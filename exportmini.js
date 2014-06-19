var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');


MongoClient.connect("mongodb://localhost:27017/UESbuses", function(err, db) {

	var events = db.collection('events');
	var stop_times = db.collection('stop_times');



	var ws = fs.createWriteStream("my.csv");

	var i=0;

	events.find({"MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.PresentableDistance":/at stop/},function(err,results){
		results.each(function(err,result){

			

		

			if(result !== null){

				trip_id = result.MonitoredVehicleJourney.FramedVehicleJourneyRef.DatedVehicleJourneyRef.substring(9);
				console.log(trip_id);

				stop_id = result.MonitoredVehicleJourney.MonitoredCall.StopPointRef.substring(4);
				console.log(stop_id);

				
				ws.write(JSON.stringify(result.RecordedAtTime));
				ws.write(",");	
				ws.write(trip_id);
				ws.write(",");
				ws.write(stop_id);	
				ws.write("\n");	
			}
			
		});

		



	});
});