var friends = require("../data/friends.js");

var getFriends = friends.getFriends;
var compareFriends = friends.compareFriends;

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        getFriends()
        .then(function(results) {
            if (results) {
                return res.json({
                    friends: results
                });
            } else {
                return res.json({
                    results: "No friends!"
                });
            }
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        })
    });

    app.post("/api/friends", function(req, res) {
        compareFriends(req.body)
        .then(function(results) {
            if (results) {
                return res.json({
                    success: results
                })
            } else {
                return res.json({
                    error: "No matches found! Try again soon!"
                });
            }
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        });
    });
};