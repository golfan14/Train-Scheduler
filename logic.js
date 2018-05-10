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

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

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

    $("#table-data").append("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + nextArrival + "</td>" + "<td>" + tMinutesTillTrain + "</td></tr>");
});

var firstTimeConverted = moment(firstTime, "hh:mm");
console.log(firstTimeConverted);

var currentTime = moment();
console.log(moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTime, "minutes"));
console.log(diffTime);

var tRemainder = diffTime % frequency;
console.log(tRemainder);

var tMinutesTillTrain = frequency - tRemainder;
console.log(tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log(moment(nextTrain).format("hh:mm"));

var nextArrival = moment.unix(nextTrain).format("hh:mm");





