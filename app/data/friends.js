var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = proess.env.PORT || 5555;

var friends = [];

app.get("/api/friends", function(req, res) {
    res.json(friends);
});

app.post("/api/friends", function(req , res) {
    var newFriend = req.body;
    newFriend.routeName = newFriend.name.replace(/\s+/g,"").toLowerCase();

    console.log(newFriend);

    // findFriend(newFriend);

    friends.push(newFriend);

    // add newFriend to MySQL

    res.json(newFriend);
});

function findFriend(newFriend) {
    for (var i = 0; i < friends.length; i++) {
        for (var j = 0; j < newFriend.scores.length; j++) {
            // get absolute value of different between each score
        }
    }
}