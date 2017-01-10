var mysql = require("mysql");

var bluebird = require("bluebird");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "friend_finder"
});

var exports = module.exports = {};

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

var query = bluebird.promisify(connection.query, {
    context: connection
});

function getFriends(callback) {
    connection.query("SELECT * FROM friends", callback);
}

function compareFriends(newFriend) {
    var newFriend = newFriend;
    // connection.query("INSERT INTO friends SET ?", [{
    //     friend_name: newFriend.name,
    //     friend_image: newFriend.photo,
    //     friend_results: newFriend.scores
    // }]);
    connection.query("SELECT * FROM friends", function(error, results) {
        console.log("Query Results: ", results);
        var friends = results;
        var answers = newFriend.scores.split(",");
        var numAnswers = answers.length;
        var matchFound = false;
        var bestDifference = 0;
        var currentBest = friends[0];
        for (var i = 0; i < friends.length; i++) {
            var difference = 0;
            for (var j = 0; j < numAnswers; j++) {
                difference += Math.abs(answers[j] - friends[i].friend_results.split(",")[j]);
                console.log("DIFFERENCE", difference);
            }
            if (!matchFound) {
                bestDifference = difference;
                currentBest = friends[i];
                matchFound = true;
            } else {
                if (difference < bestDifference) {
                    currentBest = friends[i];
                    bestDifference = difference;
                }
            }
        }
        console.log("currentBest", currentBest);
        return currentBest;
    });
}

exports.getFriends = getFriends;
exports.compareFriends = compareFriends;
