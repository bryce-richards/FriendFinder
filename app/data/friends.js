var mysql = require("mysql");

var bluebird = require("bluebird");

var connection;

var exports = module.exports = {};

var db_config = {
    host: process.env.host,
    port: 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
};

function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if(err) {
            console.error("error connecting: " + err.stack);
            setTimeout(handleDisconnect, 2000);
        }
        console.log("connected as id " + connection.threadId);
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on("error", function(err) {
        console.log("Database Error", err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

var query = bluebird.promisify(connection.query, {
    context: connection
});

// function 
function getFriends() {

    return query("SELECT * FROM friends")
    .then(function(results) {
        if (results) {
            return results;
        } else {
            return false;
        }
    });
}

// function to compare new friend to all friends in database
function compareFriends(friend) {

    var bestMatch;
    // array of answers from new friend
    var answers = friend.scores.split(",");

    // number of answers in array
    var numAnswers = answers.length;

    // mysql query to get all friends
    return query("SELECT * FROM friends")
    .then(function(results) {

        if (results) {

            console.log("Compare Friends MySQL Results: ", results);
            // variable for mysql friends object
            var friends = results;

            // boolean for match found
            var matchFound = false;

            // variable for best difference in scores
            var bestDifference = 0;

            // variable for best match
            bestMatch = friends[0];

            // loop through mysql results
            for (var i = 0; i < friends.length; i++) {

                // difference counter in scores for current loop
                var difference = 0;

                // loop through each question in new friend and current mysql friend results array
                for (var j = 0; j < numAnswers; j++) {

                    // add difference between each answer to difference counter
                    difference += Math.abs(answers[j] - friends[i].friend_results.split(",")[j]);

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

            return query("INSERT INTO friends SET ?", [{
                friend_name: friend.name,
                friend_image: friend.photo,
                friend_results: friend.scores
            }])
            .then(function() {

                return bestMatch;

            });

        } else {
            return false;
        }
    });
}

exports.getFriends = getFriends;
exports.compareFriends = compareFriends;