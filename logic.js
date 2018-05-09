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
});

