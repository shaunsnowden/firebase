
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBLX7gFy0F0_z-ERee7PBZdtWgHEJuqQwo",
    authDomain: "trainschedule-51567.firebaseapp.com",
    databaseURL: "https://trainschedule-51567.firebaseio.com",
    projectId: "trainschedule-51567",
    storageBucket: "trainschedule-51567.appspot.com",
    messagingSenderId: "887757887133"
  };
  firebase.initializeApp(config);


var database = firebase.database();
$('#addTrainBtn').on('click',function(evt) {
	evt.preventDefault();
	var trainName = $('#inputTrain').val().trim();
	var destination = $('#inputDestination').val().trim();
	var firstTime = moment($('#inputFirstTime').val().trim(), "hh:mm").format("hh:mm");
	var frequency = $('#inputFrequency').val().trim();

	var newTrain = {
		name: trainName,
		place: destination,
		firsttrain: firstTime,
		freq: frequency
	}

	console.log(newTrain);

	// uploads object to database
	database.ref().push(newTrain);

	// clear all text boxes
	$('#inputTrain').val("");
	$('#inputDestination').val("");
	$('#inputFirstTime').val("");
	$('#inputFrequency').val("");

});

// Push new entry to the html
database.ref().on("child_added",function(childSnapshot) {
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().place;
	var firstTrain = childSnapshot.val().firsttrain;
	var frequency = childSnapshot.val().freq;
	var trainNumber = 1;

	var currentTime = moment().format("hh:mm");
	var timeDiff = moment().diff(moment(firstTrain), "minutes");
	var timeRemainder = timeDiff % frequency;
	var minToTrain = frequency - timeRemainder;
	var nxtTrain = moment().add(minToTrain, "minutes").format("hh:mm");

	$('#trainTable').append("<tr><td>" + trainNumber + "</td><td>"+ trainName + "</td><td>" + destination + "</td><td>" + nxtTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");

	trainNumber++;

});