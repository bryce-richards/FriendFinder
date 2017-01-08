var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = proess.env.PORT || 5555;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
});

$("#submitBtn").on("click", function() {
    var results = [];
    $("<select>").each(function() {
        results.push($(this).val());
    });
    var newFriend = {
        name: $("#inputName").val().trim(),
        photo: $("#inputImage").val().trim(),
        scores: results
    };

    // add newFriend to MySql

    var currentURL = window.location.origin;

    app.post(currentURL + "/api/friends", newFriend)
    .done(function(data) {
        console.log(data);
    })
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});