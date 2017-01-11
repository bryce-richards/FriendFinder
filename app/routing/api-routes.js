var friends = require("../data/friends.js");

var getFriends = friends.getFriends;
var compareFriends = friends.compareFriends;
var addFriend = friends.addFriend;

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return getFriends()
        .then(function(results) {
            return res.json({
                friends: results
            });
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        });
    });

    app.post("/api/friends", function(req, res) {
        var match;
        return compareFriends(req.body)
        .then(function(results) {
            match = results;
            addFriend(req.body)
            .then(function() {
                return res.json({
                    success: match
                });
            })
            .catch(function(error) {
                return res.json({
                    error: "API Error: " + error
                });
            });
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        });
    });
};