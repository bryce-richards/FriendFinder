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

// function 
function getFriends() {
    return query("SELECT * FROM friends");
}

// function to add newe friend to database
function addFriend(friend) {
    return query("INSERT INTO friends SET ?", [{
        friend_name: friend.name,
        friend_image: friend.photo,
        friend_results: friend.scores
    }]);
}

// function to compare new friend to all friends in database
function compareFriends(friend) {
    
    // array of answers from new friend
    var answers = friend.scores.split(",");

    // number of answers in array
    var numAnswers = answers.length;

    // mysql query to get all friends
    return query("SELECT * FROM friends")
    .then(function(results) {
        console.log("Query Results: ", results);
        // variable for mysql friends object
        var friends = results;

        // boolean for match found
        var matchFound = false;

        // variable for best difference in scores
        var bestDifference = 0;

        // variable for best match
        var bestMatch = friends[0];

        // loop through mysql results
        for (var i = 0; i < friends.length; i++) {

            // difference counter in scores for current loop
            var difference = 0;

            // loop through each question in new friend and current mysql friend results array
            for (var j = 0; j < numAnswers; j++) {

                // add difference between each answer to difference counter
                difference += Math.abs(answers[j] - friends[i].friend_results.split(",")[j]);

                console.log("DIFFERENCE", difference);
            }
            
            // if match found boolean is still false...
            if (!matchFound) {
                
                // set best difference as current difference
                bestDifference = difference;
                
                // set best match as current mysql friend result
                bestMatch = friends[i];

                // set match found boolean to true
                matchFound = true;
                
            // else if match has been found...
            } else {

                // if current difference is less...
                if (difference < bestDifference) {

                    // set best difference as current difference
                    bestDifference = difference;

                    // set best match as current mysql friend
                    bestMatch = friends[i];
                }
            }
        }
        console.log("bestMatch", bestMatch);
    })
    .then(function(match) {
        
        // return best match
        return match;
    });
}

exports.getFriends = getFriends;
exports.compareFriends = compareFriends;
exports.addFriend = addFriend;
