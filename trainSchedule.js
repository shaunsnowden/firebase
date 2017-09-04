
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
	var firstTime = $('#inputFirstTime').val().trim();
	// .format("hh:mm");
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

});