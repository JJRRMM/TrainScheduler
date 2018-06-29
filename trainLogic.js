/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase from timesheet logic below
// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCBdPnsdYzMEi34pYFqYSzOmnA4f8tMpIk",
  authDomain: "fir-project-1d288.firebaseapp.com",
  databaseURL: "https://fir-project-1d288.firebaseio.com",
  projectId: "fir-project-1d288",
  storageBucket: "fir-project-1d288.appspot.com",
  messagingSenderId: "1075816616609"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees - change button name
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input - change to train data
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#train-destination-input").val().trim();
  // var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:MM").format("X");
  var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");  
  
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data - change to train 
  var newTrain = {
    train: trainName,
    destination: trainDestination,
    firstTrain: firstTrain,
    frequency:  frequency 
  };

  // Uploads employee data to the database - train data to database.
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  // alert("Train successfully added");

  // Clears all of the text-boxes - train data
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.  child data 
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
 
  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the train start moment js - miliraty time
  var firstTrainPretty = moment.unix(firstTrain).format("HH:MM");

  // Calculate the minutes away subtract arrival time from current time
    
  // Calculate the next arrival start from current time. Start time + frequency up to current tim 
  var nextArrival = "04:30"
  var first = "03:30";  
  var nextArrival = NextArival(first,frequency);
  var minutesAway = MinutesAway(first,frequency);
  console.log("From the fuction call minutes away: " + minutesAway);
  // Add each train's data into the table - train data. 
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
   function NextArival (firstTime,tFrequency) {
   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  //  console.log(firstTimeConverted);
   var currentTime = moment();
  //  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //  console.log("DIFFERENCE IN TIME: " + diffTime);
   var tRemainder = diffTime % tFrequency;
  //  console.log(tRemainder);
   //  minutes away
   var tMinutesTillTrain = tFrequency - tRemainder;
  //  console.log("MINUTES AWAY: " + tMinutesTillTrain);
   // Next Arrival
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //  console.log("NEXT ARRIVAL: " + moment(nextTrain).format("hh:mm"));
   return moment(nextTrain).format("hh:mm");
   }
   function MinutesAway (firstTime,tFrequency) {
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     var currentTime = moment();
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES AWAY in FUNCTION: " + tMinutesTillTrain);
    return tMinutesTillTrain;
    }

// Now we will create code in moment.js to confirm that any attempt we use meets this test case
