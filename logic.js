var config = {
    apiKey: "AIzaSyCcrKf1xpJ0ATecN1aHn4ekgxVrOborXUQ",
    authDomain: "train-scheduler-d20a9.firebaseapp.com",
    databaseURL: "https://train-scheduler-d20a9.firebaseio.com",
    projectId: "train-scheduler-d20a9",
    storageBucket: "",
    messagingSenderId: "644129425188"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = "";
var frequency = "";

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstTime = $("#time-input").val().trim();
    frequency = $("#freq-input").val().trim();

    if (name == "Hogwarts Express") {
        alert("NERD");
    }

    // console.log(name);
    // console.log(destination);
    // console.log(firstTime);
    // console.log(frequency);

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });    

    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);  
    
    var tFrequency = childSnapshot.val().frequency;
    console.log(tFrequency);

    // Time is 3:30 AM
    var tFirstTime = childSnapshot.val().firstTime;
    console.log(tFirstTime);

    var tFirstTimeConverted = moment(tFirstTime, "HH:mm").subtract(1, "years");
    console.log(tFirstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(tFirstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var nextArrival = moment(nextTrain).format("HH:mm");



    $("#table-data").append("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + nextArrival + "</td>" + "<td>" + tMinutesTillTrain + "</td></tr>");
});










